function tutorProfile()
{
    window.location = "../Tutor/TutorProfile.html?tutorID=" + localStorage.getItem("id");
}

function studentProfile()
{
    window.location = "StudentProfile.html?studentID=" + localStorage.getItem("id");
}

function logout()
{
    localStorage.clear();
    window.location.href = "../Login/Login.html";
}