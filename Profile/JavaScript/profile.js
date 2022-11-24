$(document).ready(function() {
    // get the tutorID from the url
    var urlParams = new URLSearchParams(window.location.search);
    var studentID = urlParams.get('studentID');

    // get the tutor's profile information from the database

    $.ajax({
        type: "GET",
        url: "../../PHP/Users.php",
        data: {
            functionName: "getUserbyName",
            studentID: studentID
        },
        success: function(response) {
            console.log(response);

            // grab the student's information from the response
            var student = JSON.parse(response);
            console.log(student.id);

            var studentID = student.id;
            var firstName = student.first_name;
            var lastName = student.last_name;
            var email = student.email;
            var reviews = student.reviews;

            const studentInfo = document.getElementsByClassName("studentInfo")[0];
            // studentInfo.innerHTML = "ID: " + studentID + "<br>" + "First Name: " + firstName + "<br>" + "Last Name: " + lastName + "<br>" + "Email: " + email + "<br><br><br>" + "Reviews: ";
            if (reviews) {
                for (var i = 0; i < reviews.length(); i++) {
                    var review = reviews[i];
                    // var studentName = review.Student_Name;
                    var reviewString = review.Review_String;

                    var reviewDiv = document.createElement("div");
                    reviewDiv.innerHTML = "Student Name: " + studentName + "<br>" + "Review: " + reviewString + "<br><br>";
                    studentInfo.appendChild(reviewDiv);

                }
            }
        }
    });
});