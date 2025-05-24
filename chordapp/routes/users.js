const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const session = require('express-session');

const userController = require('../controllers/userController');
// const audioController = require('../controllers/audioController'); // Uncomment if used

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
router.post('/register', validateRegister, userController.registerUser);
router.post('/login', validateLogin, userController.loginUser); 
router.get('/logout', userController.logoutUser);

// Protected Routes
router.get('/profile/:user_id', authenticateToken, userController.renderProfilePage);
router.get('/update/:user_id', authenticateToken, userController.renderUpdatePage);
router.post('/update/:user_id', authenticateToken, validateUpdate, userController.updateUser);

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
