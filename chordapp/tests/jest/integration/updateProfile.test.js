//Integration test to ensure user account gets updated 
test('POST /api/users/update - update a user and redirect to their profile', async() => {
    const response = await request(router).post('/api/users/update/170').send({
        first_name: 'Shane',
        last_name: 'Burk',
        email: 'email@email.com',
        register_password: '11111111',
        register_password1: '11111111',
        dob: '13/03/1995',
        termsCheck: 'on'
    });
    expect(response.statusCode.toBe(302));
    expect(response.headers.location).toBe('/');
});