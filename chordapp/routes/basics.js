const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const { optionalAuth } = require('../middleware/authentication');



router.get("/about", optionalAuth, (req, res) => {
    res.render("about", { header: "About", title: "About" });
});

router.get("/contact", optionalAuth, (req, res) => {
    res.render("contact", { header: "Contact", title: "Contact" });
});

router.get("/404", optionalAuth, (req, res) => {
    res.render("404", { header: "404", title: "404", error_message: [] });
}); 

router.post("/send_message", optionalAuth, userController.sendMessage);

module.exports = router;