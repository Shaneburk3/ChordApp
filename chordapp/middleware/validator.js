const { body, validationResult } = require('express-validator');

const validateRegister = [
    body('first_name').escape().notEmpty().withMessage('First name required'),
    body('last_name').escape().notEmpty().withMessage('Last name required'),
    body('email').escape(),
    body('register_password1').escape().isLength({ min: 8 }).withMessage("Password is not long enough").matches(/^[A-Za-z0-9 .,'!&]+$/),
    body('register_password2').escape().isLength({ min: 8 }).withMessage(" "),
    body('terms_check').equals('on').withMessage('Please agree to T&Cs'),
    (req, res, next) => {
        const errors = validationResult(req);
        //If validation fails, set errors in response.
        if (!errors.isEmpty()) {
            //send validated messages and user input back to user.
            const formErrors = errors.array()
            const formData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
            }
            //response sent back will be status 400
            return res.status(400).render('register', { title: "register", formErrors, formData })
        }
        //if no errors, continue with process in routes
        console.log("Validation passed.")
        next();
    }
]

const validateLogin = [
    body('login_email').isEmail().withMessage("Email is required."),
    body('login_password').notEmpty().withMessage("Password is required."),

    (req, res, next) => {
        console.log('Validating login');
        const errors = validationResult(req);
        //If validation fails, set errors in response.
        if (!errors.isEmpty()) {
            const formErrors = errors.array()
            const formData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
            }
            //response sent back will be status 400
            return res.status(400).render('index', { title: "Login", formErrors, formData })
            //return res.redirect('/')
        }
        //if no errors, continue with process in routes
        next();
    }
]

module.exports = {
    validateRegister, validateLogin
}



