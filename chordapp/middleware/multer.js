// Used for working with audio files
const multer = require('multer');
//Give the absolute path to the project
const path = require('path')


const storage = multer.diskStorage({
  destination(req, file, cb) {
    // directory of saved audios
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const fileNameArr = file.originalname.split(".");
    // file name
    cb(null, `user-audio.${fileNameArr[fileNameArr.length - 1]}`);
  },
});

const upload = multer({ storage });

module.exports = upload;