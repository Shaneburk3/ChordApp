// Simulate a HTTP request with SuperTest
const supertest = require('supertest');
const app = require('../../../app');


describe('POST /api/users/register', () => {
    test('Validates an attempt to register with a password', async () => {
        const res = await supertest(app).post('/api/users/register').send({
            first_name: 'Test',
            last_name: "User",
            register_email: "testUser@testUser.com",
            register_password1: "1111",
            register_password2: "1111",
            register_dob: "12-03-1995",
            termsCheck: "on"
        });

        expect(res.statusCode).toBe(400);

    });
});