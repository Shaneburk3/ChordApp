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