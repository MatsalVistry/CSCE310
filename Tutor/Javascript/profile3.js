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
    document.getElementById("isClicked").style.display = "none";

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

function clickUpdateButton() {
    document.getElementById("isClicked").style.display = 'block';
}

function populateNavbar() {
    if (userType == "t") {
        $("#navbar").load("../Navbars/TutorNavbar.html");
    } else if (userType == "s") {
        $("#navbar").load("../Navbars/StudentNavbar.html");
    } else if (userType == "a") {
        $("#navbar").load("../Navbars/AdminNavbar.html");
    }
}

function refreshReviews() {
    document.getElementsByClassName("tutorInfo")[0] = "";
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


            var tutorInfo = document.getElementsByClassName("tutorInfo")[0];
            tutorInfo.innerHTML = "First Name: " + firstName + "<br>" + "Last Name: " + lastName + "<br>" + "Email: " + email + "<br><br><br>" + "Reviews: ";

            var allReviews = document.getElementsByClassName("reviews")[0];
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
                    reviewDiv.innerHTML += '<button class="deleteReview" onclick="deleteReview(this)" value=' + reviewID + '>&times;</button>';
                allReviews.appendChild(reviewDiv);
            }
        }
    });
}

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

function addReview() {
    document.getElementById("myModal").style.display = "block";
}

function closeReview() {
    document.getElementById("myModal").style.display = "none";
}

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

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        closeReview();
    }
}

function changeFirstName() {
    var firstname = document.getElementById("firstname").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "changeFirstName",
            studentID: localStorage.getItem("id"),
            first_name: firstname,
        },
        success: function(response) {
            console.log(response);
            refreshReviews();
        }
    });
}

function changeLastName() {
    var lastname = document.getElementById("lastname").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "changeLastName",
            studentID: localStorage.getItem("id"),
            last_name: lastname,
        },
        success: function(response) {
            console.log(response);
            refreshReviews();
        }
    });
}

function changeEmail() {
    var email = document.getElementById("email").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "changeEmail",
            studentID: localStorage.getItem("id"),
            email: email,
        },
        success: function(response) {
            console.log(response);
            refreshReviews();
        }
    });
}

function changePassword() {
    var password = document.getElementById("password").value;
    $.ajax({
        type: "POST",
        url: "../PHP/Users.php",
        data: {
            functionName: "changePassword",
            studentID: localStorage.getItem("id"),
            password: password
        },
        success: function(response) {
            console.log(response);
            refreshReviews();
        }
    });
}

function viewClasses() {
    window.location.href = "../Student/AllClasses.html?tutorID=" + tutorID;
}