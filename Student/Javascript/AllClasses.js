var userType;

$(document).ready(function () 
{

    userType = localStorage.getItem("userType");
    if(userType == null)
    {
        window.location.href = "../Login/Login.html";
    }

    populateNavbar();
    populateClasses();
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

function populateClasses()
{
    document.getElementsByClassName("allClasses")[0].innerHTML = "";
    $.ajax({
        type: "GET",
        url: "../PHP/Classes.php",
        data: 
        {
            functionName: "getAllClasses",
        },
        success: function(response) 
        {
            // console.log(response);
            var classes = JSON.parse(response);
            var display = document.getElementsByClassName("allClasses")[0];

            $.ajax({
                type: "GET",
                url: "../PHP/Classes.php",
                data: 
                {
                    functionName: "getCurrentStudentClasses",
                    studentID: localStorage.getItem("id")
                },
                success: function(r2) 
                {
                    var currentClasses = JSON.parse(r2);
                    console.log(currentClasses);

                    for(var i = 0; i < classes.length; i++)
                    {
                        var classDiv = document.createElement("div");
                        classDiv.innerHTML += "<div class='cid' value="+classes[i].id+"> ID:" + classes[i].id+"</div><br>";
                        classDiv.innerHTML += "<div class='ctutorid' value="+classes[i].tutor_id+"> Tutor ID:" + classes[i].tutor_id+"</div><br>";
                        classDiv.innerHTML += "<div class='ctutorname' value="+classes[i].tutor_name+"> Tutor Name:" + classes[i].tutor_name+"</div><br>";
                        classDiv.innerHTML += "<div class='cmaxcapacity' value="+classes[i].max_capacity+"> Max Capacity:" + classes[i].max_capacity+"</div><br>";
                        classDiv.innerHTML += "<div class='ccurrentcapacity' value="+classes[i].current_capacity+"> Current Capacity:" + classes[i].current_capacity+"</div><br>";
                        classDiv.innerHTML += "<div class='cname' value="+classes[i].name+"> Name:" + classes[i].name+"</div><br>";
                        classDiv.innerHTML += "<div class='cdate' value="+classes[i].date+"> Date:" + classes[i].date+"</div><br>";
                        classDiv.innerHTML += "<div class='cduration' value="+classes[i].duration+"> Duration:" + classes[i].duration+"</div><br>";
                        classDiv.innerHTML += "<div class='cstatus' value="+classes[i].status+"> Status:" + classes[i].status+"</div><br>";

                        if(!currentClasses.includes(classes[i].id))
                            classDiv.innerHTML += '<button class="enroll" onclick="enroll(this)" value='+classes[i].id+'>Enroll</button>';
                        else
                            classDiv.innerHTML += '<button class="unenroll" onclick="unenroll(this)" value='+classes[i].id+'>Unenroll</button>';

                        classDiv.innerHTML += "<br><br>";

                        display.appendChild(classDiv);
                    }
                }
            });
        }
    });
}

function enroll(element)
{
    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: 
        {
            functionName: "enrollInClass",
            studentID: localStorage.getItem("id"),
            classID: element.value
        },
        success: function(response) 
        {
            console.log(response);
            populateClasses();
        }
    });
}

function unenroll(element)
{
    $.ajax({
        type: "POST",
        url: "../PHP/Classes.php",
        data: 
        {
            functionName: "unenrollFromClass",
            studentID: localStorage.getItem("id"),
            classID: element.value
        },
        success: function(response) 
        {
            console.log(response);
            populateClasses();
        }
    });
}