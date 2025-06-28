//AWS bucket connection

const AWS = require("aws-sdk")
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const secret_name = "chordexplorer/s3/credentials";
const region = process.env.AWS_REGION || "eu-north-1"
let s3 = null;

AWS.config.update({
  region: region,
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey',
  endpoint: new AWS.Endpoint('http://localhost:8000'),
});

const getS3 = async () => {
    // if an s3 instance already exists, return s3
    if (s3) return s3;
    try {

        const secretsClient = new SecretsManagerClient({ region: region });
        const command = new GetSecretValueCommand({ SecretId: secret_name })

        const response = await secretsClient.send(command);
        const secrets = JSON.parse(response.SecretString);
        const { aws_key, aws_secret } = secrets;

        console.log("SECRETS:", secrets);


        s3 = new AWS.S3({
            accessKeyId: aws_key,
            secretAccessKey: aws_secret,
            region: region
        });
        return s3;
    } catch (err) {
        console.log("Error getting S3 instance: ", err)
        throw err;
    }
}
// Export the S3 connection to be used elsewhere.
module.exports = getS3;

