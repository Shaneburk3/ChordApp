const { loginUser } = require('../../../controllers/userController');
const User = require('../../../models/usersModel');
//Integration test to ensure user account gets created is directed to login

async function createTestUser() {
    return await User.create({
        first_name: "testUser",
        last_name: "testUser",
        email: "testUser@testUser.com",
        register_password: "11111111",
        register_password1: "11111111",
        dob: "12/03/1995",
        termsChecK: "on"
    })
};
async function findTestUser(){
    return User.findOne("testUser@testUser.com")
}

async function deleteTestUser() {
    return await User.delete(testUser_ID)
    
}
let user_email = "testUser@testUser.com"
let testUser = await findTestUser(user_email);
let testUser_ID = await testUser.user_id;
let userDeleted = await deleteTestUser(testUser_ID);
if (userDeleted) {
    
}

test('POST /api/users/login - login a user and redirect to index page', async() => {
    const response = await request(router).post('/api/users/login').send({
        email: 'email@email.com',
        register_password: '11111111',
    });
    expect(response.statusCode.toBe(200));
    expect(response.headers.location).toBe('/profile');
});