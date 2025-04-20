const { validationResult } = require('express-validator');
const User = require('../models/userModel');


exports.validateRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("[ERROR]: ", errors.array())
        return res.render('login', {header: "Profile", title: "Profile",
            errors: errors.array(),
            userData: req.body
        });
    }
    const { first_name, last_name, register_email, register_password1, register_password2 } = req.body;
    if (register_password1 != register_password2) {
        console.log("[ERROR]: Passwords do no match.")
        return res.send('Password do not match');
    }
    console.log('Register Request made')
    //res.render('register', {errors: null })
    User.create(first_name, last_name, register_email, register_password1);
    console.log(`User created with email: ${register_email}`)
    res.redirect('/login')
};

exports.validateLogin = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty){
        console.log("[ERROR]: Login form error", errors.array());
        return res.render('/login', {errors: errors.array()})
    }
    console.log("Login validated.");
    const { login_email, login_password } = req.body;
    User.findByEmail(login_email, async (errors, user) =>{
        if (errors) {
            console.log("Errors finding user account")
        } else if (!user) {
            console.log(`User ${login_email} does not exist`)
            return res.redirect('/login')
        } 
        return res.redirect('/profile')
    })

};