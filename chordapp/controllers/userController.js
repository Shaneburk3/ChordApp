const User = require('../models/usersModel.js');
const Details = require('../models/detailsModel.js'); 
const Cipher = require('../utils/encryption');
const Session = require('../utils/express-session.js');
const { getDate } = require('../scripts/functions');
const { json } = require('body-parser');

exports.registerUser = async (req, res) => {

    const {
        first_name,
        last_name,
        register_email,
        register_password1,
        register_password2
    } = req.body;

    const userExists = await User.findByEmail(register_email);
    if (userExists) {
        var msg = ["Account already associated with that email."];
        return res.status(400).render('register', { title: "Register", error_message: msg});
    } else if (register_password1 != register_password2) {
        var msg = ["Passwords are not the same."];
        return res.status(400).render('register', { title: "Register", error_message: msg});
    }
    // if it passes the validation and passwords match and unused email -- Create user
    try {
        console.log("Hashing password.")
        const hashed_password = await Cipher.createHash(register_password1)
        const creation_date = getDate();

        console.log("Creating user.");
        await User.create(first_name, last_name, register_email, creation_date, hashed_password);
        const foundUser = await User.findByEmail(register_email);
        const userID = foundUser.user_ID;
        await Details.create(userID);
        return res.redirect('/');

    } catch (error) {
        var msg = ['Error creating user'];
        return res.status(400).render('/', { title: "Login", error_message: msg })
    }
};

exports.loginUser = async (req, res) => {

    const { login_email, login_password } = req.body;
    const foundUser = await User.findByEmail(login_email);
    const foundDetails = await Details.findById(foundUser.user_ID);
    const isMatch = await Cipher.compare(login_password, foundUser.password)

    if (!foundUser) {
        var msg = ['No associated account with that email'];
        console.log(`User ${login_email} does not exist`)
        return res.render('index', { title: "Login", error_message: msg })
    } else if (!isMatch) {
        console.log("Password incorrect.")
        const msg = ["Error please try again."];
        return res.render('index', { title: "Login", error_message: msg })
    } else {
        console.log("Found user", foundUser)
        try {
            return res.render(`profile`, { user: foundUser, details: foundDetails, title: `${foundUser.first_name}`});     
        } catch (error) {
            console.log(error)
            const msg = error.array().map(e => e.msg);
            return res.render('login', { title: "Login", error_message: msg })
        }
    }
};

exports.updateUser = async (req, res) => {

    const userID = req.params.user_id || req.body.user_id;
    try {        
        const user = await User.findById(userID);
        const userDetails = await Details.findById(userID);
        if (!userDetails || !user) {
            return res.status(404).render('404', { title: "404", error_message: ["User not found!"] })
        } 
        return([user, userDetails])
    } catch (error) {
        console.log(error.message);
        return res.status(500).render("404", { title: "404", error_message: ["user data not found"] })
    }
};
