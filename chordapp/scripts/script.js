document.addEventListener('DOMContentLoaded', async function() {

    document.getElementById('update_user_form').addEventListener('submit', async (e) => {

        e.preventDefault();

        const user_age = document.getElementById('user_age').value;
        const user_country = document.getElementById('user_country').value;
        const user_city = document.getElementById('user_city').value;
        const user_bio = document.getElementById('user_bio').value;

        const updates = { 
            users_age: user_age,
            users_country: user_country,
            users_city: user_city,
            users_bio: user_bio
        };

        try {
            const response = await fetch('/update', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updates)
            });
            const result = await response.json();
            if(!response) {
                console.log("No Update received")
            } else {
                console.log("Profile updated.")
            }
        } catch (error) {
            console.log(error);
        }

    });
/*
    document.getElementById('update_btn').addEventListener('submit', async (e) => {

        const user_age = document.getElementById('user_age').value;
        const user_country = document.getElementById('user_country').value;
        const user_city = document.getElementById('user_city').value;
        const user_bio = document.getElementById('user_bio').value;

        console.log("Got updates.")

        const response = await fetch('/update', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user_age, user_country, user_city, user_bio})
        });

        const result = await response.json();
        console.log("RESULT: ", result);

    }));
*/

});
