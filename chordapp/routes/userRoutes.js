const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const session = require('../utils/express-session')

/*
router.get('/register', (req, res) => {
    res.render('users/register', {errors: null})
});
*/
router.post('/register', [
    body('first_name').escape(),
    body('last_name').escape(),
    body('email').escape(),
    body('register_password1').escape().isLength({ min: 8, max: 30}).withMessage("Password does not meet the requirements."),
    body('register_password2').escape().isLength({ min: 8, max: 30})], 
    userController.registerUser
    );

router.post('/login', [
    body('login_email').escape(),
    body('login_password').escape().isLength({ min: 8, max: 20})
], userController.validateLogin)

//router.get("/users/:id", userController.getUserByID);

router.get("/", (req, res) => {
    res.render("index", { header: "index", title: "Index", user: null });
});

router.get("/login", (req, res) => {
    res.render("login", { title: "Login", error_message: " " });
});

router.get("/register_user", (req, res) => {
    res.render("register_user", { title: "Register", error_message: "" });
});


router.get("/profile", (req, res) => {
    res.render("profile", { title: "Profile" });
});

router.get("/update/:user_id", session.authSession, (req, res) => {
    const user_id = req.session.user_id;
    console.log(`Users sessions ID: ${user_id}`)
    userController.getUserDetails
    res.render("profile", { title: "Profile", user: User });
});

router.get("/update", (req, res) => {
    res.render("update", { header: "Update", title: "Update", user: null });
});

module.exports = router;