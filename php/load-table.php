<?php
include_once('config.php');

//ON SELECTIONNE TOUT DE STUDENTS DEPUIS LA BASE DE DONNÉE
$sql = $pdo->query("SELECT * FROM students LEFT JOIN class ON class.cid = students.class");

$output = [];


//SI LA REQUETE À MARCHER
if ($sql) {

    //POUR CHAQUE ELEMENTS ON  VA LES STOQUER DANS UN TABLEAU OUTPUT
    foreach ($sql as $i) {
        $output[] = $i;
    }
} else {

    //SI LA REQUETE N'A PAS FONCTIONNER ALORS ON DIT QUE OUTPUT AURA LA VALEUR DE EMPTY
    $output['empty'] = ['empty'];
}


//ON ENCODE TOUT CA POUR L'ENVOYER AU JAVASCRIPT
echo json_encode($output);
