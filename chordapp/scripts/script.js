document.addEventListener('DOMContentLoaded', async function() {

    document.getElementById('update_form').addEventListener('submit', async (e) => {

        e.preventDefault();

        const user_age = document.getElementById('user_dob').value;
        const user_country = document.getElementById('user_country').value;
        const user_city = document.getElementById('user_city').value;
        const user_bio = document.getElementById('user_bio').value;
        const user_id = document.getElementById('user_id').value;

        const updates = { 
            user_id: user_id,
            user_age: user_age,
            user_country: user_country,
            user_city: user_city,
            user_bio: user_bio
        };

        console.log('USER!', user_id)

        try {
            const response = await fetch(`/users/${user_id}`, {
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
