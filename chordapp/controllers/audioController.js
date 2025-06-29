const audioModel = require('../models/audiosModel.js');
const User = require('../models/usersModel.js');
const Audio = require('../models/audiosModel.js')
const { getAge } = require('../public/scripts/backend/functions.js');
const path = require('path');
const fs = require('fs');
const { Blob } = require("buffer");
// Found at https://stackoverflow.com/questions/63576988/how-to-use-formdata-in-node-js-without-browser
var FormData = require('form-data');

// node-fetch is only compatible with using APIs
const fetch = require('node-fetch');
// S3 Bucket connection
const getS3 = require('../utils/aws-s3.js')


//child process to work with python script running in Flask Application
const { spawn } = require('child_process');
const { ConsoleLogEntry } = require('selenium-webdriver/bidi/logEntries.js');

exports.renderTranslate = async (req, res) => {
    try {
        const user_id = req.params?.user_id
        if (user_id) {
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
            return res.render('translator', { title: "Chord translator", formErrors: [], formData: [], user: UserDetails || null })
        } else {
            const audios = [];
            const formErrors = req.session.formErrors || [];
            const formData = req.session.formData || {};
            return res.render('translator', { title: "Chord translator", formErrors, formData, user: null, audios });
        }
    } catch (error) {
        console.log(error);
        return res.render('translator', { title: "Chord translator", formErrors: [], formData: [], user: req.user || null })
    }
}
exports.findOne = async (req, res) => {

    const audio_id = req.params.audio_id;
    const user_id = req.params.user_id;
    if (!audio_id || !user_id) {
        console.log("No IDs provided.")
        const formErrors = [{ msg: "Details not found" }];
        return res.status(404).render('404', { title: "404", formErrors, formData: {}, user: null });
    }
    console.log("Getting translator page for: ", req.params.user_id)
    const UserDetails = await User.findById(user_id);
    console.log("all user details: ", UserDetails)
    if (!UserDetails) {
        console.log("Could not get users information.")
        const formErrors = [{ msg: "Details not found" }];
        return res.status(404).render('404', { title: "404", formErrors, formData: {}, user: null });
    }
    let single_audio = await audioModel.findOne(audio_id)
    if (!single_audio) {
        console.log("Could not get users audio.")
        const formErrors = [{ msg: "Details not found" }];
        return res.status(404).render('404', { title: "404", formErrors, formData: {}, user: null });
    }
    single_audio = single_audio[0]
    console.log("all audio details: ", single_audio)
    return res.render(`audio`, { title: "Single audio", single_audio, user: UserDetails })

    };

    exports.update = async (req, res) => {

    };

    exports.delete = async (req, res) => {

    };

    // REF: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html

    exports.saveAudio = async (req, res) => {
        const user_id = req.params?.user_id || null
        const chord = req.body.chord
        if (!req.file) {
            console.log("No file sent.");
            return res.status(400).json({ errors: [{ msg: 'No audio sent with request.' }] })
        }
        console.log(`Saving audio for user ${user_id}: ${JSON.stringify(req.file)}`)
        // Configure the file stream and obtain the upload parameters

        const s3 = await getS3()

        // Get the temp audio saved in /uploads
        var fileStream = fs.createReadStream(req.file.path);
        fileStream.on("error", function (err) {
            console.log("File Error", err);
        });

        var uploadParams = { Bucket: process.env.AWS_BUCKET, Key: `audios/${user_id}/${req.file.filename}`, Body: fileStream };
        try {
            // call S3 to save upload file to specified bucket
            const result = await s3.upload(uploadParams).promise();
            console.log(`Success uploading to S3: ${JSON.stringify(result.Key)}`)
            const S3_location = result.Location;
            const S3_key = result.Key;
            const data = { user_id, S3_location, S3_key, chord }
            Audio.create(data)
            const redirect = `/api/audios/translator/${user_id}`;
            return res.status(200).json({ redirect: redirect, message: 'Audio uploaded to S3 successfull' })

        } catch (err) {
            console.log(`Error uploading to S3 Bucket: ${err}`)
            return res.status(500).json({ errors: [{ msg: 'Failed to updload to S3' }] });
        } finally {
            console.log("Removing: ", req.file.path)
            fs.unlink(req.file.path, (err) => err && console.error(err))
            console.log("Audio file removed from temp directory")
        }

    };

    //create
    exports.predict = async (req, res) => {
        console.log("Predicting chord...")

        result = {}

        const user_id = req.params?.user_id || null
        const filePath = req.file.path;
        // Path to audios loaded will be saved in /uploads
        console.log(`User ${user_id} audio path `, filePath)
        // Create formData, append user audio.
        const form = new FormData();
        form.append('audio', fs.createReadStream(filePath), {
            fileName: req.file.filename,
            contentType: req.file.mimetype
        });

        try {
            // Send audio to Flask API, that is running on port 5000
            const response = await fetch(`http://127.0.0.1:5000/api/audios/${user_id}/predict`, {
                method: "POST",
                body: form,
                headers: form.getHeaders()
            });
            const chord = await response.json();
            result.prediction = chord
            result.user_id = user_id
            console.log("RESULT FROM FLASK API: ", result)
            return res.status(200).json(result)
        } catch (err) {
            console.error(err);
            return res.status(500).json({ errors: [{ msg: 'Error submitted request.' }] });
        } finally {
            console.log("Removing: ", req.file.path)
            fs.unlink(req.file.path, (err) => err && console.error(err))
            console.log("Audio file removed from temp directory")
        }
    };


