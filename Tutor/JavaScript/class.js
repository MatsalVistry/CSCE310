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
            //  $class['id'] = $row['Class_ID'];
            // $class['tutor_id'] = $row['Tutor_ID'];
            // $class['max_capacity'] = $row['Class_MaxCapacity'];
            // $class['current_capacity'] = $row['Class_CurrentCapacity'];
            // $class['name'] = $row['Class_Name'];
            // $class['date'] = $row['Class_Date'];
            // $class['duration'] = $row['Class_Duration'];
            // $class['status'] = $row['Class_Status'];

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
                classDiv.innerHTML += "<br><br>";

                display.appendChild(classDiv);
            }
            
        }
    });
}