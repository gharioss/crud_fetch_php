<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP & JavaScript Fetch CRUD</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>


    <!-- MAIN DIV -->
    <!-- WHAT YOU SEE WHEN U FIRST ENTER THE SITE -->

    <div id="main">
        <div id="header">
            <!-- TEXT + SEARCH BAR -->
            <h2>PHP & JavaScript Fetch CRUD</h2>
            <div id="search-bar">
                <label>Search :</label>
                <input type="text" id="search" onkeyup="load_search()" autocomplete="off">
            </div>
        </div>


        <div id="table-data">
            <!-- BUTTON AJOUTER UN NOUVEAU UTILISATEUR -->
            <h3>All Records</h3>
            <button class="add_new" onclick="addNewModel()">Add New</button>
            <table border="1" width="100%" cellspacing="0" cellpadding="10px">
                <thead>
                    <tr>
                        <!-- NOMS DES TABLES QUI S'AFFICHERONT -->
                        <th>Id</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>City</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="tbody"></tbody>
            </table>
        </div>
        <!-- LA OU LES MESSAGES D'ERREUR OU DE SUCCESS S'AFFICHERONT -->
        <div id="error-message"></div>
        <div id="success-message"></div>
    </div>






    <!-- DIV D'AJOUT D'UTILISATEURS -->
    <!-- FAIT POP UNE FENETRE SUR LAQUELLE L'ONT PEUT RENTRER SES IDENTIFIANTS -->

    <div id="addModal">
        <div id="modal-form">
            <h2>Add New User</h2>
            <!-- FORMULAIRE D'ENREGISTREMENTS DE DONNÉES -->
            <form method="POST" id="addModal-form">
                <table cellpadding="10px" width="100%" id="add-form">
                    <tr>
                        <td width='90px'>First Name</td>
                        <td><input type="text" id="fname"></td>
                    </tr>
                    <tr>
                        <td width='90px'>Last Name</td>
                        <td><input type="text" id="lname"></td>
                    </tr>
                    <tr>
                        <td width='90px'>Class</td>
                        <td>
                            <select id="classlist"></select>
                        </td>
                    </tr>
                    <tr>
                        <td width='90px'>City</td>
                        <td><input type="text" id="city"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button onclick="submit_data()" type="button" id="new-submit">Save</button></td>
                    </tr>
                </table>
            </form>
            <div onclick="hide_modal()" id="close-btn">X</div>
        </div>
    </div>




    <!-- DIV PERMETTANT DE MODIFIER UN UTILISATEUR -->
    <!-- FAIT POP LA DIV APRES AVOIR APPUYER SUR EDIT  -->

    <div id="modal">
        <div id="modal-form">
            <h2>Edit Form</h2>
            <form method="POST">
                <table cellpadding="10px" width="100%" id="edit-form">
                    <tr>
                        <td width='90px'>First Name</td>
                        <td><input type='text' id='edit-fname'>
                            <input type='text' id='edit-id' hidden>
                        </td>
                    </tr>
                    <tr>
                        <td width='90px'>Last Name</td>
                        <td><input type='text' id='edit-lname'></td>
                    </tr>
                    <tr>
                        <td width='90px'>Class</td>
                        <td>
                            <select id='edit-class'></select>
                        </td>
                    </tr>
                    <tr>
                        <td width='90px'>City</td>
                        <td><input type='text' id='edit-city'></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button onclick='modify_data()' type="button" id='edit-submit'>Save</button></td>
                    </tr>
                </table>
            </form>
            <div onclick="hide_modal()" id="close-btn">X</div>
        </div>
    </div>

    <script type="text/javascript" src="javascript/fetch.js"></script>
</body>

</html>