const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const Cipher = require('../utils/encryption');
const Session = require('../utils/express-session.js');
const { getDate } = require('../scripts/functions');

exports.registerUser = async (req, res) => {

    const newUser = {
        first_name,
        last_name,
        register_email,
        register_password1,
        register_password2
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //only map the message from each array object
        const msg = errors.array().map(e => e.msg);
        //console.log(`full info: ${JSON.stringify(errors.array())}`)
        //console.log("Errors were sending: ", msg)
        return res.render('register_user', { title: "Register", error_message: msg});
    } else if (register_password1 != register_password2) {
        const msg = ["Passwords do not match"];
        //console.log(msg);
        return res.status(400).render('register_user', { title: "Register", error_message: msg})
    }

    const userExists = await User.findByEmail(register_email);
    if (userExists) {
        const msg = ["Account already associated with that email."];
        //console.log(msg);
        return res.status(400).render('register_user', { title: "Register", error_message: msg})
    }
    // if it passes the validation and passwords match and unused email -- Create user
    try {
        const hashed_password = await Cipher.createHash(register_password1)
        const creation_date = getDate();
        //console.log(`Hashed: ${hashed_password}`)
        User.create(first_name, last_name, register_email, creation_date, hashed_password);
        //console.log(`User created with email: ${register_email}, password: ${hashed_password}, on: ${creation_date}`);
        //You cannot pass other arguments with a redirect, only render can do that.
        res.redirect('/login')
    } catch (error) {
        //console.log(error);
        const msg = ['Error creating user'];
        //console.log("Error creating user.");
        res.status(500).render('login', { title: "Login", error_message: msg })
    }
};

exports.loginUser = async (req, res) => {
    console.log('Validating login....')
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        //console.log("[ERROR]: Login form error", errors.array());
        return res.status(401).render('login', { error_message: `${errors.array()}` });
    }
    //console.log("Login data validated.");
    const { login_email, login_password } = req.body;
    const foundUser = await User.findByEmail(login_email);
    //console.log(`Found this guy: ${JSON.stringify(foundUser)}`)
    if (!foundUser) {
        const msg = ['No associated account with that email'];
        console.log(`User ${login_email} does not exist`)
        return res.render('login', { title: "Login", error_message: msg })
    }
    const result = await Cipher.compare(login_password, foundUser.password)
    if (!result) {
        console.log("Password incorrect.")
        const msg = ["Error please try again."];
        return res.render('login', { title: "Login", error_message: msg })
    } else {
        console.log("Loggin in user")
        const session = req.session.user = { id: foundUser.user_ID, email: foundUser.email };
        console.log(session)
        return res.render(`profile`, { user: foundUser, title: `${foundUser.first_name}`}); F
    }

exports.getProfile = async (req, res) => {
        const user = req.session.user;
        return res.render(`profile`, { user: foundUser, title: `${foundUser.first_name}`}); F
    }
};

