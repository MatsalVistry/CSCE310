var tutorID;
var userType;

$(document).ready(function() {

    userType = localStorage.getItem("userType");
    if (userType == null) {
        window.location.href = "../Login/login.html";
    }

    populateNavbar();
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
    Displays all of the reviews for a specified tutor
*/
function tutorClick() 
{
    $("#allInfo").html("");
    $.ajax({
        type: "GET",
        url: "../PHP/Reviews.php",
        data: {
            functionName: "getTutorReviews",
            tutorID: $("#tutorFilter").val()
        },
        success: function(response) {
            console.log(response);
            var reviews = JSON.parse(response);
            console.log(reviews);

            var allInfo = document.getElementsByClassName("allInfo")[0];
            for (var i = 0; i < reviews.length; i++) {
                var review = reviews[i];
                var reviewID = review.id;
                var reviewStudentID = review.student_id;
                var studentName = review.Student_Name;
                var reviewString = review.Review_String;
                var authorizedToDelete = userType == "a" || studentID == reviewStudentID;

                var reviewDiv = document.createElement("div");
                reviewDiv.className = "review";

                reviewDiv.innerHTML += "<p>Student Name: " + studentName + "<br>" + "Review: " + reviewString + "</p>";
                if (authorizedToDelete)
                    reviewDiv.innerHTML += '<button class="deleteReview" onclick="deleteReview(this)" value=' + reviewID + '>&times;</button>';
                    allInfo.appendChild(reviewDiv);
            }
        }
    });
}

/*
    Deletes a review for a specific tutor
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
            tutorClick();
        }
    });
}

/*
    Displays all of the reviews that a specified student wrote
*/
function studentClick()
{
    $("#allInfo").html("");
    $.ajax({
        type: "GET",
        url: "../PHP/Reviews.php",
        data: {
            functionName: "getStudentReviews",
            studentID: $("#studentFilter").val()
        },
        success: function(response) {
            console.log(response);
            var reviews = JSON.parse(response);
            console.log(reviews);

            var allInfo = document.getElementsByClassName("allInfo")[0];
            for (var i = 0; i < reviews.length; i++) {
                var review = reviews[i];
                var reviewID = review.id;
                var reviewTutorID = review.tid;
                var tutorName = review.Tutor_Name;
                var reviewString = review.Review_String;
                var authorizedToDelete = userType == "a" || studentID == reviewStudentID;

                var reviewDiv = document.createElement("div");
                reviewDiv.className = "review";

                reviewDiv.innerHTML += "<p>Tutor Name: " + tutorName + "<br>" + "Review: " + reviewString + "</p>";
                if (authorizedToDelete)
                    reviewDiv.innerHTML += '<button class="deleteReview" onclick="deleteReview(this)" value=' + reviewID + '>&times;</button>';
                    allInfo.appendChild(reviewDiv);
            }
        }
    });
}