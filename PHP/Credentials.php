<?php
    // open a connection to the database with the credentials
    function OpenCon()
    {
        $dbhost = "localhost";
        $dbuser = "root";
        $dbpass = "";
        $db = "project";
        $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);

        return $conn;
    }
    
    // close the connection to the database
    function CloseCon($conn)
    {
        $conn -> close();
    }
?>