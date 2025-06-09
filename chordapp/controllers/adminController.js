const User = require('../models/usersModel.js');
const Details = require('../models/detailsModel.js');
const Admin = require('../models/adminsModel.js');
const Log = require('../models/logsModel.js');
const Cipher = require('../middleware/encryption');
const { getAge } = require('../public/scripts/backend/functions.js');
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
        const formMessage = [];
        const formData = req.session.formData || {};
        console.log("Getting admin page data...");
        return res.render("admin", { user: UserDetails, title: "Profile", formData, formMessage, users: allUserDetails });
    } catch (error) {
        console.log(error);
        return res.render("index", { title: "Login", formErrors: [], formData: [] });
    }
}
exports.renderLogPage = async (req, res) => {
    try {
        const user_id = req.user?.user_id
        if (!user_id) {
            console.log("Unauthenticated.");
            const redirect = "/";
            return res.status(200).json({ redirect: redirect, formData: {} });
        }
        const UserDetails = await User.findById(user_id);
        const allLogs = await Log.getAllLogs()
        //console.log("All user details: ",allUserDetails)
        // GET ALL USER DATA.
        if (!allLogs) {
            console.log("Could not get users information.")
            const formErrors = [{ msg: "Details not found" }];
            return res.status(404).render('404', { title: "404", formErrors: formErrors });
        }
        const formMessage = req.session.formErrors || [];
        const formData = req.session.formData || {};
        console.log("Getting admin page data...");
        return res.render("logs", { logs: allLogs, title: "Profile", formData, formMessage, users: UserDetails });
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
            return res.status(404).render('404', { title: "404", formMessage: msg })
        }
        const age = await getAge(user.user_dob);
        user.user_dob = age;
        return res.render("updateUser", { title: "Update user", user: user });
    } catch (error) {
        console.log(error);
        return res.render("index", { title: "Login", formMessage: [error.msg] });
    }
}
exports.deleteUser = async (req, res) => {
    console.log("Deleting single user: ", req.body);
    try {
        const deleted = await Admin.delete(req.body)
        if (!deleted) {
            return res.status(404).json({ message: "No user deleted." });
        }
        console.log("User deleted")
        const redirect = "/api/users/admin";
        return res.status(200).json({ redirect: redirect });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to delete user." });
    }
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
        return res.status(200).json({ redirect: redirect });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to update user." });
    }
}
exports.suspendUser = async (req, res) => {
    console.log("suspending single user");
    try {
        const suspended = await Admin.suspend(user_ids);
        if (!suspended) {
            return res.status(404).json({ message: "No user suspended." });
        }
        console.log("User suspended")
        const redirect = "/api/users/admin";
        return res.status(200).json({ redirect: redirect });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to suspend user." });
    }
}
exports.unsuspendUser = async (req, res) => {
    console.log("Unsuspending single user");
    try {
        const user_id = req.body.user_id;
        const suspended = await Admin.unsuspend(user_id);
        if (!suspended) {
            return res.status(404).json({ message: "No user Unsuspended." });
        }
        console.log("User unsuspended")
        const redirect = "/api/users/admin";
        return res.status(200).json({ redirect: redirect });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to suspend user." });
    }
}

exports.bulkUpdate = async (req, res) => {
    const { user_ids, action } = req.body
    console.log(`Want to ${action} these: ${user_ids}`)
    if (!user_ids) {
        const redirect = "/api/users/admin";
        return res.status(400).json({ redirect: redirect, formData: "No users selected" });
    }
    if (action === "delete") {
        console.log("Deleting users:", user_ids);
        try {
            const deleted = await Admin.delete(user_ids);
            if (!deleted) {
                return res.status(404).json({ message: "No users deleted." });
            }
            console.log("Users deleted")
            const redirect = "/api/users/admin";
            return res.status(200).json({ redirect: redirect, formData: "User accounts deleted." });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Failed to deleted user." });
        }
    } else if (action === "suspend") {
        console.log("Suspending users:", user_ids);
        try {
            const suspended = await Admin.suspend(user_ids);
            if (!suspended) {
                return res.status(404).json({ message: "No users suspended." });
            }
            console.log("Users suspended")
            const redirect = "/api/users/admin";
            return res.status(200).json({ redirect: redirect, formData: "User accounts updated." });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Failed to update user." });
        }
    } else if (action === "unsuspend") {
        console.log("unsuspend users:", user_ids);
        try {
            const unsuspend = await Admin.unsuspend(user_ids)
            if (!unsuspend) {
                return res.status(404).json({ message: "No users unsuspend." });
            }
            console.log("Users unsuspend")
            const redirect = "/api/users/admin";
            return res.status(200).json({ redirect: redirect, formData: "User accounts updated." });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Failed to update user." });
        }
    }
}
exports.filterLogs = async (req, res) => {
    console.log("Filter logs by: ", req.body)
}