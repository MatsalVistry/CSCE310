studentID = null;

$(document).ready(function() {

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    populateNavbar();

    studentID = localStorage.getItem("id");

    loadClasses();

});

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
    Displays the users currently enrolled classes
*/
function loadClasses() {
    document.getElementsByClassName("studentClasses")[0] = "";
    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getStudentClasses",
            studentID: studentID
        },
        success: function(response) {
            studentClasses = JSON.parse(response);
            var myClasses = document.getElementsByClassName("myClasses")[0];
            for (var i = 0; i < studentClasses.length; i++) {
                var cc = studentClasses[i]["current_capacity"];
                var date = studentClasses[i]["date"];
                var duration = studentClasses[i]["duration"];
                var name = studentClasses[i]["name"];
                var status = studentClasses[i]["status"];
                var tutor_fname = studentClasses[i]["tutor_fname"];
                var tutor_lname = studentClasses[i]["tutor_lname"];
                var tutorID = studentClasses[i]["tutor_id"];

                if(status=='C')
                    continue;

                var classesDiv = document.createElement("div");
                classesDiv.className = "class";
                classesDiv.innerHTML += "<p>Class Name: " + name + "<br>" +
                    "Date: " + date + "</br>" +
                    "Duration: " + duration + "</br>" +
                    "Current Capacity: " + cc + "</br>" +
                    "Status: " + status + "</br>" +
                    "Tutor ID: " + tutorID + "</br>" +
                    "Tutor First Name: " + tutor_fname + "</br>" +
                    "Tutor Last Name: " + tutor_lname;
                myClasses.appendChild(classesDiv);
            }
        }
    });
}