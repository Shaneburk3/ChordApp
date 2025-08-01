// Simulate a HTTP request with SuperTest
const supertest = require('supertest');
const app = require('../../../app');
require('dotenv').config();
const Func = require('../../testFunction');
// Import necessary env modules for testing
const { beforeAll, describe, test, expect } = require('@jest/globals');


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
            register_password1: "F38djdn3Jdu",
            register_password2: "F38djdn3Jdu",
            user_dob: "1995-03-12",
            terms_check: "on"
        });
        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe('Must contain at least 1 special character.');
    });

});

// npx jest tests/jest/unit/testSpecialChar.test.js