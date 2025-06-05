document.addEventListener('DOMContentLoaded', function () {

    const bulk_form = document.getElementById('bulk_form');

    if (bulk_form) {
        let selectedAction = null;
        // <-- create and listener, to selected chosen action -->
        document.querySelectorAll('#bulk_form button[type="submit"]').forEach(button => {
            button.addEventListener('click', function () {
                selectedAction = this.value;
            })
        })
        // #

        bulk_form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const adminErrorDiv = document.getElementById('adminErrorDiv')
            // <-- Must create and array, mapping from the selected user_ids in all checkboxs -->
            const selected_ids = Array.from(document.querySelectorAll('input[name="selected_users[]"]:checked')).map(e => e.value);
            try {
                const response = await fetch(`/api/users/admin/selected_action`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_ids: selected_ids, action: selectedAction })
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
        })
    }

});