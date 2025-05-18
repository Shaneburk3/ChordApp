const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//const audioController = require('../controllers/audioController');
const { validateRegister, validateLogin } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/authorization')
require('dotenv').config()


const session = require('express-session');

router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//------Protected routes------

//------Unprotected routes----



router.post('/register', validateRegister, userController.registerUser);

router.get("/register", (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    //clear old data
    req.session.formErrors = null;
    req.session.formData = null;
    res.render("register", { title: "Register", formErrors, formData });
});


router.post('/login', validateLogin, userController.loginUser);

router.get("/login", (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    //clear old data
    req.session.formErrors = null;
    req.session.formData = null;
    res.render("login", { title: "Login", formErrors, formData });
});

router.get('/logout', userController.logoutUser);

router.get("/profile/:user_id", authenticateToken, userController.getUserProfile);

router.get("/update/:user_id", authenticateToken, userController.getUpdatePage);

router.get("/update/:user_id", authenticateToken, userController.getUpdatePage);


router.get("/update", (req, res) => {
    res.render("update", { header: "Update", title: "Update", user: [], details: [] });
});

router.put("/update/:user_id", authenticateToken, userController.updateUser);

//ADMIN SECTION START

router.get("/admin", authenticateToken, userController.adminPage /*, checkAdmin, userController.adminPage */);

router.post('/admin/delete/:user_id', authenticateToken /*, checkAdmin, userController.deleteUser */);

router.post('/admin/suspend/:user_id', authenticateToken /*, checkAdmin, userController.suspendUser */)

router.post('/admin/update/:user_id', authenticateToken /*, checkAdmin, userController.updateUser */)



//ADMIN SECTION END


module.exports = router;