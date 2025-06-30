const express = require('express');
const router = express.Router();
const session = require('express-session');
//const userController = require('../controllers/userController');
const audioController = require('../controllers/audioController');
const { authToken, checkAdmin, optionalAuth} = require('../middleware/authentication');
// Used for saving audio files
const upload = require('../middleware/multer')
// Give the absolute path to the project
const path = require('path')

// Session Setup
router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// Render translate page
router.get("/translator", optionalAuth, audioController.renderTranslate); 
// Render translate page for signed in user
router.get('/translator/:user_id', authToken, audioController.renderTranslate);


//Select audio file
router.get("/:user_id/:audio_id", optionalAuth, audioController.findOne);
// Predict chord
router.post("/predict/:user_id", optionalAuth, upload.single('audio'), audioController.predict);
// Save prediction
router.post("/predict/:user_id/save", authToken, upload.single('audio'),audioController.saveAudio);

router.post("/delete/:audio_id/user/:user_id", authToken, audioController.deleteAudio);

module.exports = router;