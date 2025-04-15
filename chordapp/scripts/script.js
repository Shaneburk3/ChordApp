document.addEventListener('DOMContentLoaded', function() {


const regBtn = document.getElementById("register_btn");
const regField = document.getElementById("register_field");

regBtn.addEventListener('click', async function () {
    if (regField.style.display === "none") {
        regField.style.display = "block"; 
        regBtn.innerHTML = "Hide";
    } else {
        regField.style.display === 'block';
        regField.style.display = "none"; 
        regBtn.innerHTML = "Register";
    }
});

});
