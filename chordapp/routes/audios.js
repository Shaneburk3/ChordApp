const express = require('express');
const router = express.Router();
const session = require('express-session');
//const userController = require('../controllers/userController');
const audioController = require('../controllers/audioController');
const { validateAudio } = require('../middleware/validation');
const { authToken, checkAdmin, optionalAuth} = require('../middleware/authentication');
// Used for working with audio files
const upload = require('../middleware/multer')
//Give the absolute path to the project
const path = require('path')

// Session Setup
router.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

router.get("/translator", optionalAuth, audioController.renderTranslate); 

router.get('/translator/:user_id', authToken, audioController.renderTranslate);


//route to a selected audio file, will be used to edit submission.
router.get("/:user_id/:audio_id", optionalAuth, audioController.singleAudio);

// Audio Routes 

// /predict

router.post("/predict/:user_id", optionalAuth, upload.single('audio'), audioController.predict);
router.post("/predict/:user_id/save", optionalAuth, audioController.saveAudio);



module.exports = router;