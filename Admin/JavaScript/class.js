var tutorID;
var userType;

$(document).ready(function() {

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    populateNavbar();

    var urlParams = new URLSearchParams(window.location.search);
    tutorID = urlParams.get('adminID');

    refreshClasses();

    if (userType == "t") {
        document.getElementById("addNewClass").style.display = "block";
    } else {
        document.getElementById("addNewClass").style.display = "none";
    }
});

function populateNavbar() {
    // if (userType == "t") {
    //     $("#navbar").load("../Navbars/TutorNavbar.html");
    // } else if (userType == "s") {
    //     $("#navbar").load("../Navbars/StudentNavbar.html");
    // } else if
    //  (userType == "a") {
    $("#navbar").load("../Navbars/AdminNavbar.html");
    // }
}

function refreshClasses() {
    document.getElementsByClassName("classDisplay")[0].innerHTML = "";
    $.ajax({
        type: "GET",
        url: "../../PHP/Users.php",
        data: {
            functionName: "getTutorClasses",
            tutorID: tutorID
        },
        success: function(response) {

            var classes = JSON.parse(response);
            var display = document.getElementsByClassName("classDisplay")[0];

            for (var i = 0; i < classes.length; i++) {
                var classDiv = document.createElement("div");
                classDiv.innerHTML += "<div class='cid' value=" + classes[i].id + "> ID:" + classes[i].id + "</div><br>";
                classDiv.innerHTML += "<div class='ctutorid' value=" + classes[i].tutor_id + "> Tutor ID:" + classes[i].tutor_id + "</div><br>";
                classDiv.innerHTML += "<div class='cmaxcapacity' value=" + classes[i].max_capacity + "> Max Capacity:" + classes[i].max_capacity + "</div><br>";
                classDiv.innerHTML += "<div class='ccurrentcapacity' value=" + classes[i].current_capacity + "> Current Capacity:" + classes[i].current_capacity + "</div><br>";
                classDiv.innerHTML += "<div class='cname' value=" + classes[i].name + "> Name:" + classes[i].name + "</div><br>";
                classDiv.innerHTML += "<div class='cdate' value=" + classes[i].date + "> Date:" + classes[i].date + "</div><br>";
                classDiv.innerHTML += "<div class='cduration' value=" + classes[i].duration + "> Duration:" + classes[i].duration + "</div><br>";
                classDiv.innerHTML += "<div class='cstatus' value=" + classes[i].status + "> Status:" + classes[i].status + "</div><br>";
                classDiv.innerHTML += '<button class="deleteClass" onclick="deleteClass(this)" value=' + classes[i].id + '>&times;</button>';
                classDiv.innerHTML += '<button class="editClass" onclick="editClass(this)" value=' + classes[i].id + '>Edit</button>';
                classDiv.innerHTML += "<br><br>";

                display.appendChild(classDiv);
            }

        }
    });
}

function deleteClass(element) {
    var classID = element.value;

    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: {
            functionName: "deleteClass",
            classID: classID
        },
        success: function(response) {
            refreshClasses();
        }
    });
}

function editClass(element) {
    // make id editClassModal visible and populate class editMaxCapacity, editName, editDate, editDuration with the values from the class
    var classID = element.value;
    var classDiv = element.parentElement;
    var maxCapacity = classDiv.getElementsByClassName("cmaxcapacity")[0].getAttribute("value");
    var name = classDiv.getElementsByClassName("cname")[0].getAttribute("value");
    var date = classDiv.getElementsByClassName("cdate")[0].getAttribute("value");
    var duration = classDiv.getElementsByClassName("cduration")[0].getAttribute("value");

    document.getElementById("editClassModal").style.display = "block";
    document.getElementById("editMaxCapacity").value = maxCapacity;
    document.getElementById("editName").value = name;
    document.getElementById("editDate").value = date;
    document.getElementById("editDuration").value = duration;
    document.getElementById("editClassModal").value = classID;
}

function addClass() {
    document.getElementById("myModal").style.display = "block";
}

function submitEditClass() {
    var classID = document.getElementById("editClassModal").value;
    var maxCapacity = document.getElementById("editMaxCapacity").value;
    var name = document.getElementById("editName").value;
    var date = document.getElementById("editDate").value;
    var duration = document.getElementById("editDuration").value;

    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: {
            functionName: "editClass",
            classID: classID,
            maxCapacity: maxCapacity,
            name: name,
            date: date,
            duration: duration
        },
        success: function(response) {
            refreshClasses();
            closeClass();
        }
    });

    closeClass();
    refreshClasses();
}

function closeClass() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("maxCapacity").value = "";
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("duration").value = "";

    document.getElementById("editClassModal").style.display = "none";
    document.getElementById("editMaxCapacity").value = "";
    document.getElementById("editName").value = "";
    document.getElementById("editDate").value = "";
    document.getElementById("editDuration").value = "";
}

function submitClass() {
    var maxCapacity = document.getElementById("maxCapacity").value;
    var name = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var duration = document.getElementById("duration").value;
    var tutorID = localStorage.getItem("id");

    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: {
            functionName: "submitClass",
            tutorID: tutorID,
            maxCapacity: maxCapacity,
            currentCapacity: 0,
            name: name,
            date: date,
            duration: duration,
            status: "i"
        },
        success: function(response) {
            refreshClasses();
        }
    });

    document.getElementById("maxCapacity").value = "";
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("duration").value = "";
    closeClass();
}

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        closeClass();
    }
}