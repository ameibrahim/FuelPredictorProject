<?php

    include "db-connect.script.php"; 

    $conn = OpenConnection();

    $carID = $_POST['carID'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        SELECT *
        FROM `cars` WHERE cars.id = '$carID'
    ";

    $result = mysqli_query($conn,$query);

    $details = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($details);

?>