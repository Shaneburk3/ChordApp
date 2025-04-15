const express = require("express");
const path = require("path");

const app = express();
const port = 3000;


app.set("view engine", "ejs");

//app.use(express.static("public"));

app.use(express.static("scripts"));


app.listen(port, () => {
    console.log('Server listening on port:', port )
})

app.get("/", (req, res) => {
    res.render("index", {header: "index header", title: "Index"});
})

app.get("/about", (req, res) => {
    res.render("about", {header: "about header", title: "About"});
})
app.get("/contact", (req, res) => {
    res.render("contact", {header: "contact header", title: "Contact"});
})
app.get("/login", (req, res) => {
    res.render("login", {header: "Login header", title: "Login"});
})

app.get("/profile", (req, res) => {
    res.render("profile", {header: "Profile header", title: "Profile"});
})






