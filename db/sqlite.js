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
    const role1 = uuidv4()
    const role2 = uuidv4()
    const shift1 = uuidv4()
    const shift2 = uuidv4()
    const shift3 = uuidv4()
    const shift4 = uuidv4()

    let sql = `
    
    /* Drop all tables so that the DB is reset */
    drop table if exists users; 
    drop table if exists shift; 
    drop table if exists role; 
    drop table if exists event; 

    /* Create all tables */
    create table users (
        id varchar(36) primary key,
        name varchar(64),
        email varchar(64)
    );

    create table event (
        id varchar(36) primary key, 
        name vharchar(64),
        description varchar(128)
    ); 

    create table role (
        id varchar(36) primary key, 
        name vharchar(64),
        description varchar(128),
        eventid varchar(36), 
        constraint role_fk_1 foreign key
            (eventid) references event(id)
    ); 

    create table shift (
        id varchar(36) primary key, 
        name varchar(64),
        description varchar(128),
        location varchar(128),
        starttime datetime, 
        roleid varchar(36),
        constraint shift_fk_1 foreign key 
            (roleid) references role(id)
    );

    /* Add sample data */
    insert into users values
      ('123e4567-e89b-12d3-a456-426614174000', 'Mike', 'mike@mike.com')
      ;

    insert into event values ('${event1}', 'Summer Fundraiser', 'Our big annual fundraiser.');

    insert into role values 
        ('${role1}', 'Gate', 'Manage gate operations', '${event1}'),
        ('${role2}', 'Kitchen', 'Work the kitchen', '${event1}');

    insert into shift values 
        ('${shift1}', 'Ticket Taker', 'Take tickets and give wristbands.', 'At the gate', '2021-03-19', '${role1}'),
        ('${shift2}', 'Gretter', 'Welcome people and show them where to go.', 'Inside the gate', '2021-03-19', '${role1}'),
        ('${shift3}', 'Line cook', 'Cook food for guests', 'In the kitchen', '2021-03-19', '${role2}'),
        ('${shift4}', 'Server', 'Serve food as people arrive', 'The dining room', '2021-03-19', '${role2}')
        ;
    `
    console.log('resetting db')
    var got = await db.exec(sql)
}

// Insert a new row into table...
export async function insert(item) {
    console.log("insert:", item)
    const db = await check_db();
    var query
    if (item.kind == 'event') {
        query = `insert into event values ('${item.id}', '${item.name}', '${item.description}');`
    }
    else if (item.kind == 'role') {
        query = `insert into role values ('${item.id}', '${item.name}', '${item.description}', '${item.parent}');`
    }
    else if (item.kind == 'shift') {
        query = `insert into shift values ('${item.id}', '${item.name}', '${item.description}', '${item.location}', '${item.starttime}', '${item.parent}');`
    }
    console.log(query)
    var got = await db.exec(query)
}

// Update a row... 
export async function update(item) {
    const db = await check_db();
    var query
    if (item.kind == 'event') {
        query = `update event set name = '${item.name}', description = '${item.description}' where id = '${item.id}';`
    }
    else if (item.kind == 'role') {
        query = `update role set name = '${item.name}', description = '${item.description}' where id = '${item.id}';`
    }
    else if (item.kind == 'shift') {
        query = `update shift set name = '${item.name}', description = '${item.description}',
            location = '${item.location}', starttime = '${item.starttime}' where id = '${item.id}';`        
    }
    console.log(query)
    var got = await db.exec(query)
}

// Delete a row... 
export async function del(item) {
    const db = await check_db();
    console.log("delete:", item)
    var query
    if (item.kind == 'shift') {
        query = `delete from shift where id = '${item.id}';`
    }
    console.log(query)
    var got = await db.exec(query)
}


// Dump the DB into JSON IR... 
export async function query() {
    const db = await check_db();

    var dbdata = {}
    var pagedata = []
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
    console.log(dbdata)
    return {
        page: pagedata,
        db: dbdata,
    }
}

