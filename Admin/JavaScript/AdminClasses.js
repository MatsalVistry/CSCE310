var tutorID;
var userType;

$(document).ready(function() {

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    populateNavbar();
    refreshClasses();
    populateTutorIDs();
    populateClassIDs();
    populateStudentIDs();
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
    Displays all of the classes that currently exist
*/
function refreshClasses() {
    $("#classDisplay").html("");
    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getAllClasses",
            tutorID: tutorID
        },
        success: function(response) {

            var classes = JSON.parse(response);
            var display = document.getElementsByClassName("classDisplay")[0];
            console.log(classes);

            for (var i = 0; i < classes.length; i++) {

                var classDiv = document.createElement("div");
                classDiv.classList.add('box')
                // classDiv.outerHTML += "<div style='position: absolute; left: 0px; width: 300px; border: 3px solid #73AD21; padding: 10px;'>";
                classDiv.innerHTML += "<div class='cname' style='font-size: 24px; text-shadow: 1px 1px darkgrey;' value=" + classes[i].name + "> " + classes[i].name + "</div><br>";

                classDiv.innerHTML += "<div class='cid' value=" + classes[i].id + "> ID: " + classes[i].id + "</div><br>";
                classDiv.innerHTML += "<div class='ctutorid' value=" + classes[i].tutor_id + "> Tutor ID: " + classes[i].tutor_id + "</div><br>";
                classDiv.innerHTML += "<div class='ctname' value=" + classes[i].tname + "> Tutor Name:" + classes[i].tname + "</div><br>";
                classDiv.innerHTML += "<div class='cmaxcapacity' value=" + classes[i].max_capacity + "> Max Capacity: " + classes[i].max_capacity + "</div><br>";
                classDiv.innerHTML += "<div class='ccurrentcapacity' value=" + classes[i].current_capacity + "> Current Capacity: " + classes[i].current_capacity + "</div><br>";
                classDiv.innerHTML += "<div class='cdate' value=" + classes[i].date + "> Date: " + classes[i].date + "</div><br>";
                classDiv.innerHTML += "<div class='cduration' value=" + classes[i].duration + "> Duration: " + classes[i].duration + " Hours</div><br>";
                classDiv.innerHTML += "<div class='cstatus' value=" + classes[i].status + "> Status: " + classes[i].status + "</div>";
                classDiv.innerHTML += '<button class="editClass" onclick="editClass(this)" value=' + classes[i].id + '>Edit</button>';

                if(classes[i].status != 'C')
                    classDiv.innerHTML += '<button class="finishClass" onclick="finishClass(this)" value=' + classes[i].id + '>End Session</button>';

                classDiv.innerHTML += '<button class="deleteClass" onclick="deleteClass(this)" value=' + classes[i].id + '>Delete</button>';

                display.appendChild(classDiv);
            }

        }
    });
}

/*
    allows inputs of all characters and the use of the backspace and regular space and numbers
*/
function FilterInputName(event) {
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    isAlphabeticOrChars = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
    modifiers = (event.altKey || event.ctrlKey || event.shiftKey || event.spaceKey);
    return !isAlphabeticOrChars || modifiers;
}

/*
    allows inputs of all numbers and the use of the backspace 
*/
function FilterInputNums(event) {
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    isNumeric = !((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105));
    modifiers = (keyCode == 8);
    return !isNumeric || modifiers;
}

/*
    allows inputs of all numbers, the . character, and the use of the backspace  
*/
function FilterInputTime(event) {
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    isTime = !((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105));
    modifiers = (keyCode == 8 || keyCode == 190);
    return !isTime || modifiers;
}

/*
    Deletes a class from the database
*/
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

/*
    Edits a class information and prepopulates the input fields
*/
function editClass(element) {
    // make id editClassModal visible and populate class editMaxCapacity, editName, editDate, editDuration with the values from the class
    var classID = element.value;
    var classDiv = element.parentElement;
    var maxCapacity = classDiv.getElementsByClassName("cmaxcapacity")[0].getAttribute("value");
    var name = classDiv.getElementsByClassName("cname")[0].getAttribute("value");
    var date = classDiv.getElementsByClassName("cdate")[0].getAttribute("value");
    var duration = classDiv.getElementsByClassName("cduration")[0].getAttribute("value");
    var tutorID = classDiv.getElementsByClassName("ctutorid")[0].getAttribute("value");

    var errorMsgs = "";
    if ((name) == "" || name == "Name") {
        errorMsgs += "Input required for name\n";
    }
    if ((maxCapacity) == "" || maxCapacity == "Max Capacity") {
        errorMsgs += "Input required for max capacity\n";
    }

    if ((duration) == "" || duration == "Duration") {
        errorMsgs += "Input required for duration\n";
    }
    if ((date) == "") {
        errorMsgs += "Input required for date\n";
    }
    if (errorMsgs != "") {
        alert(errorMsgs);
        errorMsgs = "";
        return;
    }
    document.getElementById("editClassModal").style.display = "block";
    document.getElementById("editMaxCapacity").value = maxCapacity;
    document.getElementById("editName").value = name;
    document.getElementById("editDate").value = date;
    document.getElementById("editDuration").value = duration;
    document.getElementById("editClassModal").value = classID;
    document.getElementById("tutorIDEdit").value = tutorID;
}

/*
    Displays the modal for adding a class
*/
function addClass() {
    document.getElementById("myModal").style.display = "block";
}

/*
    Edits class information in the database
*/
function submitEditClass() {
    var classID = document.getElementById("editClassModal").value;
    var maxCapacity = document.getElementById("editMaxCapacity").value;
    var name = document.getElementById("editName").value;
    var date = document.getElementById("editDate").value;
    var duration = document.getElementById("editDuration").value;
    var tutorID = document.getElementById("tutorIDEdit").value;

    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: {
            functionName: "editClassAdmin",
            classID: classID,
            maxCapacity: maxCapacity,
            name: name,
            date: date,
            duration: duration,
            tutorID: tutorID
        },
        success: function(response) {
            refreshClasses();
            closeClass();
        }
    });
}

/*
    Closes all the modals and resets their fields
*/
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

/*
    Adds a class based on inputted fields
*/
function submitClass() {
    var maxCapacity = document.getElementById("maxCapacity").value;
    var name = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var duration = document.getElementById("duration").value;
    var tutorID = document.getElementById("tutorID").value;
    var errorMsgs = "";

    if ((name) == "" || name == "Name") {
        errorMsgs += "Input required for name\n";
    }
    if ((maxCapacity) == "" || maxCapacity == "Max Capacity") {
        errorMsgs += "Input required for max capacity\n";
    }

    if ((duration) == "" || duration == "Duration") {
        errorMsgs += "Input required for duration\n";
    }
    if ((date) == "") {
        errorMsgs += "Input required for date\n";
    }
    if (errorMsgs != "") {
        alert(errorMsgs);
        errorMsgs = "";
        return;
    }

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
            status: "N"
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

/*
    Ends the class session for the specified element
*/
function finishClass(element) {
    var classID = element.value;

    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: {
            functionName: "finishClass",
            classID: classID
        },
        success: function(response) {
            refreshClasses();
        }
    });
}

/*
    Populates all the dropdowns for tutorIDs on the screen
*/
function populateTutorIDs()
{
    document.getElementById("tutorID").innerHTML = "";
    document.getElementById("tutorIDEdit").innerHTML = "";

    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getTutorIDs"
        },
        success: function(response) {
            console.log(response);
            var tutorIDs = JSON.parse(response);
            var select = document.getElementById("tutorID");
            var select2 = document.getElementById("tutorIDEdit");
            for (var i = 0; i < tutorIDs.length; i++) {
                var option = document.createElement("option");
                option.text = tutorIDs[i];
                option.value = tutorIDs[i];
                select.add(option);

                var option2 = document.createElement("option");
                option2.text = tutorIDs[i];
                option2.value = tutorIDs[i];
                select2.add(option2);
            }
        }
    });
}

/*
    Enrolls or Unenrolls a student from a specified class
*/
function modifyExp()
{
    var cid = document.getElementById("cid").value;
    var sid = document.getElementById("sid").value;
    var func = document.getElementById("expType").value == "Enroll" ? "enrollStudent" : "unenrollStudent";

    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: {
            functionName: func,
            cid: cid,
            sid: sid
        },
        success: function(response) {
            console.log(response);

            if(response!="")
            {
                alert(response);
            }

            refreshClasses();
        }
    });

}

/*
    Populates all the class ID dropdowns on the page
*/
function populateClassIDs()
{
    document.getElementById("cid").innerHTML = "";

    $.ajax({
        type: "GET",
        url: "../PHP/Classes.php",
        data: {
            functionName: "getClassIDs"
        },
        success: function(response) {
            console.log(response);
            var classIDs = JSON.parse(response);
            var select = document.getElementById("cid");
            for (var i = 0; i < classIDs.length; i++) {
                var option = document.createElement("option");
                option.text = "Class ID - "+classIDs[i];
                option.value = classIDs[i];
                select.add(option);
            }
        }
    });
}

/*
    Populates all the student ID dropdowns on the page
*/
function populateStudentIDs()
{
    document.getElementById("sid").innerHTML = "";

    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getStudentIDs"
        },
        success: function(response) {
            console.log(response);
            var studentIDs = JSON.parse(response);
            var select = document.getElementById("sid");
            for (var i = 0; i < studentIDs.length; i++) {
                var option = document.createElement("option");
                option.text = "Student ID - "+studentIDs[i];
                option.value = studentIDs[i];
                select.add(option);
            }
        }
    });
}

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal") || event.target == document.getElementById("editClassModal")) {
        closeClass();
    }
}