const express = require('express');
const router = express.Router();
const session = require('express-session');
//const userController = require('../controllers/userController');
const audioController = require('../controllers/audioController');
const { validateAudio } = require('../middleware/validation');
const { authenticateToken, checkAdmin, optionalAuth} = require('../middleware/authentication');

// Session Setup
router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

router.get("/translator", optionalAuth, audioController.translatorPage); 

router.get('/translator/:user_id', authenticateToken, audioController.translatorPage);


//route to a selected audio file, will be used to edit submission.
router.get("/:user_id/:audio_id", optionalAuth, audioController.singleAudioPage);

router.post("/translator", optionalAuth, audioController.translate);


module.exports = router;