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
                $user['password'] = $row['User_Password'];

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
                u.User_Email as tutor_email
                FROM users as u
                WHERE u.User_ID=".$_GET['tutorID'].";";

            // echo $statement;

            $result = mysqli_query($conn, $statement);
            
            $user = array();
            $reviews = array();

            $row = mysqli_fetch_array($result);
        
            $user['first_name'] = $row['tutor_first_name'];
            $user['last_name'] = $row['tutor_last_name'];
            $user['email'] = $row['tutor_email'];

            // echo json_encode($user);


            $statement = "SELECT 
                            r.Review_ID as review_id,
                            r.Student_ID as student_id,
                            r.Review_String as review_string,
                            un.User_First_Name as student_first_name,
                            un.User_Last_Name as student_last_name
                            FROM reviews as r 
                            INNER JOIN users as un 
                            ON r.Student_ID = un.User_ID
                            WHERE r.Tutor_ID=".$_GET['tutorID'].";";
            // echo $statement;

            $result = mysqli_query($conn, $statement);

            while($row = mysqli_fetch_array($result))
            {
                $review = array();
                $review['id'] = $row['review_id'];
                $review['student_id'] = $row['student_id'];
                $review['Review_String'] = $row['review_string'];
                $review['Student_Name'] = $row['student_first_name']." ".$row['student_last_name'];

                array_push($reviews, $review);
            }

            $user['reviews'] = $reviews;
            
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
        }
        else if($_GET['functionName'] == "getStudentClasses") {
            $cleanview = "DROP VIEW IF EXISTS StudentClasses;";
            mysqli_query($conn, $cleanview);

            $statement = "CREATE VIEW StudentClasses AS SELECT 
            c.*,
            u2.User_First_Name,
            u2.User_Last_Name
            
            
            FROM 
            enrollments as e
            INNER JOIN users as u
            ON e.Student_ID = u.User_ID
            INNER JOIN classes as c
            ON e.Class_ID = c.Class_ID
            INNER JOIN users as u2
            ON c.Tutor_ID = u2.User_ID
            WHERE u.User_ID=" . $_GET['studentID'] . ";";
            mysqli_query($conn, $statement);

            $statement = "SELECT * FROM StudentClasses;";
            $result = mysqli_query($conn, $statement);

            $classes = array();

            while($row = mysqli_fetch_array($result))
            {   
                $class = array();
                
                $class['current_capacity'] = $row['Class_CurrentCapacity'];
                $class['name'] =$row['Class_Name'];
                $class['date'] = $row['Class_Date'];
                $class['duration'] = $row['Class_Duration'];
                $class['status'] = $row['Class_Status'];
                $class['tutor_fname'] = $row['User_First_Name'];
                $class['tutor_lname'] = $row['User_Last_Name'];

                array_push($classes, $class);
            }

            echo json_encode($classes);

            
            
        }
        else if($_GET['functionName'] == "getAllUsers") 
        {
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
        else if($_GET['functionName'] == "getUser")
        {
            $statement = "SELECT * FROM users WHERE User_ID=".$_GET['id'].";";
            $result = mysqli_query($conn, $statement);

            $user = array();

            $row = mysqli_fetch_array($result);

            $user['id'] = $row['User_ID'];
            $user['first_name'] = $row['User_First_Name'];
            $user['last_name'] = $row['User_Last_Name'];
            $user['password'] = $row['User_Password'];
            $user['email'] = $row['User_Email'];

            echo json_encode($user);
        }
        else if($_GET['functionName'] == "getAllClasses")
        {
            $statement = "SELECT * FROM classes;";
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
        }
        else if($_GET['functionName'] == "getTutorIDs")
        {
            $statement = "SELECT User_ID FROM users WHERE User_Role='t';";
            $result = mysqli_query($conn, $statement);

            $tutors = array();

            while($row = mysqli_fetch_array($result))
            {
                array_push($tutors, $row['User_ID']);
            }

            echo json_encode($tutors);
        }
    }
    else
    {
        if($_POST['functionName'] == "deleteUser")
        {
            $statement = "DELETE FROM reviews WHERE Student_ID=".$_POST['id'].";";
            $result = mysqli_query($conn, $statement);

            $statement = "SELECT * FROM enrollments WHERE Student_ID=".$_POST['id'].";";
            $result = mysqli_query($conn, $statement);

            while($row = mysqli_fetch_array($result))
            {
                $statement = "UPDATE classes SET Class_CurrentCapacity=Class_CurrentCapacity-1 WHERE Class_ID=".$row['Class_ID'].";";
                $result = mysqli_query($conn, $statement);
            }

            $statement = "DELETE FROM enrollments WHERE Student_ID=".$_POST['id'].";";
            $result = mysqli_query($conn, $statement);

            $statement = "DELETE FROM users WHERE User_ID=".$_POST['id'].";";
            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "addUser")
        {
            $statement = "INSERT INTO users (User_First_Name, User_Last_Name, User_Role, User_Email, User_Password) VALUES ('".$_POST['first_name']."', '".$_POST['last_name']."', '".$_POST['role']."', '".$_POST['email']."', '".$_POST['password']."');";
            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "editUser")
        {
            $statement = "UPDATE users SET User_First_Name='".$_POST['first_name']."', User_Last_Name='".$_POST['last_name']."', User_Email='".$_POST['email']."', User_Password='".$_POST['password']."' WHERE User_ID=".$_POST['id'].";";
            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "changeFirstName")
        {
            $statement = "UPDATE users SET User_First_Name='".$_POST['first_name']."' WHERE User_ID=".$_POST['studentID'].";"; 
            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "changeLastName")
        {
            $statement = "UPDATE users SET User_Last_Name='".$_POST['last_name']."' WHERE User_ID=".$_POST['studentID'].";"; 
            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "changeEmail")
        {
            $statement = "UPDATE users SET User_Email='".$_POST['email']."' WHERE User_ID=".$_POST['studentID'].";"; 
            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "changePassword")
        {
            $statement = "UPDATE users SET User_Password='".$_POST['password']."' WHERE User_ID=".$_POST['studentID'].";"; 
            $result = mysqli_query($conn, $statement);
        }
    }

    CloseCon($conn);
?>