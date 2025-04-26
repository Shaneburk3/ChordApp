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
        const msg = ["Account already associated with that email."];
        //console.log(msg);
        return res.status(400).render('register', { title: "Register", error_message: msg});
    }
    // if it passes the validation and passwords match and unused email -- Create user
    try {
        console.log("hashing password...")
        const hashed_password = await Cipher.createHash(register_password1)
        const creation_date = getDate();

        console.log(`Hashed: ${hashed_password}`)
        console.log("creating user...");

        await User.create(first_name, last_name, register_email, creation_date, hashed_password);
        const foundUser = await User.findByEmail(register_email);
        const userID = foundUser.user_ID
        await Details.create(userID);

        //You cannot pass other arguments with a redirect, only render can do that.
        return res.redirect('/login');

    } catch (error) {
        //console.log(error);
        const msg = ['Error creating user'];
        //console.log("Error creating user.");
        return res.status(400).render('login', { title: "Login", error_message: msg })
    }
};

exports.loginUser = async (req, res) => {

    const { login_email, login_password } = req.body;
    const foundUser = await User.findByEmail(login_email);
    const foundDetails = await Details.findById(foundUser.user_ID);
    
    //console.log(`Found this guy: ${JSON.stringify(foundUser)}`)
    if (!foundUser) {
        const msg = ['No associated account with that email'];
        console.log(`User ${login_email} does not exist`)
        return res.render('login', { title: "Login", error_message: msg })
    }
    // Compare password with hashed stored password.
    const isMatch = await Cipher.compare(login_password, foundUser.password)
    if (!isMatch) {
        console.log("Password incorrect.")
        const msg = ["Error please try again."];
        return res.render('login', { title: "Login", error_message: msg })
    } else {
        console.log("Found user", foundUser)
        //console.log(foundUser.user_ID)
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
        const userInfo = await Details.findById(userID);

        if (!userInfo || !user) {
            return res.status(404).render('404', { title: "404", error_message: ["User not found!"] })
        } 
        // If okay...
        return([user, userInfo])
        //return res.status(200).render(`profile`, { user: foundUser, details: userDetails, title: `${foundUser.first_name}`});
    } catch (error) {
        console.log(error.message);
        return res.status(500).render("404", { title: "404", error_message: ["Details not found!"] })
    }
};
