$(document).ready(function() {
    // get the tutorID from the url
    var urlParams = new URLSearchParams(window.location.search);
    var tutorID = urlParams.get('tutorID');

    // get the tutor's profile information from the database

    $.ajax({
        type: "GET",
        url: "../PHP/Users.php",
        data: {
            functionName: "getTutorInformation",
            tutorID: tutorID
        },
        success: function(response) {
            console.log(response);

            // grab the tutor's information from the response
            var tutor = JSON.parse(response);

            var tutorID = tutor.id;
            var firstName = tutor.first_name;
            var lastName = tutor.last_name;
            var email = tutor.email;
            var reviews = tutor.reviews;

            var tutorInfo = document.getElementsByClassName("tutorInfo")[0];
            tutorInfo.innerHTML = "ID: " + tutorID + "<br>" + "First Name: " + firstName + "<br>" + "Last Name: " + lastName + "<br>" + "Email: " + email + "<br><br><br>" + "Reviews: ";
            for (var i = 0; i < reviews.length(); i++) {
                var review = reviews[i];
                var studentName = review.Student_Name;
                var reviewString = review.Review_String;

                var reviewDiv = document.createElement("div");
                reviewDiv.innerHTML = "Student Name: " + studentName + "<br>" + "Review: " + reviewString + "<br><br>";
                tutorInfo.appendChild(reviewDiv);
            }
        }
    });
});