const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const session = require('express-session');
const { optionalAuth } = require('../middleware/authentication');
const { registerUser, updateUserInfo, loginUser, renderProfilePage, renderUpdatePage, logoutUser } = require('../controllers/userController')

const userController = require('../controllers/userController');

const { validateRegister, validateLogin, validateUpdate } = require('../middleware/validation');
const { authenticateToken, checkAdmin } = require('../middleware/authentication');

// Session Setup
router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Unprotected Routes
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register', formData: {}});
});
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser); 
router.get('/logout', logoutUser);

router.get("/terms", optionalAuth, (req, res) => {
    res.render("Terms", { header: "Terms and Conditions", title: "T&C's" });
}); 

// Protected Routes
router.get('/profile/:user_id', authenticateToken, renderProfilePage);
router.get('/update/:user_id', authenticateToken, renderUpdatePage);
router.post('/update/:user_id', authenticateToken, validateUpdate, updateUserInfo);
 
// Admin Section
router.get('/admin', authenticateToken, checkAdmin, (req, res) => {
    // Ensure 'users' is defined or fetched before rendering
    const users = []; // Replace with actual user fetch logic if needed
    res.render('admin', { user: req.user, title: 'Admin Dashboard', users });
});

router.post('/admin/delete/:user_id', authenticateToken /*, checkAdmin, userController.deleteUser */);
router.post('/admin/suspend/:user_id', authenticateToken /*, checkAdmin, userController.suspendUser */);
router.post('/admin/update/:user_id', authenticateToken /*, checkAdmin, userController.updateUser */);

module.exports = router;
