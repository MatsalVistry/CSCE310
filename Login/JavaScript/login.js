function verify()
{
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: 
        {
            functionName: "verifyLogin",
            email: email,
            password: password
        },
        success: function(response) 
        {
            var user = JSON.parse(response);

            if(user.success == false)
            {
                alert("Invalid Credentials");
                return;
            }
            
            var id = user.id;
            var role = user.role;

            localStorage.setItem("studentID", id);
            localStorage.setItem("userType", role);
            window.location.href = "../Tutor/TutorProfile.html?tutorID=3"
        }
    });

}