function tutorProfile() {
    window.location = "../Tutor/TutorProfile.html?tutorID=" + localStorage.getItem("id");
}

function tutorClasses() {
    window.location = "../Tutor/TutorClasses.html?tutorID=" + localStorage.getItem("id");
}

function tutorPastClasses() {
    window.location = "../Tutor/TutorPastClasses.html?tutorID=" + localStorage.getItem("id");
}

function logout() {
    localStorage.clear();
    window.location.href = "../Login/login.html";
}