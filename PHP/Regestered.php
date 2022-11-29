<?php
    //This is getting the user_id, IDK how to do that just yet, it is just a placeholder
    $user_id = $_GET["user_id"]
    include_once './Credentials.php';
    //open the connects to the database
    $conn = OpenCon();
    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';
    //This is going to be SQL statement to get the data from the users
    if($is_get){
        if($_GET['functionName'] == "current"){
            $statement = "SELECT 
            u.UserFirstName as student_FName,
            u.UserLastName as student_LName,
            cl.Class_ID as classId,
            cl.Class_Name as className,
            cl.Class_Date as classDate,
            cl.Class_Duration as classDuration,
            
            from users as u,
            inner join classes as cl
            ON  u.User_ID = cl.Student_ID
            
            WHERE u.USERS_ID = (`Student_ID`) 
            
            VALUES('{$user_id}')"
            //getting the result
            $result = mysqli_query($conn,$statement)
            //fetching the data as an array
            $output = mysqli_fetch_all($result, MYSQLI_ASSOC)
            //free the result from memory
            mysqli_free_result($result)
            close the connections
            mysqli_close($conn)
            //output the data
            print_r($output)
        }
        if($_GET['functionName'] == "all"){
            $statement = "SELECT 
            cl.Class_ID as classId,
            cl.Class_MaxCapacity as classMax,
            cl.Class_CurrentCapcity as classCurrent,
            cl.Class_Name as className,
            cl.Class_Date as classDate,
            cl.Class_Duration as classDuration,
            u.User_First_Name as tutor_FName,
            u.User_Last_Name as tutor_LName
            
            FROM classes as cl,
            users as u,
            Inner Join  on u.User_ID = cl.Tutor_ID
            
            WHERE u.USERS_ID != (`Student_ID`)
            
            VALUES('{$user_id}')"
        }
    }
    if($is_post){
        
    }

?>