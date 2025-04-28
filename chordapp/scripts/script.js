document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('update_btn').addEventListener('submit', async (e) => {

        const user_age = document.getElementById('user_age').value;
        const user_country = document.getElementById('user_country').value;
        const user_city = document.getElementById('user_city').value;
        const user_bio = document.getElementById('user_bio').value;

        const response = await fetch('/update', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            bosy: JSON.stringify({user_age, user_country, user_city, user_bio})
        });

        const result = await response.json();
        console.log("RESULT: ", result);

    });


});
