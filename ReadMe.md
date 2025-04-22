## ChordExplorer

This application allows users to register, log in, create, read, update, and delete audio translations....

## Features

Register user and login.

CRUD operations: Create, read, update, and delete for audio posts.

Display all audio logs a user created.

Session management.

Automated testing using *********.

## Installation

Clone Repo: git clone https://github.com/Shaneburk3/ChordApp.git

Open terminal: cd chordapp

Install  application dependencies

npm install sqlite3
npm install body-parser
npm install express
npm install ejs
npm install express-session
#npm install knex

## SECURITY FEATURES
npm install express-validator
npm install crypto

# TESTING
npm install playwright??
npx playwright install??

## Start ChordExplorer

Command line: node app.js

Open web browser, enter: http://localhost:3000/

## RUN TESTS ??????????

npm test
npx playwright test tests/register.spec.js
npx playwright test tests/login.spec.js
npx playwright test tests/xss_Attack.spec.js
npx playwright test tests/createBlog.spec.js


## How to use website ????????

1 - Navigate to register page from the dropdown menu in the nab bar.
2 - Register a new user. Example:

first_name: admin
last_name: admin
email: admin@email.com
password: Password12
Retype password: Password12

3 - redirected to blogs page, views blogs or either create, update or delete blogs.

## Database ??????

When the app.js is run, the database is created, and the following is ran in the db.js file: 

# clear all entries.
    db.run('DROP TABLE IF EXISTS users');
    db.run('DROP TABLE IF EXISTS audios');

# create tables users, and blogs
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, username TEXT UNIQUE NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, role TEXT DEFAULT' + 'user' + ' )');

    db.run('CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT null, body TEXT NOT null, user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES users (id))');
# delete sample any entry in the database.
    db.run('DELETE FROM users WHERE username = (?)', [admin_user]);
# create sample entry again, with hashed password for secure_branch version.    
    db.run('INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?,?)', ["admin", "admin", "admin", "admin@email.com", "$2b$10$22TnFkO8rYI7xCWNAWcfTO2TF3yasArmsdCKHUYtFCXrhehQelCza"]);
# sample entry for sample user.
    db.run('INSERT INTO blogs (title, body, user_id) VALUES (?,?,?)', ["my first blog", "body", 1])

## THANK YOU!
