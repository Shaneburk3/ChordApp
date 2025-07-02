const { body, validationResult } = require('express-validator');
const Logs = require('../models/logsModel');

const validateRegister = [
    body('first_name').escape().trim().notEmpty().withMessage('First name required').matches(/^[A-Za-z0-9 .,'!&]+$/).withMessage('First Name: No special characters'),
    body('last_name').escape().trim().notEmpty().withMessage('Last name required').matches(/^[A-Za-z0-9 .,'!&]+$/).withMessage('Last Name: No special characters'),
    body('register_email').trim().isEmail().withMessage('Must be an email.'),
    body('register_password1').trim().isLength({ min: 8 }).withMessage("Password is not long enough").matches(/^(?=.*[!@#$%^&*()<>,.:"])/).withMessage('Must contain atleast 1 special character.'),
    body('register_password2').trim().custom((value, { req }) => { if(value !== req.body.register_password1) { throw new Error('Passwords do not match'); } return true; }),
    body('terms_check').equals("on").withMessage('Please agree to T&Cs'),
    body('user_dob').isDate().withMessage('DOB must be a date.'),
    async (req, res, next) => { 
        const errors = validationResult(req);
        console.log("Validation...");
        //If validation fails, set errors in response.
        if (!errors.isEmpty()) {
            //send validated messages and user input back to user.
            const formErrors = errors.array();
            const formData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.register_email,
            }
            // Map errors from array, to a message for each error.
            const errorMessages = formErrors.map(err =>
                `Registration: "${err.msg}": Value ${err.value}`
            );
            // Log error in database.
            const event_type = "validation_failure"
            const event_message = `${errorMessages}`;
            const endpoint = "/api/users/register"
            data = { event_type, event_message, endpoint };
            try {
                await Logs.create(data);
            } catch (error) {
                console.log(error)
            }
            // Response sent back will be status 400 on pass
            console.log({ errors: formErrors, formData });
            return res.status(400).json({ errors: formErrors, formData });
        }
        //if no errors, continue with process in routes
        console.log("Validate registration passed.");
        return next();
    }
]

const validateLogin = [
    body('login_email').isEmail().withMessage("Email is required."),
    body('login_password').notEmpty().withMessage("Password is required."),

    async (req, res, next) => {
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
            console.log({ errors: formErrors, formData });
            const errorMessages = formErrors.map(err =>
                `Login: "${err.msg}": Value ${err.value}`
            );
            console.log(errorMessages);
            // Log error in database.
            const event_type = "validation_failure"
            const event_message = `${errorMessages}`;
            const endpoint = "/api/users/login"
            data = { event_type, event_message, endpoint };
            try {
                await Logs.create(data);
            } catch (error) {
                console.log(error)
            }
            return res.status(400).json({ errors: formErrors, formData })
        }
        //if no errors, continue with process in routes
        console.log("Validate login passed.")
        next();
    }
]

const validateUpdate = [

    body('user_dob').isDate().withMessage("Must be a date."),
    body('user_country').escape().isLength({ max: 100 }).withMessage("Entry too long."),
    body('user_city').escape().isLength({ max: 100 }).withMessage("Entry too long."),
    body('user_bio').escape().isLength({ max: 1000 }).withMessage("Entry too long."),

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
        console.log(`Validated ${JSON.stringify(req.body)}, moving to updateUser.`)
        next();
    }

]

module.exports = {
    validateRegister, validateLogin, validateUpdate
}



