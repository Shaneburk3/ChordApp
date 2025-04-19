const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;


app.set("view engine", "ejs");

//app.use(express.static("public"));

app.use(express.static("scripts"));

app.use(express.static("CSS"));

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(port, () => {
    console.log('Server listening on port:', port )
});

app.get("/", (req, res) => {
    res.render("index", {header: "index", title: "Index"});
});

app.get("/about", (req, res) => {
    res.render("about", {header: "About", title: "About"});
});
app.get("/contact", (req, res) => {
    res.render("contact", {header: "Contact", title: "Contact"});
});
app.get("/login", (req, res) => {
    res.render("login", {header: "Login / Register", title: "Login"});
});

app.get("/profile", (req, res) => {
    res.render("profile", {header: "Profile", title: "Profile"});
});
app.post('/user_login', (req, res) => {
    const { email, password} = req.body;
    console.log("Welcome: ", email)
});
app.post('/register', (req, res) => {
    const { first_name, last_name, email, password, password2 } = req.body;
    console.log("Welcome: ", first_name)
});






