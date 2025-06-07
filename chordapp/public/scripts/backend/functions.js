function getDate() {

    currentDate = new Date();

    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = currentDate.getFullYear();

    var currentDate = mm + '/' + dd + '/' + yyyy;
    //var currentDate = new Date(dd, mm, yyyy);

    console.log("Got Current Date:", currentDate)
    return currentDate
}
async function getAge(dob) {

    newDob = dob.toISOString().split('T')[0];
    console.log(newDob)
    const [year, month, day] = newDob.split('-').map(Number)
    const today = new Date();
    var age = today.getFullYear() - year;

    var age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
        age--;
    }

    return age;
}
/*
async function toggleStatus() {

    const currentStatus = document.getElementById('user_status').value;

    if (currentStatus === 'ACTIVE') {
        document.getElementById('user_status').value = "SUSPENDED";
    } else if (currentStatus === 'SUSPENDED') {
        document.getElementById('user_status').value = "ACTIVE";
    }

}

async function toggleRole() {

    const currentStatus = document.getElementById('user_role').value;

    if (currentStatus === 'ADMIN') {
        document.getElementById('user_role').value = "BASIC";
    } else if (currentStatus === 'BASIC') {
        document.getElementById('user_role').value = "ADMIN";
    }

}
*/
module.exports = {
    getDate, getAge
};