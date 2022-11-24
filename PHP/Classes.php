<?php
    include_once './Credentials.php';

    $conn = OpenCon();

    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';

    if($is_post)
    {
        if($_POST['functionName'] == "submitClass")
        {
            $statement = 
                "INSERT INTO classes (Tutor_ID, Class_MaxCapacity, Class_CurrentCapacity, Class_Name, Class_Date, Class_Duration, Class_Status) 
                VALUES (".$_POST['tutorID'].", ".$_POST['maxCapacity'].", ".$_POST['currentCapacity'].", '".$_POST['name']."', '".$_POST['date']."', '".$_POST['duration']."', '".$_POST['status']."');";

            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "deleteClass")
        {
            $statement = "DELETE FROM classes WHERE Class_ID=".$_POST['classID'].";";
            $result = mysqli_query($conn, $statement);
        }
    }

    CloseCon($conn);
?>