
//Handle conversion to and from json with body-parser
const bodyParser = require("body-parser");
const express = require("express");
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
app.use('/users', userRoutes);


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
});

app.get("/", (req, res) => {
    res.render("index", { header: "index", title: "Index", user: null });
});

app.get("/about", (req, res) => {
    res.render("about", { header: "About", title: "About" });
});
app.get("/contact", (req, res) => {
    res.render("contact", { header: "Contact", title: "Contact" });
});
app.get("/login", (req, res) => {
    res.render("login", { title: "Login", error_message: "Login message" });
});
app.get("/register_user", (req, res) => {
    res.render("register_user", { title: "Register", error_message: "Register Message" });
});


app.get("/profile", (req, res) => {
    res.render("profile", { title: "Profile" });
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






