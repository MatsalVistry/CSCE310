<?php
    //This is getting the user_id, IDK how to do that just yet, it is just a placeholder
    $user_id = $_GET["user_id"]
    include_once './Credentials.php';
    //open the connects to the database
    $conn = OpenCon();
    //This is going to be SQL statement to get the data from the users
    $statement = "SELECT * from enrollment WHERE Student_ID = (`Student_ID`) VALUES('{$user_id}')"
    //getting the result
    $result = mysqli_query($conn,$statement)
    //fetching the data as an array
    $output = mysqli_fetch_all($result, MYSQLI_ASSOC)
    //free the result from memory
    mysqli_free_result($result)
    close the connections
    mysqli_close($conn)
    //output the data
    print_r($output)

?>