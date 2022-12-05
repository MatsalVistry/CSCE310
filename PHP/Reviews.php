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
    else
    {
        if($_GET['functionName'] == "getTutorReviews")
        {
            $statement = "SELECT * FROM ExpandedReviews WHERE tid=".$_GET['tutorID'].";";

            $result = mysqli_query($conn, $statement);
            $reviews = array();

            while($row = mysqli_fetch_array($result))
            {
                $review = array();
                $review['id'] = $row['review_id'];
                $review['student_id'] = $row['student_id'];
                $review['Review_String'] = $row['review_string'];
                $review['Student_Name'] = $row['student_first_name']." ".$row['student_last_name'];

                array_push($reviews, $review);
            }

            echo json_encode($reviews);
        }
        else if($_GET['functionName'] == "getStudentReviews")
        {
            $statement = "SELECT * FROM ExpandedReviews WHERE student_id=".$_GET['studentID'].";";

            $result = mysqli_query($conn, $statement);
            $reviews = array();

            while($row = mysqli_fetch_array($result))
            {
                $review = array();
                $review['id'] = $row['review_id'];
                $review['tutor_id'] = $row['tid'];
                $review['Review_String'] = $row['review_string'];
                $review['Tutor_Name'] = $row['tutor_first_name']." ".$row['tutor_last_name'];

                array_push($reviews, $review);
            }

            echo json_encode($reviews);
        }
    }

    CloseCon($conn);
?>