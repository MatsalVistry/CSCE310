<?php
    include_once './Credentials.php';

    $conn = OpenCon();

    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';

    if($is_post)
    {
        if($_POST['functionName'] == "submitReview")
        {
            $statement = "INSERT INTO reviews (Tutor_ID, Student_ID, Review_String) VALUES (".$_POST['tutorID'].", ".$_POST['studentID'].", '".$_POST['reviewString']."');";
            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "deleteReview")
        {
            $statement = "DELETE FROM reviews WHERE Review_ID=".$_POST['reviewID'].";";
            $result = mysqli_query($conn, $statement);
        }
    }

    CloseCon($conn);
?>