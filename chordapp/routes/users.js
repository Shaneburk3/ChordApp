const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const session = require('express-session');
const { optionalAuth, authenticateToken, authAdmin } = require('../middleware/authentication');

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
    res.render('register', { title: 'Register', formData: {}});
});
router.post('/register', validateRegister, userController.registerUser);
router.post('/login', validateLogin, userController.loginUser); 
router.get('/logout', userController.logoutUser);

router.get("/terms", optionalAuth, (req, res) => {
    res.render("Terms", { header: "Terms and Conditions", title: "T&C's" });
}); 

// Protected Routes
router.get('/profile/:user_id', authenticateToken, userController.renderProfilePage);
router.get('/update/:user_id', authenticateToken, userController.renderUpdatePage);
router.post('/update/:user_id', authenticateToken, validateUpdate, userController.updateUserInfo);
 
// Admin Section
router.get('/admin', authenticateToken, authAdmin, adminController.getAdminPage);

router.post('/admin/delete/:user_id', authenticateToken, authAdmin, adminController.deleteUser);
router.post('/admin/suspend/:user_id', authenticateToken, authAdmin, adminController.suspendUser);
router.post('/admin/updateUser/:user_id', authenticateToken, authAdmin, adminController.updateUser);
router.get('/admin/updateUser/:user_id', authenticateToken, authAdmin, adminController.renderUpdatePage)

router.post('/admin/selected_action', authenticateToken, authAdmin, adminController.selected_action);


module.exports = router;
