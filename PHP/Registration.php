<?php
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if ($_POST['role'] == "Student") {
        $role = "s";
    }
    else {
        $role = "t";
    }

    include_once './Credentials.php';

    $conn = OpenCon();
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
    echo "Registration successful";
?>