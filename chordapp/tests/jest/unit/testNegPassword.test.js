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
            first_name: 'test£',
            last_name: "test£",
            register_email: "test@t.c",
            register_password1: "111",
            register_password2: "111",
            user_dob: "1995-03-12",
            terms_check: "off"
        });
        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe('First Name: No special characters.');
        expect(res.body.errors[1].msg).toBe('Last Name: No special characters.');
        expect(res.body.errors[2].msg).toBe('Must be an email.');
        expect(res.body.errors[3].msg).toBe('Password is not long enough.');
        expect(res.body.errors[4].msg).toBe('Must contain at least 1 special character.');
        expect(res.body.errors[5].msg).toBe('Please agree to T&Cs.');

    });

});

// npx jest tests/jest/unit/testNegPassword.test.js