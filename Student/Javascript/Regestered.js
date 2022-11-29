var tutorID;
var userType;
var username;

var studentID = localStorage.getItem('StudentID')
// $(document).ready(function () 
// {
//     userType = localStorage.getItem("userType");
//     if(userType == null)
//     {
//         window.location.href = "../Login/Login.html";
//     }

//     var urlParams = new URLSearchParams(window.location.search);
//     userID = urlParams.get('userID');

//     refreshReviews();

//     if(userType == "t")
//     {
//         document.getElementById("addReview").style.display = "none";
//     }
//     else
//     {
//         document.getElementById("addReview").style.display = "block";
//     }
// });


function ViewClasses(){
    //This will get all the classes that the user is going to 
    $.ajax({
        type: 'GET',
        url: "../PHP/Regestered.php",
        data:{
            user_id: userID,
            functionName: "current"
        },
        success: function(result){
            var studentinfo = JSON.parse(result);
            var first_name = studentinfo.student_FName;
            var last_name = studentinfo.student_LName;

            var student = document.getElementsByClassName("Student_info")[0];
            student.innerHTML = "Welcome "+first_name+" "+last_name+"! Here are all the classes you have signed up for:"+"<br>" ;
            for(var i = 0; i < studentinfo.classId.length; ++i){
                var id = studentinfo[i].classId;
                var name = studentinfo[i].className;
                var date = studentinfo[i].classDate;
                var duration = studentinfo[i].classDuration;

                var classDiv = document.createElement("div");
                reviewDiv.className = "classes";

                reviewDiv.innerHTML += "<p>:Class ID: " + id + " Class Name: " + name + " Date:"+ date + "Duration: " + duration + " hours" + "</p>";
                if(authorizedToDelete)
                    reviewDiv.innerHTML += '<button class="deleteClass" onclick="deleteClass(this)" value='+id+'>&times;</button>';
                student.appendChild(classDiv);

            }

        }



    })
}

function deleteClass(){
    
}