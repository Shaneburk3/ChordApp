
require('dotenv').config()
const express = require("express");

const app = express();
const cookieParser = require("cookie-parser")


const { authenticateToken }  = require('../chordapp/middleware/authentication')

const bodyParser = require("body-parser");

const session = require('express-session');


const path = require("path");

const port = 3000;
const userRoutes = require('./routes/users');
const audioRoutes = require('./routes/audios');
const basicRoutes = require('./routes/basics')
 
//EJS set up
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))


//static public folders
app.use(express.static(path.join(__dirname, 'public')));

//middleware 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//To allow the use cookie sending cookies to the client
app.use(authenticateToken);

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//Routes for users and audios
app.use('/api/users/', userRoutes);
app.use('/api/audios/', audioRoutes);
app.use('/', basicRoutes)


//Connect to database. 
const { Client, escapeLiteral } = require('pg');
const { clear } = require("console");

const client = new Client({
    user: process.env.DB_USERNAME,
    host: "localhost",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_USERNAME,
    port: process.env.DB_PORT
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
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    const user = null;
    res.render("index", { header: "index", title: "Index", user, formErrors, formData });
});
/*
app.get("/login", (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    //clear old data
    req.session.formErrors = null;
    req.session.formData = null;
    res.render("login", { title: "Login", formErrors, formData });
});
*/
app.get("/register", (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    //clear old data
    req.session.formErrors = null;
    req.session.formData = null;
    res.render("register", { title: "Register", formErrors, formData });
});

app.get("/profile", (req, res) => {
    const audios = []
    res.render("profile", { user: [], title: "profile", audios: [] });
});

/*
app.get("/about", (req, res) => {
    res.render("about", { header: "About", title: "About" });
});

app.get("/404", (req, res) => {
    res.render("contact", { header: "404", title: "404", error_message: [] });
});

app.get("/contact", (req, res) => {
    res.render("contact", { header: "Contact", title: "Contact" });
});
*/








