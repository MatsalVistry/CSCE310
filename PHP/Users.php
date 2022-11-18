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
            // query all users using mysqli
            $statement = "SELECT * FROM users WHERE User_ID=".$_GET['tutorID'].";";
            $result = mysqli_query($conn, $statement);


            $row = mysqli_fetch_array($result);
            
            $user = array();
            $user['id'] = $row['User_ID'];
            $user['first_name'] = $row['User_First_Name'];
            $user['last_name'] = $row['User_Last_Name'];
            $user['role'] = $row['User_Role'];
            $user['email'] = $row['User_Email'];

            // grab all the reviews left on the tutor
            $statement = "SELECT * FROM reviews WHERE Tutor_ID=".$_GET['tutorID'].";";

            $result = mysqli_query($conn, $statement);

            $reviews = array();

            while($row = mysqli_fetch_array($result))
            {
                $review = array();
                $review['Review_ID'] = $row['Review_ID'];
                $review['Tutor_ID'] = $row['Tutor_ID'];
                $review['Student_ID'] = $row['Student_ID'];
                $review['Review_String'] = $row['Review_String'];

                // grab the student's name
                $statement = "SELECT * FROM users WHERE User_ID=".$review['Student_ID'].";";
                $student_result = mysqli_query($conn, $statement);
                $student_row = mysqli_fetch_array($student_result);
                $review['Student_Name'] = $student_row['User_First_Name']." ".$student_row['User_Last_Name'];

                array_push($reviews, $review);
            }

            $user['reviews'] = $reviews;
            
            echo json_encode($user);
        }
    }

    CloseCon($conn);
?>