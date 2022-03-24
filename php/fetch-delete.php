<?php

include 'config.php';

$sid = $_GET['delId'];

$sql = $pdo->query("DELETE FROM students WHERE id={$sid}");

if ($sql) {
    echo json_encode(array('delete' => 'success'));
} else {
    echo json_encode(array('delete' => 'failed'));
}
