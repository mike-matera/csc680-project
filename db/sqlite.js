'use strict';

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(':memory:');


//db.close();

export default db 
