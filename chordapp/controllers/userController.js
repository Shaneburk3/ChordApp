const User = require('../models/usersModel.js');
const Details = require('../models/detailsModel.js'); 
const Cipher = require('../middleware/encryption');
const Session = require('../utils/express-session.js');
const { getDate } = require('../public/scripts/functions.js');
const { json } = require('body-parser');

exports.registerUser = async (req, res) => {

    const { first_name, last_name, register_email, register_password1, register_password2 } = req.body;

    try {
    const userExists = await User.findByEmail(register_email);
    if (userExists) {
        var msg = ["Account already associated with that email."];
        return res.status(400).render('register', { title: "Register", error_message: msg});
    } else if (register_password1 != register_password2) {
        var msg = ["Passwords are not the same."];
        return res.status(400).render('register', { title: "Register", error_message: msg});
    }
    // if it passes the validation and passwords match and unused email -- Create user
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
    try {
        //check if user exists
        const { login_email, login_password } = req.body;
        const foundUser = await User.findOne(login_email);
        if (!foundUser) {
            var msg = ['No associated account with that email'];
            return res.render('index', { title: "Login", error_message: msg })
        
        }
        const isMatch = await Cipher.compare(login_password, foundUser.password)
         if (!isMatch) {
            const msg = ["Invalid email or password."];
            return res.render('index', { title: "Login", error_message: msg })
        }
        const result = await User.getUserWithDetails(foundUser.user_ID)
        return res.render("profile", { user: result, title: "Profile" })
    } catch (error) {
        console.log(error)
        const msg = error.message || "Unexpected error";
        return res.render('index', { title: "Login", error_message: msg })
    }
};

exports.updateUser = async (req, res) => {
    console.log("Updating user...")
    const user_id = req.params.user_id;
    const { user_dob, user_country, user_city, user_bio } =  req.body
    const data = req.body
        if (!user_id) {
        return res.status(404).render('404', { title: "404", error_message: ["User updates not found!"] })
    } 
    try { 
        //console.log("Updates sent to model", data) 
        const updated = await Details.update(data)
        if (!updated) {
        res.status(404).json({message: "No updates recieved."})
        }
        console.log("Updated: ", updated)
        return res.status(200).json({message: "User update successful.", user: updated})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Failed to update user."})
    }
};
exports.getUserProfile = async (req, res) => {
    try {
        const id = await req.params.user_id
        const UserDetails = await User.getUserWithDetails(id);
        console.log("all user details: ",UserDetails)
        if(!UserDetails) {
            console.log("Could not get users profile.")
            return res.status(404).render('404', { title: "404", error_message: ["User details found!"] });
        }
            return res.render("profile", { user: UserDetails, title: "Profile"});
    } catch (error) {
        console.log(error);
    }     
};
exports.getUpdatePage = async (req, res) => {
        try {
        const userDetails = await User.getUserWithDetails(req.params.user_id);

        if(!userDetails) {
            console.log("Could not get users information.")
            return res.status(404).render('404', { title: "404", error_message: ["User details found!"] })
        }
        return res.render("update", { title: "Profile", user: userDetails, error_message: [] });
    } catch (error) {
        console.log(error);
        res.render("index", { title: "Login", error_message: [] });
    }
}
exports.logoutUser = async (req, res) => {

};
