document.addEventListener('DOMContentLoaded', function() {

const regFormBtn = document.getElementById("reg_form_btn");
const regContainer = document.getElementById("register_container");
const loginContainer = document.getElementById("login_container");
const loginFormBtn = document.getElementById("login_Form_btn");

regFormBtn.addEventListener('click', async function (event) {
    event.preventDefault();
    if (regContainer.style.display === "none") {
        regContainer.style.display = "block"; 
        loginContainer.style.display = "none";
    } else {
        regContainer.style.display = "none";
        loginContainer.style.display = "block";
    }
});

loginFormBtn.addEventListener('click', async function (event) {
    event.preventDefault();
    if (regContainer.style.display === "block") {
        regContainer.style.display = "none"; 
        loginContainer.style.display = "block";
    } else {
        regContainer.style.display = "block";
        loginContainer.style.display = "none";
    }
});


});
