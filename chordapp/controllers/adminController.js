const User = require('../models/usersModel.js');
const Details = require('../models/detailsModel.js');
const Admin = require('../models/adminsModel.js')
const Cipher = require('../middleware/encryption');
const { getAge, getDate } = require('../public/scripts/functions.js');
const jwt = require('jsonwebtoken');

exports.renderAdmin = async (req, res) => {
    try {
        const user_id = req.user?.user_id
        const UserDetails = await User.findById(user_id);
        const allUserDetails = await User.getAllUsers()
        //console.log("All user details: ",allUserDetails)
        // GET ALL USER DATA.
        if (!allUserDetails) {
            console.log("Could not get users information.")
            const formErrors = [{ msg: "Details not found" }];
            return res.status(404).render('404', { title: "404" });
        }
        if (!UserDetails) {
            console.log("Could not get users information.")
            const formErrors = [{ msg: "Details not found" }];
            return res.status(404).render('404', { title: "404" });
        }
        const formErrors = req.session.formErrors || [];
        const formData = req.session.formData || {};
        console.log("Getting admin page data...");
        return res.render("admin", { user: UserDetails, title: "Profile", formData, formErrors, users: allUserDetails });
    } catch (error) {
        console.log(error);
        return res.render("index", { title: "Login", formErrors: [], formData: [] });
    }
}
exports.renderUpdatePage = async (req, res) => {
        try {
        const user = await User.findById(req.params.user_id);
        if (!user) {
            console.log("Could not get users information.")
            const formErrors = [{ msg: "Details not found" }];
            return res.status(404).render('404', { title: "404", formErrors })
        }
        const age = await getAge(user.user_dob);
        user.user_dob = age;
        return res.render("updateUser", { title: "Update user", user: user });
    } catch (error) {
        console.log(error);
        return res.render("index", { title: "Login", formErrors: [] });
    }
}
exports.deleteUser = async (req, res) => {
    console.log("Deleting single user");
}
exports.updateUser = async (req, res) => {
    console.log("updating single user with:", req.body);
    console.log("Updating user: ", req.params.user_id);
    const user_id = req.params.user_id;
    const data = req.body
    if (!user_id) {
        return res.status(404).render('404', { title: "404", formErrors: ["User updates not found!"] });
    }
    try {
        const updated = await Admin.update(data)
        if (!updated) {
            return res.status(404).json({ message: "No updates recieved." });
        }
        console.log("User updated")
        const redirect = "/api/users/admin";
        return res.status(200).json({ redirect: redirect, formData: {} });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to update user." });
    }
}
exports.suspendUser = async (req, res) => {
    console.log("suspending single user");

}

exports.bulkUpdate = async (req, res) => {
    const { user_ids, action } = req.body
    console.log(`Want to ${action} these: ${user_ids}`)
    if (action === "delete") {

    } else if (action === "suspend") {

    } else if (action === "unsuspend") {

    }

}