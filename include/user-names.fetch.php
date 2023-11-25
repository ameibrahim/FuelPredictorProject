<?php

    include "trackhr-db-connect.script.php"; 
    
    $conn = OpenConnection();

    $givenInput = $_POST['givenInput'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        SELECT user_id, firstname, lastname from users 
        WHERE username REGEXP '$givenInput' OR firstname REGEXP '$givenInput' OR lastname REGEXP '$givenInput'
        ORDER BY firstname ASC
        LIMIT 3
    ";

    $result = mysqli_query($conn,$query);

    $users = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($users);

?>