$(document).ready(function() {

});

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


function loginPage() {
    window.location.href = '../Login/login.html';
}