const User = require('../models/usersModel.js');
const Details = require('../models/detailsModel.js');
const Logs = require('../models/logsModel.js');
const Cipher = require('../middleware/encryption');
const { getAge, getDate } = require('../public/scripts/backend/functions.js');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {

    const {
        first_name,
        last_name,
        register_email,
        register_password1,
        register_password2,
        user_dob } = req.body;
    console.log("Registering with DOB: ", user_dob)
    //check if passwords match
    if (register_password1 != register_password2) {
        var formErrors = [{ msg: "ERROR: Passwords are not the same." }];
        const formData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            user_dob: req.body.user_dob
        }
        return res.status(400).json({ errors: formErrors, formData });
    }
    try {
        //Check if user exists
        const userExists = await User.findOne(register_email);
        if (userExists) {
            const formData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            }
            var formErrors = [{ msg: "Error please try again." }];
            return res.status(400).json({ errors: formErrors, formData });
        }
        //Hashing password
        const hashed_password = await Cipher.createHash(register_password1);
        const creation_date = getDate();
        //create user
        const user = await User.create(first_name, last_name, register_email, creation_date, hashed_password, user_dob);
        console.log('user created.', user.user_id);
        if (!user) {
            var formErrors = [{ msg: "Error creating user." }];
            return res.status(400).json({ errors: formErrors, formData });
        }
        //await Details.create(user.user_id, user_dob);
        var formData = [{ msg: "User registered succesfully." }];
        return res.status(200).json({ redirect: '/', formData });
    } catch (error) {
        console.log(error.message);;
        var formErrors = [{ msg: "Error creating user." }];
        const formData = req.body;
        return res.status(400).json({ errors: formErrors, formData });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { login_email, login_password } = req.body;
        //Search for user
        const foundUser = await User.findOne(login_email);
        if (!foundUser) {
            const formData = [];
            //Email not found, do not state this as is poses security risk.
            var formErrors = [{ msg: "Invalid, please try again." }];
            return res.status(400).json({ errors: formErrors });
        }
        //Check password
        const isMatch = await Cipher.compare(login_password, foundUser.password)
        if (!isMatch) {
            const formData = [login_email];
            //Login Failure - Create log in database
            const user_id = foundUser.user_id;
            const event_type = "login_failure"
            const event_message = `Email: ${login_email}, Incorrect Password: ${login_password}`;
            const endpoint = "/api/users/login"
            data = { user_id, event_type, event_message, endpoint };
            try {
                await Logs.create(data);
            } catch (error) {
                console.log(error)
            }
            return res.status(401).json({ errors: [{ msg: "Invalid credentials." }], formData });
        }
        if (foundUser.status === 'SUSPENDED') {
            console.log("Accounted suspended.")
            var formErrors = [{ msg: "Account Suspended." }];
            return res.status(400).json({ errors: formErrors });
        }
        //Success Login - Create log in database.
        const user_id = foundUser.user_id;
        const event_type = "login_success"
        const event_message = `Email: ${login_email}, logged in.`;
        const endpoint = "/api/users/login"
        data = { user_id, event_type, event_message, endpoint };
        try {
            await Logs.create(data);
        } catch (error) {
            console.log(error)
        }
        //sign jsonwebtoken, return payload
        const payload = { user_id: foundUser.user_id, email: foundUser.email, role: foundUser.role }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });

        //if user is ADMIN redirect to admin page, else user profile
        const redirect = foundUser.role === "ADMIN" ? "/api/users/admin" : `/api/users/profile/${foundUser.user_id}`;
        return res.cookie('token', accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000}).status(200).json({ redirect })
    } catch (error) {
        console.log("Error loginUser: ", error);
        res.status(500).json({ error: "Error logging in user." })
    }
};

exports.updateUser = async (req, res) => {
    console.log("Updating user: ", req.params.user_id)
    const user_id = req.params.user_id;
    const updates = req.body
    console.log("UPDATES:", updates)
    if (!user_id) {
        return res.status(404).render('404', { title: "404", formErrors: ["User updates not found!"] });
    }
    try {
        const updated = await Details.update(updates)
        if (!updated) {
            return res.status(404).json({ message: "No updates recieved." });
        }
        const foundUser = await User.findById(user_id);
        console.log("Updated: ", updated);
        const event_type = "update_success"
        const event_message = `Updated ${user_id} successfull.`;
        const endpoint = "/api/users/update"
        data = { user_id, event_type, event_message, endpoint };
        try {
            await Logs.create(data);
        } catch (error) {
            console.log(error)
        }
        const redirect = foundUser.role === "ADMIN" ? "/api/users/admin" : `/api/users/profile/${foundUser.user_id}`;
        return res.status(200).json({ redirect: redirect, formData: {} });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to update user.", formData });
    }
};
exports.renderProfile = async (req, res) => {
    try {
        const user_id = req.user?.user_id;
        console.log("Getting profile: ", req.params.user_id);
        const UserDetails = await User.findById(user_id);
        console.log("all user details: ", UserDetails);
        if (!UserDetails) {
            console.log("Could not get users information.");
            const formErrors = [{ msg: "Details not found" }];
            return res.status(404).render('404', { title: "404", formErrors, formData: {}, user: null });
        }
        const audios = [];
        const formErrors = req.session.formErrors || [];
        const formData = req.session.formData || {};
        const age = await getAge(UserDetails.user_dob);
        UserDetails.user_dob = age;
        //console.log(UserDetails.user_dob)
        return res.render("profile", { user: UserDetails, title: "Profile", audios, formData, formErrors });
    } catch (error) {
        console.log(error);
        return res.render("index", { title: "Login", formErrors: [], formData: [] });
    }
};
exports.renderUpdate = async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);
        if (!user) {
            console.log("Could not get users information.");
            const formErrors = [{ msg: "Details not found" }];
            return res.status(404).render('404', { title: "404", formErrors });
        }
        const age = await getAge(user.user_dob);
        user.user_dob = age;
        return res.render("update", { title: "Profile", user: user });
    } catch (error) {
        console.log(error);
        return res.render("index", { title: "Login", formErrors: [], formData: []});
    }
}
exports.sendMessage = async (req, res) => {

}
exports.logoutUser = async (req, res) => {
    const user_id = req.params.user_id;
    const event_type = "logout";
    const event_message = `Logged out.`;
    const endpoint = "/api/users/login"
    data = { user_id, event_type, event_message, endpoint };
    try {
        await Logs.create(data);
    } catch (error) {
        console.log(error);
    }
    res.clearCookie('token');
    res.redirect('/');
};
