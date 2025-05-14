
//Handle conversion of json with body-parser
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.set('views', path.join(__dirname,'views'))

//app.use(express.static(__dirname + '/'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/users')
app.use(userRoutes);

//Connect to database.
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

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
});

app.get("/", (req, res) => {
    res.render("index", { header: "index", title: "Index", user: null, error_message: []});
});

app.get("/login", (req, res) => {
    res.render("login", { title: "Login", error_message: [] });
});

app.get("/register", (req, res) => {
    res.render("register", { title: "Register", error_message: [] });
});

app.get("/about", (req, res) => {
    res.render("about", { header: "About", title: "About" });
});

app.get("/contact", (req, res) => {
    res.render("contact", { header: "Contact", title: "Contact" });
});

app.get("/404", (req, res) => {
    res.render("contact", { header: "404", title: "404", error_message: [] });
});






