const Audio = require('../models/audiosModel.js');
const Session = require('../utils/express-session.js');
const audioModel = require('../models/audiosModel.js');
const User = require('../models/usersModel.js');
const { getAge, getDate } = require('../public/scripts/functions.js');


exports.translatorPage = async (req, res) => {
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
exports.singleAudioPage = async (req, res) => {
    
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

//create
exports.translate = async (req, res) => {

};


