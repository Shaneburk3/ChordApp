const User = require('../models/usersModel.js');
const Details = require('../models/detailsModel.js');
const Cipher = require('../middleware/encryption');
const { getAge, getDate } = require('../public/scripts/functions.js');
const jwt = require('jsonwebtoken');

exports.getAdminPage = async (req, res) => {
    return res.render("admin", { title: "Profile", header: "Admin page", user: null, users: null });
}