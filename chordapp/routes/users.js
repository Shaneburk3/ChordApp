const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const session = require('express-session');
const { optionalAuth, authToken, authAdmin } = require('../middleware/authentication');

const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

const { validateRegister, validateLogin, validateUpdate } = require('../middleware/validation');

// Session Setup to reload formdata
router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Unprotected Routes
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register', formData: {}, formErrors: {}});
});
router.post('/register', validateRegister, userController.registerUser);
router.post('/login', validateLogin, userController.loginUser); 
router.get('/logout/:user_id', userController.logoutUser);

router.get("/terms", optionalAuth, (req, res) => {
    res.render("Terms", { header: "Terms and Conditions", title: "T&C's" });
}); 

// Protected Routes
router.get('/profile/:user_id', authToken, userController.renderProfile);
router.get('/update/:user_id', authToken, userController.renderUpdate);
router.post('/update/:user_id', authToken, validateUpdate, userController.updateUser);
 
// Admin Section
router.get('/admin', authToken, authAdmin, adminController.renderAdmin);

router.post('/admin/delete/:user_id', authToken, authAdmin, adminController.deleteUser);
router.post('/admin/suspend/:user_id', authToken, authAdmin, adminController.suspendUser);
router.post('/admin/update/:user_id', authToken, authAdmin, adminController.updateUser);
router.get('/admin/update/:user_id', authToken, authAdmin, adminController.renderUpdatePage);
router.post('/admin/selected_action', authToken, authAdmin, adminController.bulkUpdate);

router.get('/admin/logs', authToken, authAdmin, adminController.renderLogPage);
router.post('/admin/logs/filter', authToken, authAdmin, adminController.filterLogs);




module.exports = router;
