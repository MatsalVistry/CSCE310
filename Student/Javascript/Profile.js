studentID = null;

$(document).ready(function() {

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    populateNavbar();

    studentID = localStorage.getItem("id");

});

function populateNavbar() {
    if (userType == "t") {
        $("#navbar").load("../Navbars/TutorNavbar.html");
    } else if (userType == "s") {
        $("#navbar").load("../Navbars/StudentNavbar.html");
    } else if (userType == "a") {
        $("#navbar").load("../Navbars/AdminNavbar.html");
    }
}

function changeFirstName() {
    var firstname = document.getElementById("firstname").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "changeFirstName",
            studentID: localStorage.getItem("id"),
            first_name: firstname,
        },
        success: function(response) {
            console.log(response);
        }
    });
}

function changeLastName() {
    var lastname = document.getElementById("lastname").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "changeLastName",
            studentID: localStorage.getItem("id"),
            last_name: lastname,
        },
        success: function(response) {
            console.log(response);
        }
    });
}

function changeEmail() {
    var email = document.getElementById("email").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "changeEmail",
            studentID: localStorage.getItem("id"),
            email: email,
        },
        success: function(response) {
            console.log(response);
        }
    });
}

function changePassword() {
    var password = document.getElementById("password").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "changePassword",
            studentID: localStorage.getItem("id"),
            password: password
        },
        success: function(response) {
            console.log(response);
        }
    });
}