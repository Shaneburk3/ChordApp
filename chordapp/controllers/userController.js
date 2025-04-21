const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const { getDate } = require('../scripts/functions');


exports.validateRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("[ERROR]: ", errors.array())
        return res.render('login', {
            title: "Login",
            login_message: "Error",
            errors: errors.array(),
            userData: req.body
        });
    }
    const { first_name, last_name, register_email, register_password1, register_password2 } = req.body;
    if (register_password1 != register_password2) {
        const msg = 'Sorry, passwords do not match';
        console.log("[ERROR]: Passwords do no match.")
        return res.render('login', { title: "Login", error_message: `${msg}` })
    }
    const creation_date = getDate();
    console.log('Registering user...')
    //res.render('register', {errors: null })
    User.create(first_name, last_name, register_email, creation_date, register_password1);
    console.log(`User created with email: ${register_email} on: ${creation_date}`)
    //You cannot pass other arguments with a redirect, only render can do that.
    res.redirect('/login')
};

exports.validateLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        console.log("[ERROR]: Login form error", errors.array());
        return res.status(401).render('/login')
    }
    console.log("Login  data validated.");
    const { login_email, login_password } = req.body;
    User.findUser(login_email, login_password, async (errors, user) => {
        if (errors) {
            console.log("Error finding user account")
            return res.status(401).render('login')
        } else if (!user) {
            const msg = 'No associated account with that email.';
            console.log(`User ${login_email} does not exist`)
            return res.status(401).render('login', { title: "Login", error_message: `${msg}` })
        }
        console.log("Found user");
        if (login_password != user.password) {
            console.log("Password incorrect.")
            const msg = "Error please try again.";
            return res.render('login', { title: "Login", error_message: `${msg}` })
        }
        console.log("Password correct.")
        return res.render("profile", { user, title: "Profile" });
    })
};

