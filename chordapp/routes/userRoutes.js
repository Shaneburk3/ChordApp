const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

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
    userController.validateRegister
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
    res.render("register_user", { title: "Register", error_message: "Register Message" });
});


router.get("/profile", (req, res) => {
    res.render("profile", { title: "Profile" });
});

router.get("/update", (req, res) => {
    res.render("update", { header: "Update", title: "Update" });
});

module.exports = router;