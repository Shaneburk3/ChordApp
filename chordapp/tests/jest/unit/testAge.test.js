const { getAge } = require('../../../public/scripts/backend/functions');

describe('getAge()', () => {
    test('Returns the users age from their date of birth', async () => {
        const dob = '1995-03-12'
        const userDate = new Date(dob)
        const age = await getAge(dob);
        console.log(`Result:${age}`)
        expect(typeof age).toBe('number');
        expect(age).toBe(30)
    });
});