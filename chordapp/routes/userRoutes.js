const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const session = require('../utils/express-session')

router.post('/register', [
    body('first_name').escape().notEmpty().withMessage('First name required'),
    body('last_name').escape().notEmpty().withMessage('Last name required'),
    body('email').escape(),
    body('register_password1').escape().isLength({ min: 8}).withMessage("Password is not long enough"),
    body('register_password2').escape().isLength({ min: 8}).withMessage(" ")], userController.registerUser
);

router.post('/login', [
    body('login_email').escape().isEmail(),
    body('login_password').escape().isLength({ min: 8 }).withMessage('Must be more then 8 characters in length'),
    body('login_password').escape().isLength({max: 30}).withMessage('password too long')
], userController.loginUser
);

//router.get("/users/:id", userController.getUserByID);

router.get("/", (req, res) => {
    res.render("index", { header: "index", title: "Index", user: null });
});

router.get("/login", (req, res) => {
    res.render("login", { title: "Login", error_message: [] });
});

router.get("/register_user", (req, res) => {
    res.render("register_user", { title: "Register", error_message: [] });
});


router.get("/profile", (req, res) => {
    res.render("profile", { title: "Profile" });
});

router.get("/update/:user_id", session.authSession, (req, res) => {
    const user_id = req.session.user_id;
    console.log(`Users sessions ID: ${user_id}`)
    userController.getUserDetails
    res.render("update", { title: "Profile", user: User });
});

router.get("/update", (req, res) => {
    res.render("update", { header: "Update", title: "Update", user: null });
});

module.exports = router;