const User = require('../models/usersModel');
const Audio = require('../models/audiosModel');
const { getS3, emptyS3Directory } = require('../utils/aws-s3');
const bucket = process.env.AWS_BUCKET_NAME;
const Details = require('../models/detailsModel');
const userController = require('../controllers/userController');

async function createTestUserIfNotExist() {

  try {
    const email = "testUser@testUser.com";
    const userExists = await User.findOne(email);

    if (!userExists) {
      const first_name = "Test"
      const last_name = "User"
      const register_email = "testUser@testUser.com"
      const register_password1 = "F38djdn3Jdu$"
      const register_password2 = "F38djdn3Jdu$"
      const register_dob = '1995-03-12'
      const termsCheck = "on"

      const data = {
        first_name,
        last_name,
        register_email,
        register_password1,
        register_password2,
        register_dob,
        termsCheck
      }

      const result = await userController.registerUser({ body: data });

      if (result) {
        console.log(`User Created.`)
        return;
      } else {
        console.log("User not created.")
        return;
      }
    } else {
      console.log("User already exists.")
      return;
    }
  } catch (error) {
    console.log(error)
  }
  return;
}

async function deleteTestUserIfExist() {
  const user_email = "testUser@testUser.com"
  const user = await User.findOne(user_email);
  if (user) {
    user_id = user.user_id;
    console.log(`Found user: ${JSON.stringify(user_id)}`);
    await User.delete(user_id);
    console.log(user, "Deleted.");
    console.log(`Deleting S3 for user ${user_id}`)
    // Connect to S3
    const s3 = await getS3()
    const dir = `users/${user_id}/`;
    // Create list parameters for S3
    const listParams = {
      Bucket: bucket,
      Prefix: dir
    };

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
    // Delete user details and audios from database
    const audiosDeleted = await Audio.deleteUser(user_id)
    if (!audiosDeleted) {
      console.log("No audios associated with user.")
    }
    const detailsDeleted = await Details.delete(user_id)
    if (!detailsDeleted) {
      console.log("No details associated with user.")
    }
    const userDeleted = await User.delete(user_id)
    if (!userDeleted) {
      console.log("User not found from users database.");
      return;
    }
  } else {
    console.log("Test user account not found.");
    return;
  }
  console.log("Test user deleted successfully.");
  return;
}

module.exports = {
  createTestUserIfNotExist, deleteTestUserIfExist
};