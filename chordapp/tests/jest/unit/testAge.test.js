const { getAge } = require('../../../public/scripts/backend/functions');

describe('getAge()', () => {
    test('Returns the users age from their date of birth', async () => {
        const dob = '12/03/1995-03-12T00:00:00.000Z';
        const age = await getAge(dob);
        expect(typeof age).toBe('number');
        expect(age).toBe(30)
    })
})