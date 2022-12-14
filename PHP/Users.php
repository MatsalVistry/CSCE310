<?php
    include_once './Credentials.php';

    $conn = OpenCon();

    // Determine whether the request was a get or post
    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';

    if($is_get)
    {
        // John (admin profile)
        if($_GET['functionName'] == "getAllUsers") 
        {
            $statement = "SELECT * FROM users;";
            $result = mysqli_query($conn, $statement);

            $users = array();

            // Add each user as an associative array to the users array
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

        // Vatsal and Isabelle
        else if($_GET['functionName'] == "getTutorInformation") 
        {
            $user = array();
            $reviews = array();

            // Isabelle (user profile) - Pull in all of the reviews for the specified tutor (using tutorID)
            // The ExpandedReviews View here is specifically used to display the review and name of a tutor on the:
                // Vatsal (user reviews) - user: to pull in for the students to view the tutors reviews
                // Isabelle (admin reviews) - admin: to allow the admin to get the reviews for a tutor, as they can filter on their page
            $statement = "SELECT * FROM ExpandedReviews WHERE tutor_id =".$_GET['tutorID'].";";
            $result = mysqli_query($conn, $statement);

            $first = true;

            // Add each review as an associative array to the reviews array
            while($row = mysqli_fetch_array($result))
            {

                if($row['review_id'] != null)
                {
                    $review = array();
                    $review['id'] = $row['review_id'];
                    $review['student_id'] = $row['student_id'];
                    $review['Review_String'] = $row['review_string'];
                    $review['Student_Name'] = $row['student_first_name']." ".$row['student_last_name'];
                    array_push($reviews, $review);
                }

                // If this is the first review, get the tutors information (only need to get the tutors info once)
                if($first)
                {
                    $user['first_name'] = $row['tutor_first_name'];
                    $user['last_name'] = $row['tutor_last_name'];
                    $user['email'] = $row['tutor_email'];
                    $first = false;
                }

            }

            $user['reviews'] = $reviews;
            
            echo json_encode($user);
        }

        //  Isabelle (user profile) - Get the information (first, last name, email) for the specified student (based on their studentID)
        else if($_GET['functionName'] == "getStudentInformation")
        {
            $statement = 
                "SELECT
                u.User_First_Name as student_first_name,
                u.User_Last_Name as student_last_name,
                u.User_Email as student_email
                FROM users as u
                WHERE u.User_ID=".$_GET['studentID'].";";


            $result = mysqli_query($conn, $statement);
            $row = mysqli_fetch_array($result);
        
            $user = array();
            $user['first_name'] = $row['student_first_name'];
            $user['last_name'] = $row['student_last_name'];
            $user['email'] = $row['student_email'];

            echo json_encode($user);
        }

        // Isabelle (user profile) - checks the users table to ensure the inputted email and password match one in the users table
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

        // John Liu (user item/experience) and Justin Han (admin item/experience)
        else if($_GET['functionName'] == "getTutorClasses") 
        {
            $statement = "SELECT * FROM ExpandedClasses WHERE Tutor_ID=".$_GET['tutorID'].";";
            $result = mysqli_query($conn, $statement);

            $classes = array();

            // Add each class as an associative array to the classes array
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
                $class['tname'] = $row['User_First_Name']." ".$row['User_Last_Name'];

                array_push($classes, $class);
            }

            echo json_encode($classes);
        }
        
        // John Liu (user item/experience) and Justin Han (admin item/experience)
        else if($_GET['functionName'] == "getStudentClasses") 
        {
            // Grab all of the classes that the student is enrolled in along with the tutors name
            $statement = "SELECT 
            c.*,
            u2.User_First_Name,
            u2.User_Last_Name,
            u2.User_ID
            FROM 
            enrollments as e
            INNER JOIN users as u
            ON e.Student_ID = u.User_ID
            INNER JOIN classes as c
            ON e.Class_ID = c.Class_ID
            INNER JOIN users as u2
            ON c.Tutor_ID = u2.User_ID
            WHERE u.User_ID=" . $_GET['studentID'] . ";"; 
            
            $result = mysqli_query($conn, $statement);
            $classes = array();

            // Add each class as an associative array to the classes array
            while($row = mysqli_fetch_array($result))
            {   
                $class = array();
                
                $class['current_capacity'] = $row['Class_CurrentCapacity'];
                $class['max_capacity'] = $row['Class_MaxCapacity'];
                $class['name'] =$row['Class_Name'];
                $class['date'] = $row['Class_Date'];
                $class['duration'] = $row['Class_Duration'];
                $class['status'] = $row['Class_Status'];
                $class['tutor_fname'] = $row['User_First_Name'];
                $class['tutor_lname'] = $row['User_Last_Name'];
                $class['tutor_id'] = $row['User_ID'];
                $class['class_id'] = $row['Class_ID'];

                array_push($classes, $class);
            }

            echo json_encode($classes);
        }

        // Isabelle (user profile)
        else if($_GET['functionName'] == "getUser")
        {
            $statement = "SELECT * FROM users WHERE User_ID=".$_GET['id'].";"; 
            $result = mysqli_query($conn, $statement);
            $row = mysqli_fetch_array($result);

            $user = array();
            $user['id'] = $row['User_ID'];
            $user['first_name'] = $row['User_First_Name'];
            $user['last_name'] = $row['User_Last_Name'];
            $user['password'] = $row['User_Password'];
            $user['email'] = $row['User_Email'];

            echo json_encode($user);
        }

        // Justin Han (user schedule)
        else if($_GET['functionName'] == "getAllClasses")
        {
            $statement = "SELECT * FROM ExpandedClasses;"; 
            $result = mysqli_query($conn, $statement);

            $classes = array();

            // Add each class as an associative array to the classes array
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
                $class['tname'] = $row['User_First_Name']." ".$row['User_Last_Name'];

                array_push($classes, $class);
            }

            echo json_encode($classes);
        }

        // Isabelle (user profile)
        else if($_GET['functionName'] == "getTutorIDs")
        {
            $statement = "SELECT User_ID FROM users WHERE User_Role='t';";
            $result = mysqli_query($conn, $statement);

            $tutors = array();

            // Add each tutor's ID to the array
            while($row = mysqli_fetch_array($result))
            {
                array_push($tutors, $row['User_ID']);
            }

            echo json_encode($tutors);
        }

        // Isabelle (user profile)
        else if($_GET['functionName'] == "getStudentIDs")
        {
            $statement = "SELECT User_ID FROM users WHERE User_Role='s';";
            $result = mysqli_query($conn, $statement);

            $students = array();

            // Add each student's ID to the array
            while($row = mysqli_fetch_array($result))
            {
                array_push($students, $row['User_ID']);
            }

            echo json_encode($students);
        }
    }
    else
    {
        // All of us, look at specfics in code for comments
        if($_POST['functionName'] == "deleteUser")
        {
            $isStudent = $_POST['role'] == "s";

            if($isStudent)
            {
                // Isabelle (admin reviews)
                // Delete all the reviews that the student has made
                $statement = "DELETE FROM reviews WHERE Student_ID=".$_POST['id'].";";
                $result = mysqli_query($conn, $statement);
                
                // Vatsal (user schedule)
                // Find all of the classes that the student is enrolled in
                $statement = "SELECT * FROM enrollments WHERE Student_ID=".$_POST['id'].";";
                $result = mysqli_query($conn, $statement);
    
                // Vatsal (user schedule)
                // For each class that the student is enrolled in, decrement the current capacity
                while($row = mysqli_fetch_array($result))
                {
                    $statement = "UPDATE classes SET Class_CurrentCapacity=Class_CurrentCapacity-1 WHERE Class_ID=".$row['Class_ID'].";";
                    $result = mysqli_query($conn, $statement);
                }
                // Vatsal (user schedule)
                // Delete all of the enrollments that the student has
                $statement = "DELETE FROM enrollments WHERE Student_ID=".$_POST['id'].";";
                $result = mysqli_query($conn, $statement);

                // John (admin profile)
                // Delete the student
                $statement = "DELETE FROM users WHERE User_ID=".$_POST['id'].";";
                $result = mysqli_query($conn, $statement);
            }
            else
            {
                // Vatsal (admin schedule)
                // Grab all of the classes that the tutor is teaching
                $statement = "SELECT * FROM classes WHERE Tutor_ID=".$_POST['id'].";";
                $result = mysqli_query($conn, $statement);

                // Vatsal (admin schedule)
                // For each class that the tutor is teaching, delete all of the enrollments
                while($row = mysqli_fetch_array($result))
                {
                    $statement = "DELETE FROM enrollments WHERE Class_ID=".$row['Class_ID'].";";
                    $result = mysqli_query($conn, $statement);
                }

                //  Vatsal (admin schedule)
                // Delete all of the classes that the tutor is teaching
                $statement = "DELETE FROM classes WHERE Tutor_ID=".$_POST['id'].";";
                $result = mysqli_query($conn, $statement);

                // Isabelle (user profile) & John (admin profile)
                // Delete all reviews that the tutor has received
                $statement = "DELETE FROM reviews WHERE Tutor_ID=".$_POST['id'].";";
                $result = mysqli_query($conn, $statement);

                // Isabelle (user profile) & John (admin profile)
                // Delete the tutor
                $statement = "DELETE FROM users WHERE User_ID=".$_POST['id'].";";
                $result = mysqli_query($conn, $statement);
            }
        }

        // Isabelle (user profile) & John (admin profile)
        else if($_POST['functionName'] == "addUser") 
        {
            $statement = "INSERT INTO users (User_First_Name, User_Last_Name, User_Role, User_Email, User_Password) VALUES ('".$_POST['first_name']."', '".$_POST['last_name']."', '".$_POST['role']."', '".$_POST['email']."', '".$_POST['password']."');";
            $result = mysqli_query($conn, $statement);
        }

        // Isabelle (user profile) & John (admin profile)
        else if($_POST['functionName'] == "editUser")
        {
            $statement = "UPDATE users SET User_First_Name='".$_POST['first_name']."', User_Last_Name='".$_POST['last_name']."', User_Email='".$_POST['email']."', User_Password='".$_POST['password']."' WHERE User_ID=".$_POST['id'].";";
            $result = mysqli_query($conn, $statement);
        }

        // Isabelle (user profile) & John (admin profile)
        else if($_POST['functionName'] == "changeFirstName") 
        {
            $statement = "UPDATE users SET User_First_Name='".$_POST['first_name']."' WHERE User_ID=".$_POST['studentID'].";"; 
            $result = mysqli_query($conn, $statement);
        }

        // Isabelle (user profile) & John (admin profile)
        else if($_POST['functionName'] == "changeLastName") 
        {
            $statement = "UPDATE users SET User_Last_Name='".$_POST['last_name']."' WHERE User_ID=".$_POST['studentID'].";"; 
            $result = mysqli_query($conn, $statement);
        }

        // Isabelle (user profile) & John (admin profile)
        else if($_POST['functionName'] == "changeEmail") 
        {
            $statement = "UPDATE users SET User_Email='".$_POST['email']."' WHERE User_ID=".$_POST['studentID'].";"; 
            $result = mysqli_query($conn, $statement);
        }

        // Isabelle (user profile) & John (admin profile)
        else if($_POST['functionName'] == "changePassword") 
        {
            $statement = "UPDATE users SET User_Password='".$_POST['password']."' WHERE User_ID=".$_POST['studentID'].";"; 
            $result = mysqli_query($conn, $statement);
        }
    }

    CloseCon($conn);
?>