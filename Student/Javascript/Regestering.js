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
            functionName: "all"
        },
        success: function(result){
            var info = JSON.parse(result);

            var student = document.getElementsByClassName("Student_info")[0];
            student.innerHTML = "Welcome "+first_name+" "+last_name+"! Here are all the classes you have signed up for:"+"<br>" ;
            for(var i = 0; i < info.length; ++i){
                var classId = info[i].classId;
                var classMax = info[i].classMax;
                var classCurrent = info[i].classCurrent;
                var name = info[i].className;
                var date = info[i].classDate;
                var duration = info[i].classDuration;
                var tutorFName = info[i].tutor_FName;
                var tutorLName = info[i].tutor_LName;

                var classDiv = document.createElement("div");
                reviewDiv.className = "classes";
                if(classCurrent<=classMax){
                    reviewDiv.innerHTML += "<p>:Class ID: " + classId + " Class Name: " + name + " Date:"+ date + "Duration: " + duration + " hours Tutor: "+ tutorFName + tutorLName +" Seat Avaliable: "+classCurrent+"/"+classMax+ "</p>";
                    if(authorizedToAdd)
                        reviewDiv.innerHTML += '<button class="addClass" onclick="addClass(this)" value='+id+'>&times;</button>';
                    student.appendChild(classDiv);
                }

            }

        }



    })
}

function addClass(){
    
}