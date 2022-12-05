/*
    Registers the user and sends them to the login page
*/
function submitRegistration() {
    var isTutor = document.getElementById('role').checked;

    var r = isTutor ? "t" : "s";


    $.ajax({
        type: "POST",
        url: "../PHP/Registration.php",
        data: {
            functionName: "register",
            fname: $("#fname").val(),
            lname: $("#lname").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            role: r
        },
        success: function(response) {
            loginPage();
        }
    });

}

/*
    Performs the page switch to the login page
*/
function loginPage() {
    window.location.href = '../Login/login.html';
}