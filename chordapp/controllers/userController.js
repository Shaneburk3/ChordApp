const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const Cipher = require('../utils/encryption');
const Session = require('../utils/express-session.js');
const { getDate } = require('../scripts/functions');

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
        return res.status(400).render('register_user', { title: "Register", error_message: msg})
    }
    // if it passes the validation and passwords match and unused email -- Create user
    try {
        console.log("hashing password...")
        const hashed_password = await Cipher.createHash(register_password1)
        const creation_date = getDate();

        console.log(`Hashed: ${hashed_password}`)
        console.log("creating user...")
        User.create(first_name, last_name, register_email, creation_date, hashed_password);

        const findUserID = await User.findByEmail(register_email);

        User.createUserDetails(findUserID.user_ID)
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
        const userDetails = await User.getUserInfo(foundUser.user_ID);
        console.log("Logging in user", userDetails)
        //return {foundUser, userDetails}
        return res.render(`profile`, { user: foundUser, details: userDetails, title: `${foundUser.first_name}`});
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const User = await User.findByID(req);
        const userInfo = await User.getUserInfo(req);
        if (!userDetails) {
            return res.status(404).render('404', { title: "404", error_message: ["User not found!"] })
        }
        // If okay...
        return (User, userInfo)
        //return res.render(`profile`, { user: User, details: userInfo, title: `${User.first_name}`});
    } catch (error) {
        console.log(error.message);
        res.status(500).render("404", { title: "404", error_message: ["Details not found!"] })
    }
};

exports.updateUser = async (req, res) => {
    try {
        const update = await User.updateProfile(req);
        console.log(`sent to update: ${update}`)
        if (update) {
            const updated = await User.getUserInfo(req);
            console.log("Updated:", updated)
            return res.redirect(`profile`);
        }
    } catch (error) {
        console.log("Error updating profile: ", error.message);
    }
}