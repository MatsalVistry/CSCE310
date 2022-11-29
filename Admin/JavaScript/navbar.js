function AdminProfile() {
    window.location = "../Admin/AdminProfile.html?adminID=" + localStorage.getItem("id");
}

function AdminClasses() {
    window.location = "../Admin/AdminClasses.html?adminID=" + localStorage.getItem("id");
}

function studentProfile() {
    window.location = "StudentProfile.html?studentID=" + localStorage.getItem("id");
}

function logout() {
    localStorage.clear();
    window.location.href = "../Login/Login.html";
}