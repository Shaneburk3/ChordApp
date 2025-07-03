const audioModel = require('../models/audiosModel.js');
const User = require('../models/usersModel.js');
const Audio = require('../models/audiosModel.js')
const { getAge } = require('../public/scripts/backend/functions.js');
const path = require('path');
const fs = require('fs');
// Found at https://stackoverflow.com/questions/63576988/how-to-use-formdata-in-node-js-without-browser
var FormData = require('form-data');

// node-fetch is only compatible with using APIs
const fetch = require('node-fetch');
// S3 Bucket connection
const { getS3 }  = require('../utils/aws-s3.js');

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
    // Retrieve one single audio
    const audio_id = req.params.audio_id;
    const user_id = req.params.user_id;
    if (!audio_id || !user_id) {
        console.log("Both IDs not provided.")
        const formErrors = [{ msg: "Both IDs not provided" }];
        return res.status(404).render('404', { title: "404", formErrors, user: null });
    }
    console.log("Getting translator page for: ", req.params.user_id)
    const UserDetails = await User.findById(user_id);
    console.log("all user details: ", UserDetails);
    if (!UserDetails) {
        console.log("Could not get users information.")
        const formErrors = [{ msg: "Details not found" }];
        return res.status(404).render('404', { title: "404", formErrors, formData: {}, user: null });
    }
    let single_audio = await audioModel.findOne(audio_id)
    if (!single_audio) {
        console.log("Could not get users audio.")
        const formErrors = [{ msg: "Audio not found" }];
        return res.status(404).render('404', { title: "404", formErrors, formData: {}, user: null });
    }
    single_audio = single_audio[0]
    console.log("all audio details: ", single_audio)
    return res.render(`audio`, { title: "Single audio", single_audio, user: UserDetails })

};

exports.deleteAudio = async (req, res) => {
    const audio_id = req.params?.audio_id || null
    const user_id = req.params?.user_id || null
    const audio_url = req.body.audio_url
    const file_name = req.body.file_name

    console.log(`Got URL: ${audio_url} for user: ${user_id} with audio ID: ${audio_id}`)

    if (!audio_id) {
        console.log("No audio sent.");
        return res.status(400).json({ errors: [{ msg: 'No audio sent with delete request.' }] })
    }
    // Connect to S3 Bucket from utils/aws-s3
    const s3 = await getS3();
    var uploadParams = { Bucket: process.env.AWS_BUCKET, Key: `${file_name}` };
    try {
        // call S3 to delete file specified in uploadParams
        await s3.deleteObject(uploadParams).promise();
        // Delete audio from PostgreSQL
        const response = await Audio.delete(audio_id)
        if (response) {
            console.log(`Audio ${JSON.stringify(response.audio_id)} deleted.`)
        }
        const redirect = `/api/users/profile/${user_id}`;
        return res.status(200).json({ redirect: redirect, message: 'Audio deleted from S3 successful' })

    } catch (err) {
        console.log(`Error deleting S3 Object: ${err}`)
        return res.status(500).json({ errors: [{ msg: 'Failed to delete from S3' }] });
    } finally {
        console.log("Audio file removed from S3 bucket")
    }

};

// REF: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html

exports.saveAudio = async (req, res) => {
    const user_id = req.params?.user_id || null
    const chord = req.body.chord
    result = {}

    if (!req.file) {
        console.log("No file sent.");
        return res.status(400).json({ errors: [{ msg: 'No audio sent with request.' }] })
    }
    console.log(`Saving audio for user ${user_id}: ${JSON.stringify(req.file)}`)
    // Connect to S3
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
        // Save details from S3 to PostsgreSQL audios table
        Audio.create(data)
        result.filename = req.file.filename
        return res.status(200).json(result)
    } catch (err) {
        console.log(`Error uploading to S3 Bucket: ${err}`)
        return res.status(500).json({ errors: [{ msg: 'Failed to updload to S3' }] });
    } finally {
        console.log("Removing: ", req.file.path)
        fs.unlink(req.file.path, (err) => err && console.error(err))
        console.log("Audio file removed from temp directory")
    }

};

exports.predict = async (req, res) => {
    console.log("Predicting chord...")
    result = {}

    const user_id = req.params?.user_id || null
    const filePath = req.file.path;
    // Path to audios loaded will be saved in /uploads
    console.log(`User ${user_id} audio path `, filePath)
    // Create formData, append user audio, renamed from multer.
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
        result.filename = req.file.filename
        console.log("RESULT FROM FLASK API: ", result)
        return res.status(200).json(result)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ errors: [{ msg: 'Error submitted request.' }] });
    } finally {
        // Remove audio file from /uploads
        console.log("Removing: ", req.file.path)
        fs.unlink(req.file.path, (err) => err && console.error(err))
        console.log("Audio file removed from temp directory")
    }
};
exports.deleteUser = async (req, res) => {
    const user_id = req.params?.user_id || null
    const bucket = process.env.AWS_BUCKET
    const dir = `audios/${user_id}`
    if (!user_id) {
        console.log("No user ID sent.");
        return res.status(400).json({ errors: [{ msg: 'No ID sent with request.' }] })
    }
    console.log(`Deleting S3 for user ${user_id}`)
    // Connect to S3
    const s3 = await getS3()

    const listParams = {
        Bucket: bucket,
        Prefix: dir
    };

    try {
        // Get all user audios in folder
        const usersObjects = await s3.listObjectsV2(listParams).promise();

        if (usersObjects.Contents.length === 0) {
            console.log(`User has no audios saved from S3`);
            return res.status(200).json({ redirect: `/api/users/logout/${user_id}` })
        }
        // Create delete paramters, with BUCKET & empty JSON
        const deleteParams = {
            Bucket: bucket,
            Delete: { Objects: [] }
        };
        // Push objects to deleteParams
        usersObjects.Contents.forEach(({ Key }) => {
            deleteParams.Delete.Objects.push({ Key });
        });
        // Delete all objects from S3
        await s3.deleteObjects(deleteParams).promise();

        if (usersObjects.IsTruncated) {
            await emptyS3Directory(bucket, dir);
        }
        console.log(`User deleted from S3`);
        return res.status(200).json({ redirect: `/api/users/logout/${user_id}` })

    } catch (err) {
        console.log(`Error deleting user from S3 Bucket: ${err}`)
        return res.status(500).json({ errors: [{ msg: 'Failed to updload to S3' }] });
    }
};


