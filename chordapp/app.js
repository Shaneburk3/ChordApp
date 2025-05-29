
require('dotenv').config()
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const bodyParser = require("body-parser");

const { authenticateToken, authAdmin, optionalAuth } = require('./middleware/authentication');

const userRoutes = require('./routes/users');
const audioRoutes = require('./routes/audios');
const basicRoutes = require('./routes/basics');

const app = express();
const port = 3000;


//EJS set up
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))


//middleware 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    res.locals.user = req.user || null
    next()
})

//Routes for users and audios
app.use('/api/users/', userRoutes);
app.use('/api/audios/', audioRoutes);
app.use('/', basicRoutes);

app.use('/translator', optionalAuth, audioRoutes);
app.use('/profile', authenticateToken, userRoutes);
//app.use('/', basicsRoutes)


//Connect to database. 
const { Client } = require('pg');
const { profile } = require('console');

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


app.get("/", optionalAuth, (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    const user = req.user;
    if (req.user) {
        return res.redirect(`/api/users/profile/${user.user_id}`)
    }
    res.render("index", { header: "index", title: "Index", user, formErrors, formData });
});

app.get("/register", optionalAuth, (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    res.render("register", { title: "Register", formErrors, formData });
});

/*
app.get("/profile", (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || [];
    const user = req.user;
    const audios = []
    res.render("profile", { user, title: "profile", audios, formErrors, formData });
}); 

app.get("/translator", (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || [];
    const user = req.user;
    const audios = []
    res.render("translator", { user, title: "translator", audios, formErrors, formData });
}); 
*/

app.get("/terms", (req, res) => {
    res.render("terms", { title: "Terms and Conditions" });
});









