<?php

    include "db-connect.script.php"; 

    $conn = OpenConnection();

    $userID = $_POST['userID'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        SELECT cars.id, cars.carName
        FROM `cars` WHERE cars.userID = '$userID'
    ";

    $result = mysqli_query($conn,$query);

    $cars = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($cars);

?>