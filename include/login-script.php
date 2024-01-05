<?php

session_start();

include "db-connect.script.php"; 

$conn = OpenConnection();

$username = $_POST['username'];
$password = $_POST['password'];

$query = " 
    SELECT id, username
    FROM users
    WHERE (username = '$username' OR email = '$username') && password = '$password'
";

$result = mysqli_query($conn,$query);
$row = mysqli_fetch_array($result);

CloseConnection($conn);

if(mysqli_num_rows($result) == 1){ //sizeof row

    $_SESSION['id'] = $row[0];
    $_SESSION['username'] = $row[1];

    echo $row[0];

}
else {
    echo "shoot";
}

?>
