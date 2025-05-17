const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const audioController = require('../controllers/audioController');
const { validateRegister, validateLogin } = require('../middleware/validator');

router.post('/register', validateRegister, userController.registerUser);

router.post('/login', validateLogin, userController.loginUser)

router.get("/profile/:user_id", userController.getUserProfile);

router.get("/update/:user_id", userController.getUpdatePage);

router.get("/update", (req, res) => {
    res.render("update", { header: "Update", title: "Update", user: [], details: [] });
});

router.put("/update/:user_id", userController.updateUser);


module.exports = router;