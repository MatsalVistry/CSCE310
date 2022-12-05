studentID = null;

$(document).ready(function() {

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    populateNavbar();

    studentID = localStorage.getItem("id");

    populateStudentInfo();
});

function clickUpdateButton() {
    document.getElementById("isClicked").style.display = 'block';
}


function populateStudentInfo() {
    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getStudentInformation",
            studentID: studentID
        },
        success: function(response) {
            var student = JSON.parse(response);

            var first_name = student.first_name;
            var last_name = student.last_name;
            var email = student.email;

            var str = "<p>First Name: " + first_name + "</p>";
            str += "<p>Last Name: " + last_name + "</p>";
            str += "<p>Email: " + email + "</p>";

            document.getElementById("studentInfo").innerHTML = str;
        }
    });
}

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
            populateStudentInfo();
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
            populateStudentInfo();
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
            populateStudentInfo();
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
            populateStudentInfo();
            console.log(response);
        }
    });
}