const express = require('express');
const router = express.Router();
const User = require('../models/usersModel')
const Detail = require('../models/detailsModel')
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const session = require('../utils/express-session');

router.get("/register", (req, res) => {
    res.render("register", { title: "Register", error_message: [] });
});

router.post('/register', [

    body('first_name').escape().notEmpty().withMessage('First name required'),
    body('last_name').escape().notEmpty().withMessage('Last name required'),
    body('email').escape(),
    body('register_password1').escape().isLength({ min: 8}).withMessage("Password is not long enough"),
    body('register_password2').escape().isLength({ min: 8}).withMessage(" ")], async (req, res) => {

        const errors =  validationResult(req);

        if (!errors.isEmpty()) {
            const msg = errors.array().map(e => e.msg);
            return res.render("register", { title: "Register", error_message: msg });
        } 
        try {
            await userController.registerUser(req, res);
        } catch (error) {
            console.log(error.message)
            return res.status(500).render('register', { title: "Register", error_message: ["Could not register user. Try again."]})
        }
    }
)

router.get("/", (req, res) => {
    res.render("index", { header: "index", title: "Index", user: null });
});

router.get("/login", (req, res) => {
    res.render("login", { title: "Login", error_message: [] });
});

router.post('/login', [
    body('login_email').escape().isEmail(),
    body('login_password').escape().isLength({ min: 8 }).withMessage('Must be more then 8 characters in length'),
    body('login_password').escape().isLength({max: 30}).withMessage('password too long')
], async (req, res) => {
    //First validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e => e.msg);
        return res.render("login", { title: "Login", error_message: msg });
    }
    try {
        //After validation, Login user.
        await userController.loginUser(req, res);
    } catch (error) {
        console.log("Cant log in damn: ", error.message);
        return res.render("login", { title: "Login", error_message: ["Could not log user in"] });  
    }
    } 
);

router.get("/profile", (req, res) => {
    res.render("profile", { title: "Profile", user: [], error_message: [], details: []});
});
/*
router.get("/profile", async (req, res) => {
    try {
        const user = await userController.getUser();
        const details = await userController.getUserDetails();
        res.render("profile", { title: "Profile", user: user, error_message: [], details: details });
    } catch (error) {
        console.log(error);
        res.render("login", { title: "Login", error_message: [] });
    }
});
*/
router.get("/update/:user_id", async (req, res) => {
    const user_ID = req.params.user_id;
    console.log(user_ID);
    try {
        const userInfo = await User.findById(user_ID);
        const userDetails = await Detail.findById(user_ID);

        if(!userInfo || ! userDetails) {
            console.log("Could not get users information.")
            return res.status(404).render('404', { title: "404", error_message: ["User details found!"] })
        }
        res.render("profile", { title: "Profile", user: userInfo, error_message: [], details: userDetails });
    } catch (error) {
        console.log(error);
        res.render("login", { title: "Login", error_message: [] });
    }
});

router.get("/update", (req, res) => {
    res.render("update", { header: "Update", title: "Update", user: [], details: [] });
});

router.put("/update", (req, res) => {
    res.render("/update/:user_id", { header: "Update", title: "Update", user: User, details: [] });
    userController.getProfile
});

module.exports = router;