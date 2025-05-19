const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const session = require('express-session');


const userController = require('../controllers/userController');
// const audioController = require('../controllers/audioController'); // Uncomment if used

const { validateRegister, validateLogin } = require('../middleware/validation');
const { authenticateToken, checkAdmin } = require('../middleware/authorization');

// Session Setup
router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Unprotected Routes
router.get('/register', (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    req.session.formErrors = null;
    req.session.formData = null;
    res.render('register', { title: 'Register', formErrors, formData });
});

router.post('/register', validateRegister, userController.registerUser);

router.get('/login', (req, res) => {
    const formErrors = req.session.formErrors || [];
    const formData = req.session.formData || {};
    req.session.formErrors = null;
    req.session.formData = null;
    res.render('login', { title: 'Login', formErrors, formData });
});

router.post('/login', validateLogin, userController.loginUser);
router.get('/logout', userController.logoutUser);

// Protected Routes
router.get('/profile/:user_id', authenticateToken, userController.getUserProfile);
router.get('/update/:user_id', authenticateToken, userController.getUpdatePage);
router.put('/update/:user_id', authenticateToken, userController.updateUser);

// Optionally remove this unless needed
//router.get('/update', (req, res) => {
//    res.render('update', { header: 'Update', title: 'Update', user: [], details: [] });
//});

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