// Used for working with audio files
const multer = require('multer');
//Give the absolute path to the project
const path = require('path')


const storage = multer.diskStorage({
    // Where to temporarily save the audio
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // Create unique name for audio file
    const user_id = req.params.user_id;
    const timestamp = Date.now();
    const ext = file.originalname.split(".")[1];
    final_name = `${user_id}_${timestamp}.${ext}`
    // file name
    cb(null, final_name);
  },
});

const upload = multer({ storage });

module.exports = upload;