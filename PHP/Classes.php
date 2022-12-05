<?php
    include_once './Credentials.php';

    $conn = OpenCon();

    // Determine whether the request was a get or post
    $is_get = $_SERVER['REQUEST_METHOD'] == 'GET';
    $is_post = $_SERVER['REQUEST_METHOD'] == 'POST';

    if($is_post)
    {
        if($_POST['functionName'] == "submitClass")
        {
            $statement = 
                "INSERT INTO classes (Tutor_ID, Class_MaxCapacity, Class_CurrentCapacity, Class_Name, Class_Date, Class_Duration, Class_Status) 
                VALUES (".$_POST['tutorID'].", ".$_POST['maxCapacity'].", ".$_POST['currentCapacity'].", '".$_POST['name']."', '".$_POST['date']."', '".$_POST['duration']."', '".$_POST['status']."');";

            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "deleteClass")
        {
            // delete all enrollments for a specific class
            $statement = "DELETE FROM enrollments WHERE Class_ID = ".$_POST['classID'].";";
            $result = mysqli_query($conn, $statement);
            
            // delete the class itself
            $statement = "DELETE FROM classes WHERE Class_ID=".$_POST['classID'].";";
            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "editClass")
        {
            $statement = "UPDATE classes SET Class_MaxCapacity=".$_POST['maxCapacity'].", Class_Name='".$_POST['name']."', Class_Date='".$_POST['date']."', Class_Duration='".$_POST['duration']."' WHERE Class_ID=".$_POST['classID'].";";
            $result = mysqli_query($conn, $statement);
        }    
        else if($_POST['functionName'] == "editClassAdmin")
        {
            $statement = "UPDATE classes SET Tutor_ID=".$_POST['tutorID'].", Class_MaxCapacity=".$_POST['maxCapacity'].", Class_Name='".$_POST['name']."', Class_Date='".$_POST['date']."', Class_Duration='".$_POST['duration']."' WHERE Class_ID=".$_POST['classID'].";";
            $result = mysqli_query($conn, $statement);
        }    
        else if($_POST['functionName'] == "enrollInClass")
        {
            // insert into the enrollments table
            $statement = "INSERT INTO enrollments (Student_ID, Class_ID) VALUES (".$_POST['studentID'].", ".$_POST['classID'].");";
            $result = mysqli_query($conn, $statement);

            // update the capacity for a class by incrementing it
            $statement = "UPDATE classes SET Class_CurrentCapacity=Class_CurrentCapacity+1 WHERE Class_ID=".$_POST['classID'].";";
            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "unenrollFromClass")
        {
            // first delete from the enrollments table
            $statement = "DELETE FROM enrollments WHERE Student_ID=".$_POST['studentID']." AND Class_ID=".$_POST['classID'].";";
            $result = mysqli_query($conn, $statement);

            // update the capacity for a class by decrementing it
            $statement = "UPDATE classes SET Class_CurrentCapacity=Class_CurrentCapacity-1 WHERE Class_ID=".$_POST['classID'].";";
            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "finishClass")
        {
            $statement = "UPDATE classes SET Class_Status='C' WHERE Class_ID=".$_POST['classID'].";";
            $result = mysqli_query($conn, $statement);
        }
        else if($_POST['functionName'] == "enrollStudent")
        {
            // Check if class is full
            $statement = "SELECT Class_CurrentCapacity, Class_MaxCapacity FROM classes WHERE Class_ID=".$_POST['cid'].";";
            $result = mysqli_query($conn, $statement);
            $row = mysqli_fetch_assoc($result);
            if($row['Class_CurrentCapacity'] >= $row['Class_MaxCapacity'])
            {
                echo "Class is full";
                return;
            }

            // Check if the student is already enrolled in the class, if not, enroll them
            $statement = "SELECT * FROM enrollments WHERE Student_ID=".$_POST['sid']." AND Class_ID=".$_POST['cid'].";";
            $result = mysqli_query($conn, $statement);
            $row = mysqli_fetch_assoc($result);

            if($row == null)
            {
                // insert into the enrollments table
                $statement = "INSERT INTO enrollments (Student_ID, Class_ID) VALUES (".$_POST['sid'].", ".$_POST['cid'].");";
                $result = mysqli_query($conn, $statement);

                // update the capacity for a class by incrementing it
                $statement = "UPDATE classes SET Class_CurrentCapacity=Class_CurrentCapacity+1 WHERE Class_ID=".$_POST['cid'].";";
                $result = mysqli_query($conn, $statement);
            }
            else
            {
                echo "Student is already enrolled in this class.";
                return;
            }
        }
        else if($_POST['functionName'] == "unenrollStudent")
        {
            // Delete the enrollment and grab how many rows were affected
            $statement = "DELETE FROM enrollments WHERE Student_ID=".$_POST['sid']." AND Class_ID=".$_POST['cid'].";";
            $result = mysqli_query($conn, $statement);
            $rowsAffected = mysqli_affected_rows($conn);

            // If the enrollment was deleted, decrement the class's current capacity, otherwise it means the student was not enrolled in the class
            if($rowsAffected > 0)
            {
                $statement = "UPDATE classes SET Class_CurrentCapacity=Class_CurrentCapacity-1 WHERE Class_ID=".$_POST['cid'].";";
                $result = mysqli_query($conn, $statement);
            }
            else
            {
                echo "Student is not enrolled in this class.";
                return;
            }
        }
    }
    else
    {
        if($_GET['functionName'] == "getAllClasses")
        {
            $statement = "SELECT * FROM ExpandedClasses;";
            $result = mysqli_query($conn, $statement);

            $classes = array();

            // Add each class as an associative array to the classes array
            while($row = mysqli_fetch_assoc($result))
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
                $class['tutor_name'] = $row['User_First_Name']." ".$row['User_Last_Name'];

                array_push($classes, $class);
            }

            echo json_encode($classes);
        }
        if($_GET['functionName'] == "getCurrentStudentClasses")
        {
            $statement = "SELECT Class_ID FROM classes WHERE Class_ID IN (SELECT Class_ID FROM enrollments WHERE Student_ID=".$_GET['studentID'].");";
            $result = mysqli_query($conn, $statement);

            $classes = array();

            // Add each class id to the array
            while($row = mysqli_fetch_assoc($result))
            {
                array_push($classes, $row['Class_ID']);
            }

            echo json_encode($classes);
        }    
        if($_GET['functionName'] == "getClassIDs")
        {
            $statement = "SELECT Class_ID FROM classes;";
            $result = mysqli_query($conn, $statement);

            $classes = array();

            // Add each class id to the array
            while($row = mysqli_fetch_assoc($result))
            {
                array_push($classes, $row['Class_ID']);
            }

            echo json_encode($classes);
        }    
    }


    CloseCon($conn);
?>