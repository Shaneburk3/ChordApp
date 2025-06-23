// Simulate a HTTP request with SuperTest
const supertest = require('supertest');
const app = require('../../../app');
const Func = require('../../testFunction');


beforeAll(async () => {
    await Func.deleteTestUserIfExist();
})
// a pass with be if this test fails - returns res.status(400)

describe('POST /api/users/register', () => {
    test('Validates an attempt to register with a password', async () => {
        const res = await supertest(app).post('/api/users/register').send({
            first_name: 'Test',
            last_name: "User",
            register_email: "testUser@testUser.com",
            register_password1: "1111111$",
            register_password2: "1111111$",
            user_dob: "1995-03-12",
            terms_check: "on"
        });
        expect(res.status).toBe(200);
    });
});

