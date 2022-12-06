studentID = null;

$(document).ready(function() {

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    populateNavbar();

    studentID = localStorage.getItem("id");

    populateStudentInfo();
    document.getElementById("isClicked").style.display = 'block';

});

/*
    Displays the student's current profile information
*/
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

            var str = "<h2> Student Profile </h2>";
            str += "<p>First Name: " + first_name + "</p>";
            str += "<p>Last Name: " + last_name + "</p>";
            str += "<p>Email: " + email + "</p>";

            document.getElementById("studentInfo").innerHTML = str;
        }
    });
}

/*
    Chooses the navbar to display based on user type
*/
function populateNavbar() {
    if (userType == "t") {
        $("#navbar").load("../Navbars/TutorNavbar.html");
    } else if (userType == "s") {
        $("#navbar").load("../Navbars/StudentNavbar.html");
    } else if (userType == "a") {
        $("#navbar").load("../Navbars/AdminNavbar.html");
    }
}

/*
    Changes the student's first name
*/
function changeFirstName() {


    var firstname = document.getElementById("firstname").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        async: false,
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

/*
    Changes the student's last name
*/
function changeLastName() {
    var lastname = document.getElementById("lastname").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        async: false,
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

/*
    Changes the student's email
*/
function changeEmail() {
    var email = document.getElementById("email").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        async: false,
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

/*
    Changes the student's password
*/
function changePassword() {
    var password = document.getElementById("password").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        async: false,
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

/*
    Decides which fields were updated and sends the appropriate requests
*/
function saveChanges() 
{
    if(document.getElementById("firstname").value != "")
    {
        changeFirstName();
    }
    if(document.getElementById("lastname").value != "")
    {
        changeLastName();
    }
    if(document.getElementById("email").value != "")
    {
        changeEmail();
    }
    if(document.getElementById("password").value != "")
    {
        changePassword();
    }

    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    refreshReviews();
}