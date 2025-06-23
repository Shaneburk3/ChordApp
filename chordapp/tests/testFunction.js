const User = require('../models/usersModel');
const userController = require('../controllers/userController');

async function createTestUserIfNotExist() {

  try {
    const email = "testUser@testUser.com";
    const userExists = await User.findOne(email);

    if (!userExists) {
      const first_name = "Test"
      const last_name = "User"
      const register_email = "testUser@testUser.com"
      const register_password1 = "F38djdn3Jdu3"
      const register_password2 = "F38djdn3Jdu3"
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

      await userController.registerUser({ body: data});

      if (result) {
        console.log(`User Created.`)
      } else {
        console.log("User not created.")
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
        console.log(`Found user: ${JSON.stringify(user)}`);
        await User.delete(user.user_id);
        console.log(user, "Deleted.");
    } else {
        console.log("Test user account not found.");
    }
}
module.exports = {
    createTestUserIfNotExist, deleteTestUserIfExist
};