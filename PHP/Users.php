<?php

include_once './Credentials.php';

$conn = OpenCon();

$is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
$is_post = $_SERVER['REQUEST_METHOD'] == 'POST';
if ($is_get) {
    if ($_GET['functionName'] == "getAllUsers") {
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
    } else if ($_GET['functionName'] == "getUserbyName") {
        // query all users using mysqli
        $statement = "SELECT * FROM Users WHERE User_ID=" . $_GET['studentID'] . ";";
        $result = mysqli_query($conn, $statement);


        $row = mysqli_fetch_array($result);

        $user = array();
        $user['id'] = $row['User_ID'];
        $user['first_name'] = $row['User_First_Name'];
        $user['last_name'] = $row['User_Last_Name'];
        $user['role'] = $row['User_Role'];
        $user['email'] = $row['User_Email'];

        // grab all the reviews left on the student
        $statement = "SELECT * FROM Reviews WHERE Student_ID=" . $_GET['studentID'] . ";";
        $result = mysqli_query($conn, $statement);

        $reviews = array();

        while ($row = mysqli_fetch_array($result)) {
            $review = array();
            $review['Review_ID'] = $row['Review_ID'];
            $review['Tutor_ID'] = $row['Tutor_ID'];
            $review['Student_ID'] = $row['Student_ID'];
            $review['Review_String'] = $row['Review_String'];

            $name = "GeeksforGeeks";
            // grab the student's name
            $statement = "SELECT * FROM Users WHERE User_ID=" . $review['Student_ID'] . ";";
            $student_result = mysqli_query($conn, $statement);
            $student_row = mysqli_fetch_array($student_result);
            $review['Student_Name'] = $student_row['User_First_Name'] . " " . $student_row['User_Last_Name'];
            array_push($reviews, $review);
        }
        
        $user['Reviews'] = $reviews;
        echo json_encode("<h1>Hello User, </h1> <p>Welcome to {$name}</p>");

        echo json_encode($user);
        }
        else if($_GET['functionName'] == "verifyLogin")
        {
            $statement = "SELECT * FROM users WHERE User_Email='".$_GET['email']."' AND User_Password='".$_GET['password']."';";
            $result = mysqli_query($conn, $statement);

            $user = array();

            $row = mysqli_fetch_array($result);

            if($row)
            {
                $user['id'] = $row['User_ID'];
                $user['role'] = $row['User_Role'];
                $user['success'] = true;
            }
            else
            {
                $user['success'] = false;
            }

            

            echo json_encode($user);
        }
        else if($_GET['functionName'] == "getTutorClasses")
        {
            $statement = "SELECT * FROM classes WHERE Tutor_ID=".$_GET['tutorID'].";";
            $result = mysqli_query($conn, $statement);

            $classes = array();

            while($row = mysqli_fetch_array($result))
            {
                $class = array();
                $class['id'] = $row['Class_ID'];
                $class['tutor_id'] = $row['Tutor_ID'];
                $class['max_capacity'] = $row['Class_MaxCapacity'];
                $class['current_capacity'] = $row['Class_CurrentCapacity'];
                $class['name'] = $row['Class_Name'];
                $class['date'] = $row['Class_Date'];
                $class['duration'] = $row['Class_Duration'];
                $class['status'] = $row['Class_Status'];

                array_push($classes, $class);
            }

            echo json_encode($classes);
        
        


    } else if ($_GET['functionName'] == "getTutorInformation") {
        // query all users using mysqli
        $statement = "SELECT * FROM Users WHERE User_ID=" . $_GET['tutorID'] . ";";
        $result = mysqli_query($conn, $statement);


        $row = mysqli_fetch_array($result);

        $user = array();
        $user['id'] = $row['User_ID'];
        $user['first_name'] = $row['User_First_Name'];
        $user['last_name'] = $row['User_Last_Name'];
        $user['role'] = $row['User_Role'];
        $user['email'] = $row['User_Email'];

        // grab all the reviews left on the tutor
        $statement = "SELECT * FROM Reviews WHERE Tutor_ID=" . $_GET['tutorID'] . ";";

        $result = mysqli_query($conn, $statement);

        $reviews = array();

        while ($row = mysqli_fetch_array($result)) {
            $review = array();
            $review['Review_ID'] = $row['Review_ID'];
            $review['Tutor_ID'] = $row['Tutor_ID'];
            $review['Student_ID'] = $row['Student_ID'];
            $review['Review_String'] = $row['Review_String'];

            // grab the student's name
            $statement = "SELECT * FROM Users WHERE User_ID=" . $review['Student_ID'] . ";";
            $student_result = mysqli_query($conn, $statement);
            $student_row = mysqli_fetch_array($student_result);
            $review['Student_Name'] = $student_row['User_First_Name'] . " " . $student_row['User_Last_Name'];

            array_push($reviews, $review);
        }

        $user['Reviews'] = $reviews;

        echo json_encode($user);
    }
}

CloseCon($conn);
?>