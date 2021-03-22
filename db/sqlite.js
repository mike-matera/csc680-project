'use strict';

import { v4 as uuidv4 } from 'uuid';

var _sqlite3 = null;
var _db = null; 

async function check_db() {
    if (_sqlite3 == null) {
        _sqlite3 = require('sqlite-async')
        _db = await _sqlite3.open(':memory:')
    }
    return _db
}

// Completley reset the db schema.
export async function create_db() {
    const db = await check_db();
    const event1 = uuidv4()

    let sql = `
    
    /* Drop all tables so that the DB is reset */
    drop table if exists event; 

    /* Create all tables */
    create table event (
        id varchar(36) primary key, 
        name vharchar(64),
        description varchar(128)
    ); 

    /* Add sample data */
    insert into event values ('${event1}', 'Summer Fundraiser', 'Our big annual fundraiser.');
    `
    console.log('resetting db')
    var got = await db.exec(sql)
}

// Insert a new row into table...
export async function insert(item) {
    console.log("Insert:", item)
    const db = await check_db();
    var query
    if (item.kind == 'event') {
        query = `insert into event values ('${item.id}', '${item.name}', '${item.description}');`
    }
    else if (item.kind == 'role') {
    }
    else if (item.kind == 'shift') {
    }
    console.log("Query:", query)
    var got = await db.exec(query)
}

// Update a row... 
export async function update(item) {
    console.log("Update:", item)
    const db = await check_db();
    var query
    if (item.kind == 'event') {
        query = `update event set name = '${item.name}', description = '${item.description}' where id = '${item.id}';`
    }
    else if (item.kind == 'role') {
    }
    else if (item.kind == 'shift') {
    }
    console.log("Query:", query)
    var got = await db.exec(query)
}

// Delete a row... 
export async function del(item) {
    console.log("Delete:", item)
    const db = await check_db();
    var query
    console.log("Query:", query)
    var got = await db.exec(query)
}


// Dump the DB into JSON IR... 
export async function query() {
    const db = await check_db();

    var dbdata = {}
    var pagedata = []
    try {
        var events = await db.all('select * from event;', [])
        for (const event of events) {
            event.kind = 'event'
            event.parent = null 
            event.children = []
            dbdata[event.id] = event;
            pagedata.push(event.id)
            var roles = await db.all('select * from role where eventid = ?;', [event.id])
            for (const role of roles) {
                role.kind = 'role'
                event.children.push(role.id)
                role.parent = event.id
                role.children = []            
                dbdata[role.id] = role;
                var shifts = await db.all('select * from shift where roleid = ?;', [role.id])
                for (const shift of shifts) {
                    shift.kind = 'shift'
                    role.children.push(shift.id)
                    shift.parent = role.id
                    shift.children = []
                    dbdata[shift.id] = shift
                }
            }
        }
    }
    catch {
        console.log("Error querying the DB.")
    }
    console.log(dbdata)
    return {
        page: pagedata,
        db: dbdata,
    }
}

