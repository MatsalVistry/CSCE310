
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

            localStorage.setItem("id", id);
            localStorage.setItem("userType", role);

            // window.location.href = "../Tutor/TutorProfile.html?tutorID=3";
            // window.location.href = "../Tutor/TutorProfile.html?tutorID=1111";
        }
    });

// function verify() {
    // switch page to ../Tutor/TutorProfile.html and pass in "1" as the tutorID
    // window.location.href = "../Tutor/TutorProfile.html?tutorID=1";
    window.location.href = "../Profile/index.html?studentID=1111";
// }