var userType;
var tutorID = null;

$(document).ready(function() {

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    var urlParams = new URLSearchParams(window.location.search);
    tutorID = urlParams.get('tutorID');

    if(tutorID!=null)
    {
        $("#heading").text("Tutor Classes");
    }
    else
    {
        $("#heading").text("All Classes");
    }

    populateNavbar();
    populateClasses();
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
    Displays all open classes to enroll into
*/
function populateClasses() {
    document.getElementsByClassName("allClasses")[0].innerHTML = "";
    $.ajax({
        type: "GET",
        url: "../PHP/Classes.php",
        data: {
            functionName: "getAllClasses",
        },
        success: function(response) {
            // console.log(response);
            var classes = JSON.parse(response);
            console.log(classes);
            var display = document.getElementsByClassName("allClasses")[0];

            $.ajax({
                type: "GET",
                url: "../PHP/Classes.php",
                data: {
                    functionName: "getCurrentStudentClasses",
                    studentID: localStorage.getItem("id")
                },
                success: function(r2) {
                    var currentClasses = JSON.parse(r2);
                    console.log(currentClasses);

                    for (var i = 0; i < classes.length; i++) {
                        if(classes[i].status=='C')
                            continue;

                        if(tutorID!=null && classes[i].tutor_id!=tutorID)
                            continue;
                            
                        var classDiv = document.createElement("div");
                        classDiv.classList.add("box");
                        classDiv.innerHTML += "<div class='cname' style='font-size: 24px; text-shadow: 1px 1px darkgrey;' value=" + classes[i].name + "> " + classes[i].name + "</div><br>";

                        classDiv.innerHTML += "<div class='ctutorname' value=" + classes[i].tutor_name + "> Tutor Name: " + classes[i].tutor_name + "</div><br>";
                        classDiv.innerHTML += "<div class='cmaxcapacity' value=" + classes[i].max_capacity + "> Max Capacity: " + classes[i].max_capacity + "</div><br>";
                        classDiv.innerHTML += "<div class='ccurrentcapacity' value=" + classes[i].current_capacity + "> Current Capacity: " + classes[i].current_capacity + "</div><br>";
                        classDiv.innerHTML += "<div class='cname' value=" + classes[i].name + "> Name: " + classes[i].name + "</div><br>";
                        classDiv.innerHTML += "<div class='cdate' value=" + classes[i].date + "> Date: " + classes[i].date + "</div><br>";
                        classDiv.innerHTML += "<div class='cduration' value=" + classes[i].duration + "> Duration: " + classes[i].duration + " Hours</div><br>";
                        classDiv.innerHTML += "<div class='cstatus' value=" + classes[i].status + "> Status: Not Started </div><br>";

                        if (!currentClasses.includes(classes[i].id) && parseInt(classes[i].current_capacity) < parseInt(classes[i].max_capacity)) {
                            classDiv.innerHTML += '<button class="enroll" onclick="enroll(this)" value=' + classes[i].id + '>Enroll</button>';
                        }

                        if (currentClasses.includes(classes[i].id)) {
                            classDiv.innerHTML += '<button class="cardButton" onclick="unenroll(this)" value=' + classes[i].id + '>Unenroll</button>';
                        }
                        
                        classDiv.innerHTML += "<button class='cardButton' onclick=goToTutor("+classes[i].tutor_id+")>Tutor Profile</button>";
                        classDiv.innerHTML += "<br><br>";

                        display.appendChild(classDiv);
                    }
                }
            });
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
    Enrolls the student in the specified class
*/
function enroll(element) {
    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: {
            functionName: "enrollInClass",
            studentID: localStorage.getItem("id"),
            classID: element.value
        },
        success: function(response) {
            populateClasses();
        }
    });
}

/*
    Unenrolls the student from the specified class
*/
function unenroll(element) {
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
            populateClasses();
        }
    });
}