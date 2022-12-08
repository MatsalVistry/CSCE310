var tutorID;
var userType;
var tutorWasLastClicked = false;

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
    tutorWasLastClicked = true;
    $("#reviews").html("");
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

            var allInfo = document.getElementsByClassName("reviews")[0];
            for (var i = 0; i < reviews.length; i++) {
                var review = reviews[i];
                var reviewID = review.id;
                var studentName = review.Student_Name;
                var reviewString = review.Review_String;

                var reviewDiv = document.createElement("div");
                reviewDiv.className = "review";

                reviewDiv.innerHTML += "<p>Student Name: " + studentName + "<br><br>" + "Review: " + reviewString + "</p>";
                reviewDiv.innerHTML += '<button class="deleteReview" onclick="deleteReview(this, true)" value=' + reviewID + '>Delete</button>';
                reviewDiv.innerHTML += '<button class="editReview" onclick="editReview(this)" input="'+reviewString+'" value=' + reviewID + '>Edit</button>';

                allInfo.appendChild(reviewDiv);
            }
        }
    });
}

/*
    Edits a review for a tutor
*/
function editReview(element)
{
    document.getElementById("editReviewModal").style.display = "block";

    var reviewID = element.getAttribute("value");
    var reviewString = element.getAttribute("input");

    document.getElementById("reviewEdit").value = reviewString;
    document.getElementById("editReviewModal").value = reviewID;

}

/*
    Closes the popup modal for editing a review
*/
function closeEditReview()
{
    document.getElementById("editReviewModal").style.display = "none";
}

/*
    Submits a review for a tutor based on inputted fields
*/
function submitEditReview()
{
    var reviewString = document.getElementById("reviewEdit").value;
    var reviewID = document.getElementById("editReviewModal").value;

    $.ajax({
        type: "POST",
        url: "../PHP/Reviews.php",
        data: {
            functionName: "editReview",
            reviewID: reviewID,
            reviewString: reviewString
        },
        success: function(response) 
        {
            if (tutorWasLastClicked)
                tutorClick();
            else
                studentClick();
            closeEditReview();
        }
    });
}



/*
    Deletes a review for a specific tutor
*/
function deleteReview(element, isTutorDelete) {
    var reviewID = element.getAttribute("value");
    $.ajax({
        type: "POST",
        url: "../PHP/Reviews.php",
        data: {
            functionName: "deleteReview",
            reviewID: reviewID
        },
        success: function(response) {

            if (isTutorDelete) 
                tutorClick();
            else 
                studentClick();
        }
    });
}

/*
    Displays all of the reviews that a specified student wrote
*/
function studentClick()
{
    tutorWasLastClicked = false;
    $("#reviews").html("");
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

            var allInfo = document.getElementsByClassName("reviews")[0];
            for (var i = 0; i < reviews.length; i++) {
                var review = reviews[i];
                var reviewID = review.id;
                var reviewTutorID = review.tid;
                var tutorName = review.Tutor_Name;
                var reviewString = review.Review_String;

                var reviewDiv = document.createElement("div");
                reviewDiv.className = "review";

                reviewDiv.innerHTML += "<p>Tutor Name: " + tutorName + "<br>" + "Review: " + reviewString + "</p>";
                reviewDiv.innerHTML += '<button class="deleteReview" onclick="deleteReview(this, false)" value=' + reviewID + '>Delete</button>';
                reviewDiv.innerHTML += '<button class="editReview" onclick="editReview(this)" input="'+reviewString+'" value=' + reviewID + '>Edit</button>';
                allInfo.appendChild(reviewDiv);
            }
        }
    });
}