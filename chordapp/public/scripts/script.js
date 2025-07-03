document.addEventListener('DOMContentLoaded', function () {
    /*
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
    */


    const update_form = document.getElementById('update_form');
    const login_form = document.getElementById('login_form');
    const register_form = document.getElementById('register_form');
    const predict_form = document.getElementById('predict_form');
    const result_section = document.getElementById('result_section');
    const save_btn = document.getElementById('save_btn');
    const save_form = document.getElementById('save_form');
    const predicted_chord = document.getElementById('predicted_chord');
    const delete_audio_form = document.getElementById('delete_audio_form');
    const delete_user_btn = document.getElementById('delete_user_btn');



    if (delete_audio_form) {
        delete_audio_form.addEventListener('submit', async (e) => {
            e.preventDefault();

            try {
                const user_id = document.getElementById('user_id').value;
                const audio_url = document.getElementById('audio_url').value;
                const audio_id = document.getElementById('audio_id').value;
                const file_name = document.getElementById('file_name').value;
                data = { user_id, audio_url, audio_id, file_name }
                const response = await fetch(`/api/audios/delete/${audio_id}/user/${user_id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    //got errors, now map them to the error div
                    let html = "<h5>";
                    errorData.errors.forEach(e => {
                        html += `${e.msg}`
                    });
                    html += "</h5>"
                    audioErrorDiv.innerHTML = html;
                    audioErrorDiv.style.display = "block";
                } else if (response.status === 200) {
                    // Success deletion
                    const data = await response.json();
                    audioErrorDiv.style.display == "none";
                    window.location.href = data.redirect;
                }
            } catch (error) {
                audioErrorDiv.textContent = "Error while deleting audio.";
                audioErrorDiv.style.display = "block";
                console.log(error);
            }

        })
    }


    if (predict_form) {
        predict_form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Sending audio server...')
            const formData = new FormData(predict_form);
            console.log(formData)

            if (!document.getElementById('user_id')) {
                console.log("User is not signed in...")
            } else {
                try {
                    const user_id = document.getElementById('user_id').value;

                    const response = await fetch(`/api/audios/predict/${user_id}`, {
                        method: 'POST',
                        body: formData
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        //got errors, now map them to the error div
                        let html = "<h5>";
                        errorData.errors.forEach(e => {
                            html += `${e.msg}`
                        });
                        html += "</h5>"
                        result_div.innerHTML = html;
                        result_div.style.display = "block";
                    } else if (response.status === 200) {
                        const result = await response.json();
                        const result_div = document.getElementById('result_div')

                        let html = "<h3>";
                        html += `Classification: ${result.prediction.Chord}`
                        html += "</h3>"
                        html += "<h5>";
                        html += `User: ${result.user_id}`
                        html += "</h5>"
                        html += "<h5 id='audio_filename'>";
                        html += `File Name: ${result.filename}`
                        html += "</h5>"
                        result_div.innerHTML = html;
                        result_div.style.display = "block";
                        save_btn.style.display = "block";
                        predicted_chord.value = result.prediction.Chord;
                        //window.location.href = data.redirect;
                    }
                } catch (error) {
                    result_section.textContent = "Error while predicting chord.";
                    result_section.style.display = "block";
                    console.log(error);
                }
            }
        })
    }

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
                    let html = "<h3>";
                    html += `File saved in profile: ${result.filename}`
                    html += "</h3>"
                    result_div.innerHTML = html;
                    result_div.style.display = "block";
                }
            } catch (error) {
                console.log(error);
            }
        });
    }
    if (save_form) {
        save_form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Saving user prediction...")
            // Get user audio file, so they can save it if desired.

            const user_id = document.getElementById('user_id').value;
            let AudioInput = document.getElementById('audio_blob_input');
            let chord = predicted_chord.value;
            if (!AudioInput || !AudioInput.files.length) {
                saveErrorDiv.innerText = "No audio file saved."
                return;
            }

            const formData = new FormData();
            formData.append('audio', AudioInput.files[0]);
            formData.append('chord', chord);

            console.log('Sending to backend:', formData)

            try {
                const response = await fetch(`/api/audios/predict/${user_id}/save`, {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    const saveErrorDiv = document.getElementById('saveErrorDiv');
                    const errorData = await response.json();
                    //got errors, now map them to the error div
                    let html = "<ul>";
                    errorData.errors.forEach(e => {
                        html += `<li>${e.msg}</li>`
                    });
                    html += "</ul>"
                    saveErrorDiv.innerHTML = html;
                    saveErrorDiv.style.display = "block";
                    console.log("No Update received, status:", response.status);
                } else if (response.status === 200) {
                    const result_div = document.getElementById('result_div')
                    const data = await response.json();
                    let html = "<h3>";
                    html += `File saved in profile:`
                    html += "</h3>"
                    html += "<h5 id='audio_filename'>";
                    html += `${data.filename}`
                    html += "</h5>"
                    result_div.innerHTML = html;
                    result_div.style.display = "block";
                    save_btn.style.display = "none";

                }
            } catch (error) {
                console.log(error);
            }

        });
    }
    if (delete_user_btn) {
        delete_user_btn.addEventListener('click', async (e) => {
            e.preventDefault();

            let text = `You are about to delete this account. All data will be lost after doing so.\nSelect OK or Cancel.`;
            // Confirm admin wishes to continue with seletion
            if (!confirm(text)) {
                window.location.reload();
                return;
            }

            try {
                const user_id = document.getElementById('user_id').value;
                const response = await fetch(`/api/users/delete/${user_id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_id })
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    //got errors, now map them to the error div
                    let html = "<h5>";
                    errorData.errors.forEach(e => {
                        html += `${e.msg}`
                    });
                    html += "</h5>"
                    updateErrorDiv.innerHTML = html;
                    updateErrorDiv.style.display = "block";
                } else if (response.status === 200) {
                    // Success deletion
                    const data = await response.json();
                    updateErrorDiv.style.display = "none";
                    window.location.href = data.redirect;
                }
            } catch (error) {
                updateErrorDiv.textContent = "Error while deleting user.";
                updateErrorDiv.style.display = "block";
                console.log(error);
            }

        })
    }
});
