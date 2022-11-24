var tutorID;

$(document).ready(function () 
{
    var studentID = localStorage.getItem("studentID");
    if(studentID == null)
    {
        window.location.href = "../Login/Login.html";
    }

    var urlParams = new URLSearchParams(window.location.search);
    tutorID = urlParams.get('tutorID');

    refreshReviews();
});

function refreshReviews()
{
    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: 
        {
            functionName: "getTutorInformation",
            tutorID: tutorID
        },
        success: function(response) 
        {
            console.log(response);

            // grab the tutor's information from the response
            var tutor = JSON.parse(response);

            var firstName = tutor.first_name;
            var lastName = tutor.last_name;
            var email = tutor.email;
            var reviews = tutor.reviews;

            var tutorInfo = document.getElementsByClassName("tutorInfo")[0];
            tutorInfo.innerHTML = "First Name: " + firstName + "<br>" + "Last Name: " + lastName + "<br>" + "Email: " + email + "<br><br><br>" + "Reviews: ";
            for(var i = 0; i < reviews.length; i++)
            {
                var review = reviews[i];
                var studentName = review.Student_Name;
                var reviewString = review.Review_String;

                var reviewDiv = document.createElement("div");
                reviewDiv.innerHTML = "Student Name: " + studentName + "<br>" + "Review: " + reviewString+ "<br><br>";
                tutorInfo.appendChild(reviewDiv);
            }
        }
    });
}

function addReview()
{
    document.getElementById("myModal").style.display = "block";
}

function closeReview()
{
    document.getElementById("myModal").style.display = "none";
}

function submitReview()
{
    var reviewString = document.getElementById("review").value;
    var studentID = localStorage.getItem("studentID");

    $.ajax({
        type: "POST",
        url: "../PHP/Reviews.php",
        data: 
        {
            functionName: "submitReview",
            tutorID: tutorID,
            reviewString: reviewString,
            studentID: studentID
        },
        success: function(response) 
        {
            refreshReviews();
        }
    });

    document.getElementById("review").value = "";
    closeReview();
}

window.onclick = function(event) 
{
    if (event.target == document.getElementById("myModal")) 
    {
        closeReview();
    }
}