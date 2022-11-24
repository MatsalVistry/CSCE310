<?php
    include_once './Credentials.php';

    $conn = OpenCon();

    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';

    if($is_get)
    {
        if($_GET['functionName'] == "getAllUsers")
        {
            // query all users using mysqli
            $statement = "SELECT * FROM users;";
            $result = mysqli_query($conn, $statement);

            $users = array();

            while($row = mysqli_fetch_array($result))
            {
                $user = array();
                $user['id'] = $row['User_ID'];
                $user['first_name'] = $row['User_First_Name'];
                $user['last_name'] = $row['User_Last_Name'];
                $user['role'] = $row['User_Role'];
                $user['email'] = $row['User_Email'];

                array_push($users, $user);
            }

            echo json_encode($users);
        }
        else if($_GET['functionName'] == "getTutorInformation")
        {
            $statement = 
                "SELECT
                u.User_First_Name as tutor_first_name,
                u.User_Last_Name as tutor_last_name,
                u.User_Email as tutor_email,
                r.Review_String as review_string,
                un.User_First_Name as student_first_name,
                un.User_Last_Name as student_last_name

                FROM users as u 
                INNER JOIN reviews as r 
                    ON u.user_id = r.tutor_id 
                INNER JOIN users as un 
                    ON r.student_id = un.user_id 
                WHERE u.User_ID=".$_GET['tutorID'].";";

            $result = mysqli_query($conn, $statement);
            
            $user = array();
            $reviews = array();

            while($row = mysqli_fetch_array($result))
            {
                $user['first_name'] = $row['tutor_first_name'];
                $user['last_name'] = $row['tutor_last_name'];
                $user['email'] = $row['tutor_email'];

                $review = array();
                $review['Review_String'] = $row['review_string'];
                $review['Student_Name'] = $row['student_first_name']." ".$row['student_last_name'];

                array_push($reviews, $review);
            }

            $user['reviews'] = $reviews;
            
            echo json_encode($user);
        }
    }

    CloseCon($conn);
?>