<?php
    include_once '../PHP/Credentials.php';

    $conn = OpenCon();
    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';

    if($is_get)
    {
        if($_GET['functionName'] == "getAllUsers")
        {
            // query all users using mysqli
            $statement = "SELECT * FROM Users;";
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
        else if($_GET['functionName'] == "getUserbyName")
        {
            // query all users using mysqli
            $statement = "SELECT * FROM Users WHERE User_ID=".$_GET['studentID'].";";
            $result = mysqli_query($conn, $statement);


            $row = mysqli_fetch_array($result);
            
            $user = array();
            $user['id'] = $row['User_ID'];
            $user['first_name'] = $row['User_First_Name'];
            $user['last_name'] = $row['User_Last_Name'];
            $user['role'] = $row['User_Role'];
            $user['email'] = $row['User_Email'];

            // grab all the USERS left on the student
            $statement = "SELECT * FROM Users WHERE Student_ID=".$_GET['studentID'].";";

            $result = mysqli_query($conn, $statement);

            $USERS = array();

            while($row = mysqli_fetch_array($result))
            {
                $review = array();
                $review['Review_ID'] = $row['Review_ID'];
                $review['Tutor_ID'] = $row['Tutor_ID'];
                $review['Student_ID'] = $row['Student_ID'];
                $review['Review_String'] = $row['Review_String'];

                // grab the student's name
                // $statement = "SELECT * FROM Users WHERE User_ID=".$review['Student_ID'].";";
                // $student_result = mysqli_query($conn, $statement);
                // $student_row = mysqli_fetch_array($student_result);
                // $review['Student_Name'] = $student_row['User_First_Name']." ".$student_row['User_Last_Name'];
                array_push($USERS, $review);
            }

            $user['Users'] = $USERS;
            
            echo json_encode($user);
            echo '<area id="6" class="seat" title="Seat: B3" coords="170,469,170,432,179,427,202,427,210,433,210,469" shape="poly" data-maphilight=\''. $json_string. '\'>';

        }
    }

    CloseCon($conn);
?>