<?php
    include_once './Credentials.php';

    $conn = OpenCon();

    // Determine whether the request was a get or post
    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';

    if($is_post)
    {
        // Isabelle (User Profile)
        if($_POST['functionName'] == "register")
        {
            $fname = $_POST['fname'];
            $lname = $_POST['lname'];
            $email = $_POST['email'];
            $password = $_POST['password'];
        
            $role = $_POST['role'];
                
            $statement = "INSERT INTO users
                (`User_First_Name`, 
                `User_Last_Name`, 
                `User_Role`, 
                `User_Email`, 
                `User_Password`)
                VALUES (
                '{$fname}', 
                '{$lname}',
                '{$role}',
                '{$email}',
                '{$password}'
                )";
            mysqli_query($conn, $statement);
        }
    }

    CloseCon($conn);
?>