// Simulate a HTTP request with SuperTest
const supertest = require('supertest');
const app = require('../../../app');
// a pass with be if this test fails - returns res.status(400)

describe('POST /api/users/register', () => {
    test('Validates an attempt to register with a password', async () => {
        const res = await supertest(app).post('/api/users/register').send({
            first_name: 'Test',
            last_name: "User",
            register_email: "testUser@testUser.com",
            register_password1: "11111111$",
            register_password2: "11111111$",
            user_dob: "12-03-1995",
            terms_check: "on"
        });
        expect(res.status).toBe(400);
    });
});