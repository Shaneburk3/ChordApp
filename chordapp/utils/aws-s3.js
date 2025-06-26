//AWS bucket connection

const AWS = require("aws-sdk")

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWE_SECRET,
    region: process.env.AWE_REGION
});

// Export the S3 connection to be used elsewhere.
module.exports = s3;

