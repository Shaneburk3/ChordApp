function getDate(){
    
    currentDate = new Date();

    var dd = String(currentDate.getDate()).padStart(2, '0');
    var mm = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = currentDate.getFullYear();

    var currentDate = mm + '/' + dd + '/' + yyyy;
    //var currentDate = new Date(dd, mm, yyyy);

    console.log("Got Current Date:", currentDate)
    return currentDate
}

module.exports = {
    getDate
}