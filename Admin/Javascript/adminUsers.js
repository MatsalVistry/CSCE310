var adminID;
var userType;

$(document).ready(function() {

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    populateNavbar();
    populateUsers();
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
    Displays all of the users registered in the application
*/
function populateUsers() {
    $("#users").html("");
    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getAllUsers",
        },
        success: function(response) {
            var users = JSON.parse(response);

            for (var i = 0; i < users.length; i++) {
                var id = users[i]["id"];
                var first_name = users[i]["first_name"];
                var last_name = users[i]["last_name"];
                var role = users[i]["role"];
                var email = users[i]["email"];
                var password = users[i]["password"];

                if (id == localStorage.getItem("id"))
                    continue;

                var usersDiv = document.createElement("div");
                usersDiv.classList.add("box")
                usersDiv.innerHTML += "<p >User ID: " + id + "<br>" +
                    "First Name: " + first_name + "<br>" +
                    "Last Name: " + last_name + "<br>" +
                    "Role: " + role + "<br>" +
                    "Email: " + email + "<br>" +
                    "Password: " + password + "<br>" +
                    '<button class="editUser" onclick="openModal2(this)" value=' + users[i].id + '>Edit</button>' +
                    '<button class="deleteUser" onclick="deleteUser(this)" input='+role+' value=' + users[i].id + '>Delete</button>' +

                    "</p>";

                $("#users").append(usersDiv);
            }
        }
    });
}

/*
    Deletes a user from the database
*/
function deleteUser(element) {
    var id = element.value;
    var role = element.getAttribute("input");

    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "deleteUser",
            role: role,
            id: id
        },
        success: function(response) {
            console.log(response);
            populateUsers();
        }
    });
}

/*
    Closes all modals and resets their fields
*/
function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    document.getElementById("myModal2").style.display = "none";
    document.getElementById("edit_fname").value = "";
    document.getElementById("edit_lname").value = "";
    document.getElementById("edit_email").value = "";
    document.getElementById("edit_password").value = "";
}

/*
    Displays the modal to add a user
*/
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

/*
    Adds a new user into the database
*/
function submitUser() {
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

/*
    Opens the modal to edit a user and prepopulates the values
*/
function openModal2(element) {
    var userID = element.value;
    document.getElementById("myModal2").style.display = "block";
    document.getElementById("myModal2").value = userID;


    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getUser",
            id: userID
        },
        success: function(response) {
            var user = JSON.parse(response);
            document.getElementById("edit_fname").value = user.first_name;
            document.getElementById("edit_lname").value = user.last_name;
            document.getElementById("edit_email").value = user.email;
            document.getElementById("edit_password").value = user.password;
        }
    });
}

/*
    Edits a user based on the inputted fields
*/
function submitUserEdit() {
    var fname = document.getElementById("edit_fname").value;
    var lname = document.getElementById("edit_lname").value;
    var email = document.getElementById("edit_email").value;
    var password = document.getElementById("edit_password").value;

    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "editUser",
            id: document.getElementById("myModal2").value,
            first_name: fname,
            last_name: lname,
            email: email,
            password: password,
        },
        success: function(response) {
            console.log(response);
            populateUsers();
            closeModal();
        }
    });
}


window.onclick = function(event) {
    if (event.target == document.getElementById("myModal") || event.target == document.getElementById("myModal2")) {
        closeModal();
    }
}