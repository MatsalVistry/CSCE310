var tutorID;
var userType;

$(document).ready(function() {

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    populateNavbar();

    var urlParams = new URLSearchParams(window.location.search);
    tutorID = urlParams.get('tutorID');

    refreshClasses();
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

function refreshClasses() {
    document.getElementsByClassName("classDisplay")[0].innerHTML = "";
    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getTutorClasses",
            tutorID: tutorID
        },
        success: function(response) {

            var classes = JSON.parse(response);
            var display = document.getElementsByClassName("classDisplay")[0];

            for (var i = 0; i < classes.length; i++) {
                if (classes[i].status != 'C')
                    continue;

                var classDiv = document.createElement("div");
                classDiv.classList.add("box")
                classDiv.innerHTML += "<div class='cid' value=" + classes[i].id + "> ID:" + classes[i].id + "</div><br>";
                classDiv.innerHTML += "<div class='ctutorid' value=" + classes[i].tutor_id + "> Tutor ID:" + classes[i].tutor_id + "</div><br>";
                classDiv.innerHTML += "<div class='cmaxcapacity' value=" + classes[i].max_capacity + "> Max Capacity:" + classes[i].max_capacity + "</div><br>";
                classDiv.innerHTML += "<div class='ccurrentcapacity' value=" + classes[i].current_capacity + "> Current Capacity:" + classes[i].current_capacity + "</div><br>";
                classDiv.innerHTML += "<div class='cname' value=" + classes[i].name + "> Name:" + classes[i].name + "</div><br>";
                classDiv.innerHTML += "<div class='cdate' value=" + classes[i].date + "> Date:" + classes[i].date + "</div><br>";
                classDiv.innerHTML += "<div class='cduration' value=" + classes[i].duration + "> Duration:" + classes[i].duration + "</div><br>";
                classDiv.innerHTML += "<div class='cstatus' value=" + classes[i].status + "> Status:" + classes[i].status + "</div><br>";
                classDiv.innerHTML += "<br><br>";

                display.appendChild(classDiv);
            }

        }
    });
}