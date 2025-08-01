const User = require('../models/usersModel.js');
const Admin = require('../models/adminsModel.js');
const Log = require('../models/logsModel.js');
const { getAge } = require('../public/scripts/backend/functions.js');

exports.renderAdmin = async (req, res) => {
    try {
        const user_id = req.user?.user_id
        const adminDetails = await User.findById(user_id);
        const allUserDetails = await User.getAllUsers()
        // Get all user data.
        if (!allUserDetails) {
            console.log("Could not get users information.")
            const formErrors = [{ msg: "Details not found" }];
            return res.status(404).render('404', { title: "404", formErrors });
        }
        if (!adminDetails) {
            console.log("Could not get admins information.")
            const formErrors = [{ msg: "Details not found" }];
            return res.status(404).render('404', { title: "404" });
        }
        const formMessage = [];
        const formData = req.session.formData || {};
        console.log("Getting admin page data...");
        return res.render("admin", { title: "Profile", formData, formMessage, users: allUserDetails, user: adminDetails, });
    } catch (error) {
        console.log(error);
        return res.render("index", { title: "Login", formErrors: [], formData: [] });
    }
}
exports.renderLogPage = async (req, res) => {
    try {
        const user_id = parseInt(req.user?.user_id)
        // Users current page number, limit and event
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 25
        const event = req.query.event
        // Get start and end value of logs i.e. 25
        const startIndex = (page - 1) * limit
        // End number for logs i.e. 50
        const endIndex = page * limit
        const results = {}

        if (!user_id) {
            console.log("Unauthenticated.");
            formData = 'Unauthenticated, please sign in'
            const redirect = "/";
            return res.status(200).json({ redirect: redirect, formData });
        }
        const adminDetails = await User.findById(user_id);
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
        // Get values within start, end index

        results.event = event;

        results.filteredLogs = allLogs.slice(startIndex, endIndex)

        console.log(`Filtered: ${results.filteredLogs.length}`)

        results.pagesNeeded = Math.ceil(results.filteredLogs / limit)
        results.currentPage = page
        console.log(`Current page: ${results.currentPage}`)
        if (endIndex < allLogs.length) {
            results.next = { page: page + 1, limit: limit }
        }
        if (startIndex > 0) {
            results.previous = { page: page - 1, limit: limit } 
        }
        //results = {filteredLogs, pagesNeeded, currentPage}
        return res.render("logs", { results, title: "Profile", formData, formMessage, user: adminDetails });
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
        const user_id = req.body;
        const event_type = "admin_action"
        const event_message = `${req.body} deleted.`;
        const endpoint = "/api/users/admin/delete"
        data = { user_id, event_type, event_message, endpoint };
        try {
            await Log.create(data);
        } catch (error) {
            console.log(error)
        }
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
    const user_email = req.body.user_email;
    let data = req.body
    if (!user_id) {
        return res.status(404).render('404', { title: "404", formErrors: ["User updates not found!"] });
    }
    try {
        const updated = await Admin.update(data)
        if (!updated) {
            return res.status(404).json({ message: "No updates recieved." });
        }
        const user_id = req.params.user_id;
        const event_type = "admin_action"
        const event_message = `${user_email} updated by admin.`;
        const endpoint = "/api/users/admin/update";
        data = { user_id, event_type, event_message, endpoint };
        try {
            await Log.create(data);
        } catch (error) {
            console.log(error)
        }
        const redirect = "/api/users/admin/";
        return res.status(200).json({ redirect: redirect });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to update user." });
    }
}
exports.suspendUser = async (req, res) => {
    console.log("suspending single user");
    const user_email = req.body.user_email;
    try {
        const suspended = await Admin.suspend(user_ids);
        if (!suspended) {
            return res.status(404).json({ message: "No user suspended." });
        }
        const user_id = req.body;
        const event_type = "admin_action"
        const event_message = `${user_email} suspended by admin.`;
        const endpoint = "/api/users/admin/suspend";
        data = { user_id, event_type, event_message, endpoint };
        try {
            await Log.create(data);
        } catch (error) {
            console.log(error)
        }
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
        const event_type = "admin_action"
        const event_message = `${user_email} unsuspended by admin.`;
        const endpoint = "/api/users/admin/unsuspend";
        data = { user_id, event_type, event_message, endpoint };
        try {
            await Log.create(data);
        } catch (error) {
            console.log(error)
        }
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
            // Log Admin bulk delete
            const event_type = "admin_action"
            const event_message = `${user_ids} deleted.`;
            const endpoint = "/api/users/admin/selected_action";
            data = { user_ids, event_type, event_message, endpoint };
            try {
                await Log.create(data);
            } catch (error) {
                console.log(error)
            }
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
            // Log Admin bulk delete
            const event_type = "admin_action"
            const event_message = `${user_ids} suspended.`;
            const endpoint = "/api/users/admin/selected_action";
            data = { user_ids, event_type, event_message, endpoint };
            try {
                await Log.create(data);
            } catch (error) {
                console.log(error)
            } const redirect = "/api/users/admin";
            return res.status(200).json({ redirect: redirect, formData: "User accounts updated." });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Failed to update user." });
        }
    } else if (action === "unsuspend") {
        console.log("unsuspend users:", user_ids);
        try {
            const unsuspend = await Admin.unsuspend(user_ids);
            if (!unsuspend) {
                return res.status(404).json({ message: "No users unsuspend." });
            }
            // Log Admin bulk delete
            const event_type = "admin_action"
            const event_message = `${user_ids} unsuspended.`;
            const endpoint = "/api/users/admin/selected_action";
            data = { user_ids, event_type, event_message, endpoint };
            try {
                await Log.create(data);
            } catch (error) {
                console.log(error)
            } const redirect = "/api/users/admin";
            return res.status(200).json({ redirect: redirect, formData: "User accounts updated." });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Failed to update user." });
        }
    }
}
exports.filterLogs = async (req, res) => {
    const { selected_event, selected_id } = req.body

    console.log("Filter logs by:", selected_event, "With:", selected_id);
    formData = []
    formMessage = []
    // Users current page
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 25
    // Get start and end value of logs i.e. 25
    const startIndex = (page - 1) * limit
    // End number for logs i.e. 50
    const endIndex = page * limit
    const results = {}
    results.event = { selected_event }

    try {
        const filtered = await Log.Filter(selected_event, selected_id);
        results.filteredLogs = filtered.slice(startIndex, endIndex)

        console.log(`Filtered: ${results.filteredLogs.length}`)

        results.pagesNeeded = Math.ceil(filtered.length / limit)
        results.currentPage = page
        console.log(`Current page: ${results.currentPage}`)
        if (endIndex < filtered.length) {
            results.next = { page: page + 1, limit: limit }
        }
        if (startIndex > 0) {
            results.previous = { page: page - 1, limit: limit }
        }
        return res.render("logs", { results, logs: filtered, title: "Filtered Logs", formData, formMessage });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to filter log." });
    }
}