const { body, validationResult } = require('express-validator');

const validateRegister = [
    body('first_name').escape().trim().notEmpty().withMessage('First name required'),
    body('last_name').escape().trim().notEmpty().withMessage('Last name required'),
    body('register_email').isEmail().withMessage('Must be an email.'),
    body('register_password1').escape().isLength({ min: 8 }).withMessage("Password is not long enough").matches(/^[A-Za-z0-9 .,'!&]+$/),
    body('register_password2').escape().isLength({ min: 8 }).withMessage(" "),
    body('terms_check').equals("on").withMessage('Please agree to T&Cs'),
    body('user_dob').isDate().withMessage('DOB must be a date.'),
    (req, res, next) => {
        const errors = validationResult(req);
        console.log("Validation...")
        //If validation fails, set errors in response.
        if (!errors.isEmpty()) {
            //send validated messages and user input back to user.
            const formErrors = errors.array()
            const formData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.register_email,
            }
            //response sent back will be status 400
            console.log({ errors: formErrors, formData })
            return res.status(400).json({ errors: formErrors, formData })
        }
        //if no errors, continue with process in routes
        console.log("Validate registration passed.")
        return next();
    }
]

const validateLogin = [
    body('login_email').isEmail().withMessage("Email is required."),
    body('login_password').notEmpty().withMessage("Password is required."),

    (req, res, next) => {
        const errors = validationResult(req);
        console.log("Validation...")
        //If validation fails, set errors in response.
        if (!errors.isEmpty()) {
            //send validated messages and user input back to user.
            const formErrors = errors.array()
            const formData = {
                email: req.body.login_email,
            }
            //response sent back will be status 400
            console.log({ errors: formErrors, formData })
            return res.status(400).json({ errors: formErrors, formData })
        }
        //if no errors, continue with process in routes
        console.log("Validate login passed.")
        next();
    }
]

const validateUpdate = [

    body('user_dob').isDate().withMessage("Must be a date."),
    body('user_country').escape().isLength({max: 100}).withMessage("Enrty too long."),
    body('user_city').escape().isLength({max: 100}).withMessage("Enrty too long."),
    body('user_bio').escape().isLength({max: 1000}).withMessage("Enrty too long."),

    (req, res, next) => {
        let errors = validationResult(req);
        console.log("Validation...")
        //If validation fails, set errors in response.
        if (!errors.isEmpty()) {
            //send validated messages and user input back to user.
            formErrors = errors.array()
            const formData = {
                user_dob: req.body.user_dob,
                user_country: req.body.user_country,
                user_city: req.body.user_city,
                user_bio: req.body.user_bio,
                user_id: req.body.user_id
            }
            //response sent back will be status 400
            console.log({ errors: formErrors, formData })
            return res.status(400).json({ errors: formErrors, formData })
        }
        //if no errors, continue with process in routes
        console.log("Validate update passed, moving to updateUser.")
        next();
    }

]

module.exports = {
    validateRegister, validateLogin, validateUpdate
}



