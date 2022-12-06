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
    $("#myClasses").html("");
    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getStudentClasses",
            studentID: studentID
        },
        success: function(response) {
            studentClasses = JSON.parse(response);
            var myClasses = document.getElementById("myClasses");
            for (var i = 0; i < studentClasses.length; i++) {
                var cc = studentClasses[i]["current_capacity"];
                var mm = studentClasses[i]["max_capacity"];
                var date = studentClasses[i]["date"];
                var duration = studentClasses[i]["duration"];
                var name = studentClasses[i]["name"];
                var status = studentClasses[i]["status"];
                var tutor_fname = studentClasses[i]["tutor_fname"];
                var tutor_lname = studentClasses[i]["tutor_lname"];
                var tutorID = studentClasses[i]["tutor_id"];
                var classID = studentClasses[i]["class_id"];

                if(status=='C')
                    continue;

                var classesDiv = document.createElement("div");
                classesDiv.className = "class";
                classesDiv.innerHTML += "<div class='cname' style='font-size: 24px; text-shadow: 1px 1px darkgrey;' value=" + name + "> " + name + "</div>";

                classesDiv.innerHTML += 
                    "<p>" +
                    "Tutor: " + tutor_fname + " " + tutor_lname + "<br><br>" +
                    "Date: " + date + "<br><br>" +
                    "Duration: " + duration + " Hours<br><br>" +
                    "Current Capacity: " + cc + "<br><br>" +
                    "Max Capacity: " + mm + "<br><br>" +
                    "Status: Not Started<br></p>"; 

                classesDiv.innerHTML += '<button class="cardButton" onclick="unenroll(this)" value=' +classID + '>Unenroll</button>';

                classesDiv.innerHTML += "<button class='cardButton' onclick=goToTutor("+tutorID+")>Tutor Profile</button>";

                myClasses.appendChild(classesDiv);
            }
        }
    });
}

/*
    Visits the tutors profile
*/
function goToTutor(id){
    window.location.href = "../Tutor/TutorProfile.html?tutorID=" + id;
}

/*
    Unenrolls the student from the specified class
*/
function unenroll(element) {
    console.log(element.value);
    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: {
            functionName: "unenrollFromClass",
            studentID: localStorage.getItem("id"),
            classID: element.value
        },
        success: function(response) {
            console.log(response);
            loadClasses();
        }
    });
}