<?php

    include "db-connect.script.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $userID = $_POST['userID'];
    $carName = $_POST['carName'];
    $vehicleClass = $_POST['vehicleClass'];
    $engineSize = $_POST['engineSize'];
    $cylinders = $_POST['cylinders'];
    $transmission = $_POST['transmission'];
    $CO2Rating = $_POST['CO2Rating'];
    $fuelType = $_POST['fuelType'];

    $query = "
        INSERT INTO `cars`(`userID`,`carName`, `vehicleClass`, `engineSize`, `cylinders`, `transmission`, `CO2Rating`, `fuelType`) 
        VALUES ('$userID','$carName','$vehicleClass','$engineSize','$cylinders','$transmission','$CO2Rating','$fuelType')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";

?>