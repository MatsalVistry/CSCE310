function verify() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "verifyLogin",
            email: email,
            password: password
        },
        success: function(response) {
            var user = JSON.parse(response);

            if (user.success == false) {
                alert("Invalid Credentials");
                return;
            }

            var id = user.id;
            var role = user.role;

            localStorage.setItem("id", id);
            localStorage.setItem("userType", role);

            console.log(role);

            if (role == 't')
                window.location.href = "../Tutor/TutorProfile.html?tutorID=" + id;
            else if (role == 's')
                window.location.href = "../Student/AllClasses.html";
            else
                window.location.href = "../Admin/AdminUsers.html";
        }
    });

}