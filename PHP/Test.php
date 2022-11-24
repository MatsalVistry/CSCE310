<?php
    $fname = $_GET['fname'];
    $lname = $_GET['lname'];
    $email = $_GET['email'];
    $password = $_GET['password'];

    // if ($_GET['role'] == "Student") {
    //     $role = "a";
    // }
    // else {
    //     $role = "b";
    // }

    include_once './Credentials.php';

    $conn = OpenCon();
    $statement = "SELECT * FROM Users WHERE User_ID=" . $_GET['studentID'] . ";";
    // $statement = "SELECT INTO Users
        // (`User_First_Name`, 
        // `User_Last_Name`, 
        // `User_Role`, 
        // `User_Email`, 
        // `User_Password`)
        // VALUES (
        // '{$fname}', 
        // '{$lname}',
        // '{$role}',
        // '{$email}',
        // '{$password}'
        // )";
    mysqli_query($conn, $statement);
    echo "Fetching User successful";
?>