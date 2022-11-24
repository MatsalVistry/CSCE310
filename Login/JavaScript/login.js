function verify()
{
    // switch page to ../Tutor/TutorProfile.html and pass in "1" as the tutorID
    window.location.href = "../Tutor/TutorProfile.html?tutorID=3";
    localStorage.setItem("studentID", 1);
    localStorage.setItem("userType", "s");
}