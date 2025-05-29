const Audio = require('../models/audiosModel.js');
const Session = require('../utils/express-session.js');
const audioModel = require('../models/audiosModel.js')

exports.translatorPage = async (req, res) => {
res.render('translator', { title: "Chord translator", user: req.user || null})
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


