const nodemailer = require('nodemailer');

exports.sendMail = async (req, res) => {

let { message_name, message_email, message_text, message_type  } = req.body

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "chordexplorers@gmail.com",
    pass: "f7d4rbhwkab3"
  }
});

const mailOptions = {
  from: message_email,
  to: "chordexplorers@gmail.com",
  subject: message_type,
  text: message_text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.error('Email error:', error);
  } else {
    console.log('Email sent:', info.response);
    return true;
  }
});
}
