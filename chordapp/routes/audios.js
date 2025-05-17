const express = require('express');
const router = express.Router();
//const userController = require('../controllers/userController');
const audioController = require('../controllers/audioController');
const { validateRegister, validateLogin } = require('../middleware/validator');

router.get("/translator", (req, res) => {
    res.render("translator", { header: "translator page", title: "translator", user: null, error_message: []});
});

router.get("/audio", (req, res) => {
    res.render("audio", { header: "audio page", title: "audio", user: null, error_message: []});
});

//route to a selected audio file, will be used to edit submission.
router.get("/:user_id/:audio_id", (req, res) => {
    res.render("audio", { header: "Audio file", title: "audio", user: null, error_message: []});
});

router.get("/:user_id/:audio_id", audioController.findOne);

router.post("/translator/translate", audioController.translate);


module.exports = router;