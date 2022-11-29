function tutorProfile()
{
    window.location = "../Tutor/TutorProfile.html?tutorID=" + localStorage.getItem("id");
}

function tutorClasses()
{
    window.location = "../Tutor/TutorClasses.html?tutorID=" + localStorage.getItem("id");
}

function AllClasses()
{
    window.location = "../Student/AllClasses.html";
}

function logout()
{
    localStorage.clear();
    window.location.href = "../Login/Login.html";
}