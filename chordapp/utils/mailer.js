const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chordexplorers@gmail.com',
      pass: 'Mrne-9#UFECy5nP'
    }
  });
  
  var mailOptions = {
    from: 'chordexplorers@gmail.com',
    to: 'shane18280@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  