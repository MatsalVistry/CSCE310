function tutorProfile() {
    window.location = "../Tutor/TutorProfile.html?tutorID=" + localStorage.getItem("id");
}

function tutorClasses() {
    window.location = "../Tutor/TutorClasses.html?tutorID=" + localStorage.getItem("id");
}

function tutorPastClasses() {
    window.location = "../Tutor/TutorPastClasses.html?tutorID=" + localStorage.getItem("id");
}

// function AllClasses() {
//     window.location = "../Student/AllClasses.html";
// }

function logout() {
    localStorage.clear();
    window.location.href = "../Login/login.html";
}

// function AllClasses() {
//     window.location = "../Student/AllClasses.html";
// }

// function MyClasses() {
//     window.location = "../Student/MyClasses.html";
// }

// function PastClasses() {
//     window.location = "../Student/PastClasses.html";
// }