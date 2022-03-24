<?php

include 'config.php';

$search = $_GET['search'];

$sql = $pdo->query("SELECT students.id,students.first_name,students.last_name,
students.city,class.class_name 
FROM students LEFT JOIN class ON class.cid = students.class 
WHERE concat(first_name,last_name) LIKE '%{$search}%'");
$output = [];

if ($sql) {
    foreach ($sql as $i) {
        $output[] = $i;
    }
} else {
    $output['empty'] = ['empty'];
}

echo json_encode($output);
