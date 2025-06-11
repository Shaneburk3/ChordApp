const { getAge } = require('../../../public/scripts/backend/functions');

describe('getAge()', () => {
    test('Returns the users age from their date of birth', async () => {
        const dob = '1994-03-12'
        const userDate = new Date(dob)
        const age = await getAge(dob);
        expect(typeof age).toBe('number');
        expect(age).toBe(31)
    })
})