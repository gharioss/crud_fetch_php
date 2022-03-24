<?php
include 'config.php';


//ON GET THE CONTENT EN JSON ET ON LE DECODE
$input = file_get_contents('php://input');
$decode = json_decode($input, true);


//ON RECUPERE LES DONNEES
$firstName = $decode["fname"];
$lastName = $decode["lname"];
$class = $decode["class"];
$city = $decode["city"];



//ON LINSERT INTO
$sql = $pdo->query("INSERT INTO students(first_name, last_name,class, city) VALUES ('{$firstName}',
'{$lastName}','{$class}','{$city}')");



//SI LA REQUETE A MARCHER ON RENVOIE SUCCESS SINON FAILED
if ($sql) {
	echo json_encode(array('insert' => 'success'));
} else {
	echo json_encode(array('insert' => 'failed'));
}
