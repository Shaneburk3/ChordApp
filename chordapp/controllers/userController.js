const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const Cipher = require('../utils/encryption');
const Session = require('../utils/express-session.js')
const { getDate } = require('../scripts/functions');


exports.registerUser = async (req, res) => {
    //Validate users inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("[ERROR]: ", errors.array())
        const msg = errors.array().map(e => e.msg);
        console.log("ERROR: ", msg)
        return res.render('register_user', { title: "Register", error_message: `${msg}`, errors: errors.array(), userData: req.body });
    }
    //Check user typed password twice
    const { first_name, last_name, register_email, register_password1, register_password2 } = req.body;
    if (register_password1 != register_password2) {
        const msg = 'Passwords do not match';
        console.log("[ERROR]: Passwords do no match.")
        return res.render('register_user', { title: "Login", error_message: `${msg}` })
    }
    //check email is not taken.
    User.findByEmail(register_email, async (err, user) => {
        if (err) {
            const msg = 'Database Error.';
            console.log(msg, err)
            return res.status(401).render('login', { title: "Login", error_message: `${msg}` });
        } else if (user) {
            const msg = 'There is an associated account with that email.';
            return res.render('login', { title: "Login", error_message: `${msg}` });
        }
        //User not found, so AIO.
        /*
    Cipher.createHash(register_password1, (err, res) => {
            if (err) {
                console.log("Hashing Error: ", err)
            } else {
                hashed_password = res;
                console.log(`encrypted password: ${hashed_password}`);
            }
        });
        */
        //Create user
        try {
            const hashed_password = await Cipher.createHash(register_password1)
            const creation_date = getDate();
            console.log(`Hashed: ${hashed_password}`)
            await User.create(first_name, last_name, register_email, creation_date, hashed_password);
            console.log(`User created with email: ${register_email}, password: ${hashed_password}, on: ${creation_date}`);
            //You cannot pass other arguments with a redirect, only render can do that.
            res.redirect('/login')
        } catch (error) {
            console.log(error);
            const msg = 'Error creating user.';
            console.log("Error creating user.");
            res.status(500).render('login', { title: "Login", error_message: msg })
        }
    });
};

exports.validateLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        console.log("[ERROR]: Login form error", errors.array());
        return res.status(401).render('login', { error_message: `${errors.array()}` });
    }
    console.log("Login  data validated.");
    const { login_email, login_password } = req.body;
    User.findByEmail(login_email, async (errors, user) => {
        if (errors) {
            const msg = 'Error finding user account.';
            return res.status(401).render('login', { title: "Login", error_message: `${msg}` })
        } else if (!user) {
            const msg = 'No associated account with that email.';
            console.log(`User ${login_email} does not exist`)
            return res.render('login', { title: "Login", error_message: `${msg}` })
        }

        const result = await Cipher.compare(login_password, user.password)
        if (!result) {
            console.log("Password incorrect.")
            const msg = "Error please try again.";
            return res.render('login', { title: "Login", error_message: `${msg}` })
        } else {
            console.log("Password correct.")
            req.session.user_id = user.user_id;
            return res.render(`profile`, { user, title: "Profile" }); F
        }
    });

    exports.getProfile = async (req, res) => {

    }
};

