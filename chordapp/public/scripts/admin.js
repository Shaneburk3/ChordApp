document.addEventListener('DOMContentLoaded', function () {

    const bulk_form = document.getElementById('bulk_form');
    const updateUser_form = document.getElementById('updateUser_form');
    //const filter_form = document.getElementById('filter_form');

    /*
        if (filter_form) {
    
            filter_form.addEventListener('submit', async (e) => {
                e.preventDefault();
    
                let selected_filter = null;
                // <-- create and listener, to selecte chosen action of all buttons -->
                selected_filter = document.getElementById('event_type').value;
                selected_id = document.getElementById('user_id').value;
                console.log(`Wants to filter user: ${selected_id} by: ${selected_filter}`);
    
                try {
                    const response = await fetch(`/api/users/admin/logs/filter`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ selected_filter: selected_filter, selected_id: selected_id })
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        //got errors, now map them to the error div
                        let html = "<ul>";
                        errorData.errors.forEach(e => {
                            html += `<li>${e.msg}</li>`
                        });
                        html += "</ul>"
                        adminErrorDiv.innerHTML = html;
                        adminErrorDiv.style.display = "block";
                    } else if (response.status === 200) {
                        const logs = await response.json();
                        renderLogs(logs)
                    }
                } catch (error) {
                    console.log(error.message);
                }
            });
    
        }
    */


    if (bulk_form) {

        bulk_form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const adminErrorDiv = document.getElementById('adminErrorDiv');
            // <-- Must create and array, mapping from the selected user_ids in all checkboxs -->
            const selected_action = e.submitter?.value;
            const selected_ids = Array.from(bulk_form.querySelectorAll('input[name="selected_users[]"]:checked')).map(e => e.value);
            console.log('selected_ids')
            let text = `You are about to ${selected_action} users ${selected_ids}\nSelect OK or Cancel.`;

            if (!confirm(text)) {
                window.location.reload();
                return;
            } else {
                try {
                    const response = await fetch(`/api/users/admin/selected_action`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_ids: selected_ids, action: selected_action })
                    });
                    if (!response.ok) {
                        const errorData = await response.json();
                        //got errors, now map them to the error div
                        let html = "<ul>";
                        errorData.errors.forEach(e => {
                            html += `<li>${e.msg}</li>`
                        });
                        html += "</ul>"
                        adminErrorDiv.innerHTML = html;
                        adminErrorDiv.style.display = "block";
                    } else if (response.status === 200) {
                        const data = await response.json();
                        window.location.href = data.redirect;
                    }
                } catch (error) {
                    adminErrorDiv.textContent = "Error occured."
                    adminErrorDiv.style.display = "block";
                    console.log(error.message);
                }
            }
        });
    }

    if (updateUser_form) {
        updateUser_form.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {

                const user_country = document.getElementById('user_country').value;
                const user_city = document.getElementById('user_city').value;
                const user_email = document.getElementById('user_email').value;
                const user_role = document.getElementById('user_role').value;
                const user_status = document.getElementById('user_status').value;
                const user_bio = document.getElementById('user_bio').value;
                const user_id = document.getElementById('user_id').value;

                const updates = {
                    user_id: user_id,
                    user_country: user_country,
                    user_city: user_city,
                    user_bio: user_bio,
                    user_email: user_email,
                    user_role: user_role,
                    user_status: user_status
                };
                const response = await fetch(`/api/users/admin/update/${user_id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    //got errors, now map them to the error div
                    let html = "<ul>";
                    errorData.errors.forEach(e => {
                        html += `<li>${e.msg}</li>`
                    });
                    html += "</ul>"
                    adminErrorDiv.innerHTML = html;
                    adminErrorDiv.style.display = "block";
                } else if (response.status === 200) {
                    const data = await response.json();
                    window.location.href = data.redirect;
                }
            } catch (error) {
                console.log(error);
            }
        })
    }


});