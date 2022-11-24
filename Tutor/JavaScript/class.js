var tutorID;
var userType;

$(document).ready(function () 
{

    userType = localStorage.getItem("userType");
    if(userType == null)
    {
        window.location.href = "../Login/Login.html";
    }

    populateNavbar();

    var urlParams = new URLSearchParams(window.location.search);
    tutorID = urlParams.get('tutorID');

    refreshClasses();

    if(userType == "t")
    {
        document.getElementById("addNewClass").style.display = "block";
    }
    else
    {
        document.getElementById("addNewClass").style.display = "none";
    }
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

function refreshClasses()
{
    document.getElementsByClassName("classDisplay")[0].innerHTML = "";
    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: 
        {
            functionName: "getTutorClasses",
            tutorID: tutorID
        },
        success: function(response) 
        {

            var classes = JSON.parse(response);
            var display = document.getElementsByClassName("classDisplay")[0];

            for(var i = 0; i < classes.length; i++)
            {
                var classDiv = document.createElement("div");
                classDiv.innerHTML += "ID:" + classes[i].id+"<br>";
                classDiv.innerHTML += "Tutor ID:" + classes[i].tutor_id+"<br>";
                classDiv.innerHTML += "Max Capacity:" + classes[i].max_capacity+"<br>";
                classDiv.innerHTML += "Current Capacity:" + classes[i].current_capacity+"<br>";
                classDiv.innerHTML += "Name:" + classes[i].name+"<br>";
                classDiv.innerHTML += "Date:" + classes[i].date+"<br>";
                classDiv.innerHTML += "Duration:" + classes[i].duration+"<br>";
                classDiv.innerHTML += "Status:" + classes[i].status+"<br>";
                classDiv.innerHTML += '<button class="deleteClass" onclick="deleteClass(this)" value='+classes[i].id+'>&times;</button>';
                classDiv.innerHTML += "<br><br>";

                display.appendChild(classDiv);
            }
            
        }
    });
}

function deleteClass(element)
{
    var classID = element.value;

    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: 
        {
            functionName: "deleteClass",
            classID: classID
        },
        success: function(response) 
        {
            refreshClasses();
        }
    });
}

function addClass()
{
    document.getElementById("myModal").style.display = "block";
}

function closeClass()
{
    document.getElementById("myModal").style.display = "none";
}

function submitClass()
{
    var maxCapacity = document.getElementById("maxCapacity").value;
    var name = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var duration = document.getElementById("duration").value;
    var tutorID = localStorage.getItem("id");

    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: 
        {
            functionName: "submitClass",
            tutorID: tutorID,
            maxCapacity: maxCapacity,
            currentCapacity: 0,
            name: name,
            date: date,
            duration: duration,
            status: "i"
        },
        success: function(response) 
        {
            refreshClasses();
        }
    });

    document.getElementById("maxCapacity").value = "";
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("duration").value = "";
    closeClass();
}

window.onclick = function(event) 
{
    if (event.target == document.getElementById("myModal")) 
    {
        closeClass();
    }
}