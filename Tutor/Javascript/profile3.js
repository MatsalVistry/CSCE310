var tutorID;
var userType;

$(document).ready(function() {

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    populateNavbar();

    var urlParams = new URLSearchParams(window.location.search);
    tutorID = urlParams.get('tutorID');

    refreshReviews();

    if (userType == "t") {
        document.getElementById("addReview").style.display = "none";
        document.getElementById("viewClasses").style.display = "none";
        document.getElementById("showChange").style.display = "block";

    } else {
        document.getElementById("addReview").style.display = "block";
        document.getElementById("viewClasses").style.display = "block";
        document.getElementById("showChange").style.display = "none";
    }
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
    Displays all of the reviews for a given tutor
*/
function refreshReviews() {
    $("#tutorInfo").html("");
    $("#reviews").html("");
    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getTutorInformation",
            tutorID: tutorID
        },
        success: function(response) {
            console.log(response);
            // console.log(response);
            var studentID = localStorage.getItem("id");

            // grab the tutor's information from the response
            var tutor = JSON.parse(response);

            var firstName = tutor.first_name;
            var lastName = tutor.last_name;
            var email = tutor.email;
            var reviews = tutor.reviews;


            var tutorInfo = document.getElementById("tutorInfo");
            tutorInfo.innerHTML = "<h2>Tutor Profile</h2> ";
            tutorInfo.innerHTML += "First Name: " + firstName + "<br>" + "Last Name: " + lastName + "<br>" + "Email: " + email;

            var allReviews = document.getElementById("reviews");
            allReviews.innerHTML = "<h2>Reviews: </h2><br><br>";
            for (var i = 0; i < reviews.length; i++) {
                var review = reviews[i];
                var reviewID = review.id;
                var reviewStudentID = review.student_id;
                var studentName = review.Student_Name;
                var reviewString = review.Review_String;
                var authorizedToDelete = userType == "a" || studentID == reviewStudentID;

                var reviewDiv = document.createElement("div");
                reviewDiv.className = "review";

                reviewDiv.innerHTML += "<p>Name: " + studentName + "<br>" + "Review: " + reviewString + "</p>";
                if (authorizedToDelete)
                {
                    reviewDiv.innerHTML += '<button class="deleteReview" onclick="deleteReview(this)" value=' + reviewID + '>Delete</button>';
                    reviewDiv.innerHTML += '<button class="editReview" onclick="editReview(this)" value=' + reviewID + '>Edit</button>';
                }
                allReviews.appendChild(reviewDiv);
            }
        }
    });
}

/*
    Edits a review for a tutor
*/
function editReview()
{
    document.getElementById("editReviewModal").style.display = "block";
}

function closeEditReview()
{
    document.getElementById("editReviewModal").style.display = "none";
}

/*
    Deletes a review for a tutor
*/
function deleteReview(element) {
    var reviewID = element.getAttribute("value");
    $.ajax({
        type: "POST",
        url: "../PHP/Reviews.php",
        data: {
            functionName: "deleteReview",
            reviewID: reviewID
        },
        success: function(response) {
            refreshReviews();
        }
    });
}


/*
    Displays the popup modal for adding a review
*/
function addReview() {
    document.getElementById("myModal").style.display = "block";
}

/*
    Closes the popup modal for adding a review
*/
function closeReview() {
    document.getElementById("myModal").style.display = "none";
}

/*
    Submits a review for a tutor based on inputted fields
*/
function submitReview() {
    var reviewString = document.getElementById("review").value;
    var studentID = localStorage.getItem("id");

    $.ajax({
        type: "POST",
        url: "../PHP/Reviews.php",
        data: {
            functionName: "submitReview",
            tutorID: tutorID,
            reviewString: reviewString,
            studentID: studentID
        },
        success: function(response) {
            refreshReviews();
        }
    });

    document.getElementById("review").value = "";
    closeReview();
}

/*
    Closes the modal if clicked outside of the area
*/
window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        closeReview();
    }
}

/*
    Changes the first name of the tutor
*/
function changeFirstName() {
    var firstname = document.getElementById("firstname").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        async: false,
        data: {
            functionName: "changeFirstName",
            studentID: localStorage.getItem("id"),
            first_name: firstname,
        },
        success: function(response) {
            console.log(response);
        }
    });
}

/*
    Changes the last name of the tutor
*/
function changeLastName() {
    var lastname = document.getElementById("lastname").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        async: false,
        data: {
            functionName: "changeLastName",
            studentID: localStorage.getItem("id"),
            last_name: lastname,
        },
        success: function(response) {
            console.log(response);
        }
    });
}

/*
    Changes the email of the tutor
*/
function changeEmail() {
    var email = document.getElementById("email").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        async: false,
        data: {
            functionName: "changeEmail",
            studentID: localStorage.getItem("id"),
            email: email,
        },
        success: function(response) {
            console.log(response);
        }
    });
}

/*
    Changes the password of the tutor
*/
function changePassword() {
    var password = document.getElementById("password").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        async: false,
        data: {
            functionName: "changePassword",
            studentID: localStorage.getItem("id"),
            password: password
        },
        success: function(response) {
            console.log(response);
        }
    });
}

/*
    Sends a user to a page with the classes taught by a tutor
*/
function viewClasses() {
    window.location.href = "../Student/AllClasses.html?tutorID=" + tutorID;
}

/*
    Decides which fields were updated and sends the appropriate requests
*/
function saveChanges() 
{
    if(document.getElementById("firstname").value != "")
    {
        changeFirstName();
    }
    if(document.getElementById("lastname").value != "")
    {
        changeLastName();
    }
    if(document.getElementById("email").value != "")
    {
        changeEmail();
    }
    if(document.getElementById("password").value != "")
    {
        changePassword();
    }

    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    refreshReviews();
}