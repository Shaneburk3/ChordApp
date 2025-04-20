const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const path = require('path');


    db.serialize(() => {

        db.run('DROP TABLE IF EXISTS users');
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, register_password1 TEXT NOT NULL)');

        db.run('INSERT INTO users (first_name, last_name, email, register_password1) VALUES (?,?,?,?)', ["admin", "admin","admin@admin.com", "admin"]);
    
    });

    module.exports = db;
