<?php
include_once('config.php');


//ON SELECT LES CLASS
$sql = $pdo->query("SELECT * FROM class");


//ON INITIALISE UN TABLEAU
$output = [];


//SI LA REQUETE A MARCHER ON FAIT UNE BOUCLE DANS LAQUELLE ON VA RENTRER TOUS LES ELEMENTS DANS OUTPUT
if ($sql) {
    foreach ($sql as $i) {
        $output[] = $i;
    }

    //SINON ON RETURN FALSE
} else {
    return false;
}


//ON ENCODE TOUT CA
echo json_encode($output);
