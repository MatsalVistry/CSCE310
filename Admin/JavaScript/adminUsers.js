var adminID;
var userType;

$(document).ready(function() 
{

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    populateNavbar();
    populateUsers();
});

function populateNavbar() 
{
    if (userType == "t") {
        $("#navbar").load("../Navbars/TutorNavbar.html");
    } else if (userType == "s") {
        $("#navbar").load("../Navbars/StudentNavbar.html");
    } else if (userType == "a") {
    $("#navbar").load("../Navbars/AdminNavbar.html");
    }
}

function populateUsers() 
{
    $("#users").html("");
    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getAllUsers",
        },
        success: function(response) 
        {
            var users = JSON.parse(response);

            for (var i = 0; i < users.length; i++) 
            {
                var id = users[i]["id"];
                var first_name = users[i]["first_name"];
                var last_name = users[i]["last_name"];
                var role = users[i]["role"];
                var email = users[i]["email"];

                if(id==localStorage.getItem("id"))
                    continue;

                var usersDiv = document.createElement("div");
                usersDiv.innerHTML += "<p>User ID: " + id + "<br>" +
                    "First Name: " + first_name + "<br>" +
                    "Last Name: " + last_name + "<br>" +
                    "Role: " + role + "<br>" +
                    "Email: " + email + "<br>" +
                    '<button class="deleteUser" onclick="deleteUser(this)" value=' + users[i].id + '>&times;</button>' +
                    "</p>";

                $("#users").append(usersDiv);
            }
        }
    });
}

function deleteUser(element) {
    var id = element.value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "deleteUser",
            id: id
        },
        success: function(response) {
            console.log(response);
            populateUsers();
        }
    });
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

function openModal()
{
    document.getElementById("myModal").style.display = "block";
}

function submitUser()
{
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var role = document.getElementById("role").value;

    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "addUser",
            first_name: fname,
            last_name: lname,
            email: email,
            password: password,
            role: role
        },
        success: function(response) {
            console.log(response);
            populateUsers();
            closeModal();
        }
    });
}


window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        closeModal();
    }
}
