//Integration test to ensure user account gets created is directed to login
const User = require('../../models/usersModel');

async function createTestUser() {
    return await User.create({
        first_name: "testUser",
        last_name: "testUser",
        email: "testUser@testUser.com",
        password: "11111111",
        user_dob: "1995/03/12",
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

test('POST /api/users/register - create a new user and redirect to index page', async() => {
    const testUser =   await findTestUser("testUser@testUser.com");
    if (testUser){
        await deleteTestUser(testUser.user_id);
    }
    await createTestUser()
    const response = await request(router).post('/api/users/register').send({
        first_name: 'test',
        last_name: 'User',
        email: 'testUser@testUser.com',
        register_password: '11111111',
        register_password2: '11111111',
        register_dob: '13/03/1995',
        termsCheck: 'on'
    });
    expect(response.statusCode.toBe(200));
    expect(response.headers.location).toBe('/');
});