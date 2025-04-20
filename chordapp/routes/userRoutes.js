const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');


router.get('/register', (req, res) => {
    res.render('users/register', {errors: null})
});

router.post('/register', [
    body('first_name').escape(),
    body('last_name').escape(),
    body('email').escape(),
    body('register_password1').escape().isLength({ min: 8}),body('register_password2').escape().isLength({ min: 8, max: 20})], 
    userController.validateRegister
    );

router.get('/login', (req, res) => {
        res.render('users/login', {errors: null})
    });


router.post('/login', [
    body('login_email').escape(),
    body('login_password').escape().isLength({ min: 8, max: 20})
], userController.validateLogin)

router.get('/profile', (req, res) => {
    res.render('users/profile', {errors: null})
});



module.exports = router;