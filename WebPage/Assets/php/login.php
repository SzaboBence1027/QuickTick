<?php
session_start();
include_once("connection.php");

$username = $_POST['username'];
$email = ($_POST['email']);

// Fetch data from database
$sql   = "SELECT * FROM users WHERE username=:username and email=:email";
$query = $conn->prepare($sql);
$query->bindParam(':username', $username, PDO::PARAM_STR);
$query->bindParam(':password', $password, PDO::PARAM_STR);
$query->execute();
$result = $query->fetchAll(PDO::FETCH_OBJ);

if ($query->rowCount() > 0) {
	$_SESSION['username'] = $_POST['username'];
	echo 'true';
} else {
	echo 'false';
}
?>