$(document).ready(function () 
{

    userType = localStorage.getItem("userType");
    if(userType == null)
    {
        window.location.href = "../Login/Login.html";
    }

    populateNavbar();

    var urlParams = new URLSearchParams(window.location.search);
    studentID = urlParams.get('studentID');

    loadClasses();

});

function populateNavbar()
{
    if(userType == "t")
    {
        $("#navbar").load("../Navbars/TutorNavbar.html");
    }
    else if(userType == "s")
    {
        $("#navbar").load("../Navbars/StudentNavbar.html");
    }
    else if(userType == "a")
    {
        $("#navbar").load("../Navbars/AdminNavbar.html");
    }
}

function loadClasses()
{
    document.getElementsByClassName("studentClasses")[0] = "";
    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: 
        {
            functionName: "getStudentClasses",
            studentID: studentID
        },
        success: function(response) 
        {
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

                var classesDiv = document.createElement("div");
                classesDiv.className = "class";
                classesDiv.innerHTML += "<p>Class Name: " + name + "<br>" + 
                                        "Date: " + date+ "</br>" + 
                                        "Duration: " + duration+ "</br>" +
                                        "Current Capacity: " + cc+ "</br>" +
                                        "Status: " + status+ "</br>" +
                                        "Tutor First Name: " + tutor_fname+ "</br>" +
                                        "Tutor Last Name: " + tutor_lname+ "</br>";
                myClasses.appendChild(classesDiv);
            }
        }
    });
}
