const express = require('express');
const router = express.Router();
const session = require('express-session');
//const userController = require('../controllers/userController');
const audioController = require('../controllers/audioController');
const { validateAudio } = require('../middleware/validation');
const { authToken, checkAdmin, optionalAuth} = require('../middleware/authentication');
const multer = require('multer');
const upload = multer({dest: '/uploads'}) // save user audios to uploads file

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

//router.post("/translator", optionalAuth, audioController.translate);

// Audio Routes 

// /predict

router.post("/predict", optionalAuth, upload.single('audio'), audioController.predict);




module.exports = router;