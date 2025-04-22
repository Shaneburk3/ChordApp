const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const Cipher = require('../utils/encryption');
const { getDate } = require('../scripts/functions');


exports.validateRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("[ERROR]: ", errors.array())
        const msg = errors.array().map(e => e.msg);
        console.log("single message: ", msg)
        return res.render('register_user', {
            title: "Register",
            error_message: `${msg}`,
            errors: errors.array(),
            userData: req.body
        });
    }
    const { first_name, last_name, register_email, register_password1, register_password2 } = req.body;
    if (register_password1 != register_password2) {
        const msg = 'Passwords do not match';
        console.log("[ERROR]: Passwords do no match.")
        return res.render('register_user', { title: "Login", error_message: `${msg}` })
    }
    const creation_date = getDate();
    console.log('Registering user...')
    let encrypted_password = Cipher.encrypt(register_password1)
    console.log(`encrypted password: ${encrypted_password}`)
    //res.render('register', {errors: null })
    User.create(first_name, last_name, register_email, creation_date, encrypted_password);
    console.log(`User created with email: ${register_email} on: ${creation_date}`)
    //You cannot pass other arguments with a redirect, only render can do that.
    res.redirect('/login')
};

exports.validateLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        console.log("[ERROR]: Login form error", errors.array());
        return res.status(401).render('login', {error_message: `${errors.array()}`})
    }
    console.log("Login  data validated.");
    const { login_email, login_password } = req.body;
    User.findUser(login_email, login_password, async (errors, user) => {
        if (errors) {
            const msg = 'Error finding user account.';
            return res.status(401).render('login', { title: "Login", error_message: `${msg}` })
        } else if (!user) {
            const msg = 'No associated account with that email.';
            console.log(`User ${login_email} does not exist`)
            return res.render('login', { title: "Login", error_message: `${msg}` })
        }
        console.log("Found user");
        if (login_password != user.password) {
            console.log("Password incorrect.")
            const msg = "Error please try again.";
            return res.render('login', { title: "Login", error_message: `${msg}` })
        }
        console.log("Password correct.")
        return res.render("profile", { user, title: "Profile" });
    });
};

