$(document).ready(function () 
{

});

function submitRegistration()
{
    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: 
        {
            functionName: "enrollInClass",
            fname: $("#fname").val(),
            lname: $("#lname").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            role: $("#role").val()
        },
        success: function(response) 
        {
            loginPage();
        }
    });
}


function loginPage()
{
    window.location.href='../Login/login.html';
}