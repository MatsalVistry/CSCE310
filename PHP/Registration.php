<?php
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if ($_POST['role'] == "Student") {
        $role = "a";
    }
    else {
        $role = "b";
    }

    include_once './Credentials.php';

    $conn = OpenCon();
    $statement = "INSERT INTO Users
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