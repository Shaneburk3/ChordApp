document.addEventListener('DOMContentLoaded', function() {

   const update_form = document.getElementById('update_form');
    if(update_form) {
        update_form.addEventListener('submit', async (e) => {
            e.preventDefault();    
            console.log("Using fetch to update user")

            const user_dob = document.getElementById('user_dob').value;
            const user_country = document.getElementById('user_country').value;
            const user_city = document.getElementById('user_city').value;
            const user_bio = document.getElementById('user_bio').value;
            const user_id = document.getElementById('user_id').value;

            const updates = { 
                user_id: user_id,
                user_dob: user_dob,
                user_country: user_country,
                user_city: user_city,
                user_bio: user_bio
            };

            console.log('USER!', user_id, "Updates: ", updates)

            try {
                const response = await fetch(`/api/users/update/${updates.user_id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(updates)
                });
                if (!response.ok) {
                    console.log("No Update received, status:", response.status)
                } else if (response.status === 200){                    
                    console.log("Response: ", response.json())
                    window.location.href = `/api/users/profile/${updates.user_id}`;                  
                }
            } catch (error) {
                console.log(error);
            }
    });
}

});
