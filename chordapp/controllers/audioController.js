//const Audio = require('../models/audiosModel.js');
//const Logs = require('../models/logsModel.js');
//const Session = require('../utils/express-session.js');
const audioModel = require('../models/audiosModel.js');
const User = require('../models/usersModel.js');
const { getAge } = require('../public/scripts/backend/functions.js');
//const tf = require('@tensorflow/tfjs-node');
const path = require('path');
//const { pathToFileUrl } = require('url');
//const modelPath = path.join(__dirname, '..', '..', 'notebooks', 'models', '')
//const model = tf.loadLayersModel('File://C:/Users/shane/Documents/GitHub/Chord_App/notebooks/chord_model.keras');

//child process to work with python script
const { spawn } = require('child_process');

exports.renderTranslate = async (req, res) => {
            try {
            const user_id = req.params?.user_id
            if (user_id) { 
            //const user_id = req.user?.user_id
            console.log("Getting translator page for: ", req.params.user_id)
            const UserDetails = await User.findById(user_id);
            console.log("all user details: ", UserDetails)
            if (!UserDetails) {
                console.log("Could not get users information.")
                const formErrors = [{ msg: "Details not found" }];
                return res.status(404).render('404', { title: "404", formErrors, formData: {}, user: null });
            }
            const audios = [];
            const formErrors = req.session.formErrors || [];
            const formData = req.session.formData || {};
            console.log("Getting user profile...");
            const age = await getAge(UserDetails.user_dob);
            UserDetails.user_dob = age;
            //console.log(UserDetails.user_dob)
            return res.render('translator', { title: "Chord translator", formErrors: [], formData: [], user: UserDetails || null})
            } else {
            const audios = [];
            const formErrors = req.session.formErrors || [];
            const formData = req.session.formData || {};
            //console.log(UserDetails.user_dob)
            return res.render('translator', { title: "Chord translator", formErrors, formData, user: null, audios}); 
            }               
        } catch (error) {
            console.log(error);
            return res.render('translator', { title: "Chord translator", formErrors: [], formData: [], user: req.user || null})
        }
}
exports.singleAudio = async (req, res) => {
    
    const audio_id = req.params.audio_id;
    const single_audio = audioModel.findOne(audio_id)
    res.render(`audio`, { title: "Sigle audio", audio: single_audio })

    const audio = {
        audio_id: audio_id
    }
    
}

exports.findOne = async (req, res) => {

    res.render("audio")

};

exports.update = async (req, res) => {

};

exports.delete = async (req, res) => {

};
exports.upload = async (req, res) => {

};

//create
exports.predict = async (req, res) => {
    console.log("Predicting chord...")
    console.log(req.file)
    console.log(req.file.path)

    //return res.status(200).json({chord: 'C Major'})
    try {
        const audioPath = req.file.path;

        const python = spawn('python', [
            path.join(__dirname, '/predict.py'),
            audioPath
        ]);

        let output = '';
        python.stdout.on('data', (data) => {
            output += data.toString();
        });

        python.stderr.on('data', (err) => {
            console.error(`Python error: ${err}`);
        });

        python.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Model prediction failed.' });
            }
            const chordIndex = parseInt(output.trim());
            const label = indexToChordLabel[chordIndex]; // map index back to label
            return res.status(200).json({ chord: output.trim() });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


