document.addEventListener('DOMContentLoaded', function () {

    if (localStorage.getItem('registerSuccess') === true) {
        let html = "<ul>";
        formData.res.forEach(e => {
            html += `<li>${e.msg}</li>`
        });
        html += "</ul>"
        messageDiv.innerHTML = html;
        messageDiv.style.display = "block";
        document.body.prepend(html);
        localStorage.removeItem('registerSuccess');
    }


    const update_form = document.getElementById('update_form');
    const login_form = document.getElementById('login_form');
    const register_form = document.getElementById('register_form');
    //const profileLink = document.getElementById('profileLink');
    //const update_btn = document.getElementById('update_btn');


    if (login_form) {
        login_form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Fetch: login user");

            const credentials = {
                login_email: document.getElementById('login_email').value,
                login_password: document.getElementById('login_password').value
            }

            try {
                const response = await fetch(`/api/users/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                });
                if (!response.ok) {
                    const loginErrorDiv = document.getElementById('loginErrorDiv')
                    const errorData = await response.json();
                    //got errors, now map them to the error div
                    let html = "<ul>";
                    errorData.errors.forEach(e => {
                        html += `<li>${e.msg}</li>`
                    });
                    html += "</ul>"
                    loginErrorDiv.innerHTML = html;
                    loginErrorDiv.style.display = "block";
                } else if (response.status === 200) {
                    const data = await response.json();
                    window.location.href = data.redirect;
                }
            } catch (error) {
                loginErrorDiv.textContent = "Error occured.";
                loginErrorDiv.style.display = "block";
                console.log(error);
            }

        });
    }
    if (update_form) {
        update_form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("fetch: update user")

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

            console.log('User:', user_id, "Updates: ", updates)

            try {
                const response = await fetch(`/api/users/update/${user_id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });
                if (!response.ok) {
                    const updateErrorDiv = document.getElementById('updateErrorDiv');
                    const errorData = await response.json();
                    //got errors, now map them to the error div
                    let html = "<ul>";
                    errorData.errors.forEach(e => {
                        html += `<li>${e.msg}</li>`
                    });
                    html += "</ul>"
                    updateErrorDiv.innerHTML = html;
                    updateErrorDiv.style.display = "block";
                    console.log("No Update received, status:", response.status);
                } else if (response.status === 200) {
                    const data = await response.json();
                    updateErrorDiv.style.display == "none";
                    window.location.href = data.redirect;
                }
            } catch (error) {
                console.log(error);
            }
        });
    }
    if (register_form) {
        register_form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("fetch: register user")

            const data = {
                first_name: document.getElementById('first_name').value,
                last_name: document.getElementById('last_name').value,
                register_email: document.getElementById('register_email').value,
                register_password1: document.getElementById('register_password1').value,
                register_password2: document.getElementById('register_password2').value,
                user_dob: document.getElementById('register_dob').value,
                terms_check: document.getElementById('terms_check').checked ? "on" : ""
            };
            console.log("Data", data)
            try {
                const response = await fetch(`/api/users/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) {
                    const regErrorDiv = document.getElementById('regErrorDiv')
                    const errorData = await response.json();
                    //got errors, now map them to the error div
                    let html = "<ul>";
                    errorData.errors.forEach(e => {
                        html += `<li>${e.msg}</li>`
                    });
                    html += "</ul>"
                    regErrorDiv.innerHTML = html;
                    regErrorDiv.style.display = "block";
                } else if (response.status === 200) {
                    localStorage.setItem('registerSucess', true)
                    const data = await response.json();
                    window.location.href = data.redirect;
                }
            } catch (error) { 
                console.log(error);
            }
        });
    }
});
