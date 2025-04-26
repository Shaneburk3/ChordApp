
//Handle conversion to and from json with body-parser
const bodyParser = require("body-parser");
const express = require("express");
const session = require('express-session');
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;


app.set("view engine", "ejs");

//app.use(express.static("public"));
//app.use(express.static("CSS"));
//app.use(express.static("scripts"));

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json()); // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true }));

//Connect to database.
/*
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log('[ERROR]: Could not connect to database.', err.message);
    } else {
        console.log('[INFO]: Connected to database.')
    }  
});
*/
const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    host: "localhost",
    password: "F7d4rbhwkab3",
    database: "chordExplorer",
    port: 5432
});

try {
    client.connect();
    console.log("Connected to database.")
} catch (error) {
    console.log("Error: could not connect to database:", error.message)
}

//Export connection to the database to use elsewhere.
module.exports = client;

const userRoutes = require('../chordapp/routes/userRoutes')
//app.use('/users', userRoutes);
app.use(userRoutes);


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
});

app.get("/about", (req, res) => {
    res.render("about", { header: "About", title: "About" });
});

app.get("/contact", (req, res) => {
    res.render("contact", { header: "Contact", title: "Contact" });
});


/*
app.post('/user_login', (req, res) => {
    const { email, password} = req.body;
    console.log("Welcome: ", email)
});
*/
/*
app.post('/register', (req, res) => {
    const { first_name, last_name, email, password, password2 } = req.body;
    console.log("Welcome: ", first_name)
});
*/






