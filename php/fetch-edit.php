<?php

include 'config.php';

$sid = $_GET['editId'];

$sql = $pdo->query("SELECT * FROM students WHERE id = $sid");

$output = [];

if ($sql) {
    foreach ($sql as $i) {
        $output['response'][] = $i;;
    }
}

$sql1 = $pdo->query("SELECT * FROM class");

if ($sql1) {
    foreach ($sql1 as $i) {
        $output['class'][] = $i;;
    }
}

echo json_encode($output);
