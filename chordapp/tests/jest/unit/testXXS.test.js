// Simulate a HTTP request with SuperTest
const supertest = require('supertest');
const app = require('../../../app');
const Func = require('../../testFunction');


beforeAll(async () => {
    await Func.deleteTestUserIfExist();
})
// a pass with be if this test fails - returns res.status(400)

describe('POST /api/users/register', () => {
    test('Test protection against XXS attempt on user register', async () => {
        const res = await supertest(app).post('/api/users/register').send({
            first_name: '<script>XXS-ATTACK</script>',
            last_name: "User",
            register_email: "testUser@testUser.com",
            register_password1: "<script>XXS-ATTACK</script>",
            register_password2: "<script>XXS-ATTACK</script>",
            user_dob: "1995-03-12",
            terms_check: "on"
        });
        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe('First Name: No special characters')
    });
});

// npx jest tests/jest/unit/TestXXS.test.js
