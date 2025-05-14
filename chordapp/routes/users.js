const express = require('express');
const router = express.Router();
const User = require('../models/usersModel')
const Detail = require('../models/detailsModel')
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const session = require('../utils/express-session');
const validate = require('../middleware/validator')

router.post('/register', [
    // Validate user input using express-validator
    body('first_name').escape().notEmpty().withMessage('First name required'),
    body('last_name').escape().notEmpty().withMessage('Last name required'),
    body('email').escape(),
    body('register_password1').escape().isLength({ min: 8}).withMessage("Password is not long enough").matches(/^[A-Za-z0-9 .,'!&]+$/),
    body('register_password2').escape().isLength({ min: 8}).withMessage(" "),
    body('terms_check').equals('on').withMessage('Please agree to T&Cs')], async (req, res) => {

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

router.post('/login', [
    body('login_email').isEmail(),
    body('login_password').isLength({ min: 8})
], async (req, res) => {
    //First validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e => e.msg);
        return res.render("index", { title: "Homepage", error_message: msg });
    }
    try {
        //After validation, Login user.
        await userController.loginUser(req, res);
    } catch (error) {
        console.log("Cant log in damn: ", error.message);
        return res.render("index", { title: "Homepage", error_message: ["Could not log user in"] });  
    }
    } 
);

/*
router.get("/profile", (req, res) => {
    res.render("profile", { title: "Profile", user: [], error_message: [], details: []});
});
*/
router.get("/profile/:user_id", userController.getUserProfile);
/*
router.get("/profile/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const userProfile = await userController.getUserProfile(user_id);
        if(!userProfile) {
            console.log("Could not get users profile.")
            return res.status(404).render('404', { title: "404", error_message: ["User details found!"] })
        }
        return res.render('profile', { user: userProfile, title: userProfile.user_id})
        } catch (error) {
            console.log(error)
            return res.status(404).render('404', { title: "404", error_message: ["User details found!"] })
        }
});
*/

router.get("/update/:user_id", userController.getUpdatePage);

router.get("/update", (req, res) => {
    res.render("update", { header: "Update", title: "Update", user: [], details: [] });
});

router.post("/update/:user_id", userController.updateUser);

router.get("/audio", (req, res) => {
    res.render("audio", { header: "audio page", title: "audio", user: null, error_message: []});
});

module.exports = router;