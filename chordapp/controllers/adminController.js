const User = require('../models/usersModel.js');
const Details = require('../models/detailsModel.js');
const Cipher = require('../middleware/encryption');
const { getAge, getDate } = require('../public/scripts/functions.js');
const jwt = require('jsonwebtoken');

exports.getAdminPage = async (req, res) => {
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
exports.deleteUser = async (req, res) => {
}
exports.updateUser = async (req, res) => {
}
exports.suspendUser = async (req, res) => {
}
exports.selected_action = async (req, res) => {
            const  { user_ids, action } = req.body

            console.log(`Want to ${action} these: ${user_ids}`)

}