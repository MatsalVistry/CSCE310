function AdminProfile() {
    window.location = "../Admin/AdminProfile.html?adminID=" + localStorage.getItem("id");
}

function AdminClasses() {
    window.location = "../Admin/AdminClasses.html?adminID=" + localStorage.getItem("id");
}

function studentProfile() {
    window.location = "StudentProfile.html?studentID=" + localStorage.getItem("id");
}

function AllClasses() {
    window.location = "../Student/AllClasses.html";
}

function logout() {
    localStorage.clear();
    window.location.href = "../Login/login.html";
}

function AdminUsers()
{
    window.location = "../Admin/AdminUsers.html";
}

function AdminReviews()
{
    window.location = "../Admin/AdminReviews.html";
}