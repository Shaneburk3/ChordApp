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

    const [year, month, day] = dob.split('-').map(Number)
    const today = new Date();
    var age = today.getFullYear() - year;

    var age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
        age--;
    }

    return age;
}
module.exports = {
    getDate, getAge
}