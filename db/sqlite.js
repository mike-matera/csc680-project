'use strict';

import { v4 as uuidv4 } from 'uuid';

var _sqlite3 = null;
var _db = null; 

function check_db() {
    if (_sqlite3 == null) {
        _sqlite3 = require('sqlite3');
        _db = new _sqlite3.Database(':memory:');
    }
    return _db
}

// Completley reset the db schema.
export function create_db() {
    const db = check_db();
    let sql = `
    
    /* Drop all tables so that the DB is reset */
    drop table if exists users; 
    
    /* Create all tables */
    create table users (
        id varchar(36) primary key,
        name varchar(64),
        email varchar(64)
    );
    
    /* Add sample data */
    insert into users values
      ('123e4567-e89b-12d3-a456-426614174000' 'Mike' 'mike@mike.com')
      ;
    `
    
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
    });      
}

// Insert a new row into table...
export function insert(table, data) {
    const db = check_db();
}

// Update a row... 
export function update(table, data) {
    const db = check_db();
}

// Delete a row... 
export function del(table, data) {
    const db = check_db();
}

// Dump the DB into JSON IR... 
export function query() {
    const db = check_db();
    const event1 = uuidv4()
    const role1 = uuidv4()
    const role2 = uuidv4()
    const job1 = uuidv4()
    const job2 = uuidv4()
    const job3 = uuidv4()
    const job4 = uuidv4()
    return {
        page: [event1],
        db: {
            [event1]: {
                id: event1,
                kind: 'event',
                name: "Summer Fundraiser",
                description: "Our big annual fundraiser.",
                parent: null, 
                children: [
                    role1, role2,
                ],
            },
            [role1]: {
                id: role1,
                kind: 'role',
                name: "Gate",
                description: "Manage gate operations.",
                parent: event1, 
                children: [
                   job1, job2, 
                ],
            },
            [role2]: {
                id: role2,
                kind: 'role',
                name: "Kitchen",
                description: "Work the kitchen.",
                parent: event1, 
                children: [
                    job3, job4
                ]
            },
            [job1]: {
                id: job1,
                kind: 'job',
                name: "Ticket taker",
                description: "Take tickets and give wristbands.",
                location: "At the gate",
                when: "03/19/2021",
                parent: role1, 
            },
            [job2]: {
                id: job2,
                kind: 'job',
                name: "Greeter",
                description: "Welcome people and show them where to go.",
                location: "Inside the gate",
                when: "03/19/2021",
                parent: role1, 
            },
            [job3]: {
                id: job3,
                kind: 'job',
                name: "Line cook.",
                description: "Cook food for the guests.",
                location: "In the kitchen",
                when: "03/19/2021",
                parent: role2, 
            },
            [job4]: {
                id: job4,
                kind: 'job',
                name: "Server",
                description: "Serve food as people arrive.",
                location: "The dining room",
                when: "03/19/2021",
                parent: role2, 
            },
        },
    }
}

