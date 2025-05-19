const User = require('../models/usersModel.js');
const Details = require('../models/detailsModel.js');
const Cipher = require('../middleware/encryption');
const Session = require('../utils/express-session.js');
const { getDate } = require('../public/scripts/functions.js');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');


exports.registerUser = async (req, res) => {

    const {
        first_name,
        last_name,
        register_email,
        register_password1,
        register_password2,
        user_dob } = req.body;
        console.log(req.body)

    try {
        //Check if user exists
        const userExists = await User.findOne(register_email);
        if (userExists) {
            const formData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            }
            var formErrors = [{ msg: "Error please try again." }];
            return res.status(400).render("register", { title: "Register", formErrors, formData });
        }
        //check if passwords match
        if (register_password1 != register_password2) {
            var formErrors = [{ msg: "ERROR: Passwords are not the same." }];
            const formData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                user_dob: req.body.user_dob
            }
            return res.status(400).render("register", { title: "Register", formErrors, formData });
        }
        //Hashing password
        const hashed_password = await Cipher.createHash(register_password1);
        const creation_date = getDate();
        //create user
        const user = await User.create(first_name, last_name, register_email, creation_date, hashed_password, user_dob);
        console.log('user created.', user.user_id);
        await Details.create(user.user_id);
        return res.redirect('/');
    } catch (error) {
        console.log(error.message);;
        var formErrors = [{ msg: "Error creating user." }];
        const formData = req.body;
        return res.status(400).render("register", { title: "Register", formErrors, formData });
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
            var formErrors = [{ msg: "Invalid credentials, please try again." }];
            return res.render('index', { title: "Login", formErrors, formData })

        }
        //Check password
        const isMatch = await Cipher.compare(login_password, foundUser.password)
        if (!isMatch) {
            const formErrors = [{ msg: "Invalid email or password" }];
            const formData = [];
            return res.render('index', { title: "Login again", formErrors, formData })
        }
        //sign jsonwebtoken
        const payload = { id: foundUser.user_id, email: foundUser.email, role: foundUser.role}

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'});

        res.cookie('token', accessToken, {httpOnly: true, maxAge: 30 * 60 * 1000 });
        if(foundUser.role === "ADMIN") {
            return res.redirect('/api/users/admin')
        }
        return res.redirect(`/api/users/profile/${foundUser.user_id}`)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error logging in user."})
    }
};

exports.updateUser = async (req, res) => {
    console.log("Updating user...")
    const user_id = req.params.user_id;
    const data = req.body
    console.log("UPDATES:", req.body)
    if (!user_id) {
        return res.status(404).render('404', { title: "404", formErrors: ["User updates not found!"] })
    }
    try {
        const updated = await Details.update(data)
        if (!updated) {
            res.status(404).json({ message: "No updates recieved." })
        }
        console.log("Updated: ", updated)
        return res.status(200).json({ message: "User update successful.", user: updated })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to update user." })
    }
};
exports.getUserProfile = async (req, res) => {
    try {
        const id = await req.params.user_id
        const UserDetails = await User.getUserWithDetails(id);
        console.log("all user details: ", UserDetails)
        if (!UserDetails) {
            console.log("Could not get users profile.")
            const formErrors = [{ msg: "Details not found" }];
            return res.status(404).render('404', { title: "404", formErrors });
        }
        const audios = [];
        return res.render("profile", { user: UserDetails, title: "Profile", audios});
    } catch (error) {
        console.log(error);
    }
};
exports.getUpdatePage = async (req, res) => {
    try {
        const userDetails = await User.getUserWithDetails(req.params.user_id);

        if (!userDetails) {
            console.log("Could not get users information.")
            return res.status(404).render('404', { title: "404", formErrors: "User details found!" })
        }
        return res.render("update", { title: "Profile", user: userDetails, formErrors: [] });
    } catch (error) {
        console.log(error);
        res.render("index", { title: "Login", formErrors: [] });
    }
}
exports.sendMessage = async (req, res) => {

}
exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
};
exports.getAdminPage = async (req, res) => {
    return res.render("admin", { title: "Profile", header: "Admin page", user: null, users: null });
}
exports.deleteUser =  async (req, res) => {

}
exports.suspendUser =  async (req, res) => {
    
}
exports.updateUser =  async (req, res) => {
    
}
