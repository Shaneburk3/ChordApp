// Simulate a HTTP request with SuperTest
const supertest = require('supertest');
const app = require('../../../app');
const Func = require('../../testFunction');


beforeAll(async () => {
    await Func.deleteTestUserIfExist();
})
// a pass with be if this test fails - returns res.status(400)

describe('POST /api/users/register', () => {
    test('Test protect register email against SQL injection on user login', async () => {
        const res = await supertest(app).post('/api/users/register').send({
            first_name: 'Test',
            last_name: "User",
            register_email: "' OR 1=1; --",
            register_password1: "F38djdn3Jdu$",
            register_password2: "F38djdn3Jdu$",
            user_dob: "1995-03-12",
            terms_check: "on"
        });
        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe('Must be an email.');
    });
    test('Test protect login email against SQL injection on user login', async () => {
        const res = await supertest(app).post('/api/users/login').send({
            login_email: "' OR 1=1; --",
            login_password1: "F38djdn3Jdu$",
        });
        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe('Email is required.');
    });
});


// npx jest tests/jest/unit/TestSQLInject.test.js