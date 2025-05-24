
require('dotenv').config()
const express = require("express");

const app = express();
const cookieParser = require("cookie-parser")
const { authenticateToken, checkAdmin } = require('./middleware/authentication');

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
app.use('/profile', authenticateToken);
app.use('/update', authenticateToken);
app.use('/admin', authenticateToken);



app.use((req, res, next) => {
    res.locals.user = req.user || null
    next()
})

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
const { Client } = require('pg');

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

app.get("/", authenticateToken, (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    const user = req.user;
    if (req.user) {
        return res.redirect(`/api/users/profile/${user.user_id}`)
    }
    res.render("index", { header: "index", title: "Index", user, formErrors, formData });
});

app.get("/register", (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    const user = req.user;
    res.render("register", { title: "Register", formErrors, formData, user });
});

app.get("/profile", (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    const user = req.user;
    const audios = []
    res.render("profile", { user, title: "profile", audios, formErrors, formData });
}); 


app.get("/terms", (req, res) => {
    res.render("terms", { title: "Terms and Conditions" });
});









