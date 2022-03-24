function loadTable(){


    //FETCH DATA FROM LOAD-TABLE FILE
    fetch("http://localhost:3000/php/load-table.php")


    //SAY WE GONNA GET JSON RESPONSE
    .then(response => response.json())
    .then(data => {
        var tbody = document.getElementById('tbody');


        //INITIALISER LE MESSAGE SI LA BASE DE DONNÉE EST VIDE
        if(data['empty']){
            tbody.innerHTML = '<tr><td colspan="6" align="center"><h3>No Record Found.</3></td></tr>'
        }else{


            //SINON POUR CHAQUE DATA ON VA CREER UN TR DANS LEQUEL LON VA METTRE :
            //id, nom, prenom, class, city, le button edit et delete pour CHAQUE id
            var tr = '';
            for(var i in data){
                tr += `<tr>
                    <td align="center">${data[i].id}</td>
                    <td>${data[i].first_name} ${data[i].last_name}</td>
                    <td>${data[i].class_name}</td>
                    <td>${data[i].city}</td>
                    <td align="center"><button class="edit-btn" onclick="editRecord(${data[i].id})">Edit</button></td>
		            <td align="center"><button class="delete-btn" onclick="deleteRecord(${data[i].id})">Delete</button></td>
                <tr>
                `
            }


            //ON MET LE TR DANS LE TBODY
            tbody.innerHTML = tr;
        }
    })

    //ON RECUP L'ERREUR SI IL Y EN A
    .catch(error => {
        show_message('error', "can't fetch data");
    })
}


//ON LANCE LA FONCTION POUR QU'ELLE SOIT LANCÉE INITIALEMENT
loadTable()




//ON CREER LA FONCTION POUR AJOUTER UN NOUVEAU UTILISATEUR
function addNewModel(){
    var addModal = document.getElementById("addModal");
	addModal.style.display = 'block';


    //FETCH DATA FROM FETCH CLASS FIELD FILE
    fetch("http://localhost:3000/php/fetch-class-field.php")


    //SAY WE GONNA GET JSON RESPONSE
    .then(response => response.json())
    .then(data => {
        var select = document.getElementById('classlist');
        var option = '<option value="0" disabled selected>Select Class</option>';


        //FOREACH DATA WE GOT, WE ADD AN OPTION WITH THE ID AND THE CLASS_NAME
			for(var i=0; i < data.length; i++){
				option += `<option value="${data[i].cid}">${data[i].class_name}</option>`;
			}


            //WE ADD DAT THE THE SELECT ID
			select.innerHTML = option;
    })


    //CATCHING ERRORS
    .catch(error => {
        show_message('error',"Can't fetch class list")
    })
}


//EACH TIME WE CLICK ON A BUTTON CONTENING THIS FUNCTION, IT WILL DISPLAY THE WHOLE BLOCK ID ON NONE 
//SO THAT WE CAN GO BACK TO OUR USERS SELECTED FIELD
function hide_modal(){

    //HERE THE ADDMODAL 
	var addModal = document.getElementById("addModal");
	addModal.style.display = 'none';


    //HERE ON THE EDITMODAL
	var editModal = document.getElementById("modal");
	editModal.style.display = 'none';
}




//ADD USERS
function submit_data(){


    //ON RECUPERE LA VALUE DE TOUS LES ELEMENTS
    var fname = document.getElementById('fname').value;
	var lname = document.getElementById('lname').value;
	var sClass = document.getElementById('classlist').value;
	var city = document.getElementById('city').value;



    //SI ILS SONT VIDE ON FAIT UNE ALERT 
    if(fname === '' || lname === '' || sClass === '0' || city === ''){
		alert('Please fill all fields');
		return false;
	}else{

        //SINON ON MET TOUS LES ELEMENTS DANS UN OBJET
        var formdata = {
			'fname' : fname,
			'lname' : lname,
			'class' : sClass,
			'city' : city
        }


        //ON STRINGIFY LE TOUT
        jsondata = JSON.stringify(formdata);

        debugger
        fetch("http://localhost:3000/php/fetch-insert.php", {
            method : 'POST',
			body : jsondata,
			headers: {
				'Content-type' : 'application/json',
			}
        })
        .then(response => response.json())
        .then(data => {
            
            //SI DATA EST SUCCESS
            if(data.insert == 'success'){
                console.log(data)

                //ON SHOW LE MESSAGE DE SUCCESS
                show_message('success','Data Inserted Successfully.');

                //ON UTILISE LA FONCTION POUR TOUT REAFFICHER
                loadTable();

                //ET ON CACHE LA PAGE
                hide_modal();
                document.getElementById('addModal-form').reset();
            }else{

                //SINON MESSAGE DERREUR
                show_message('error',"Data Can't Inserted.");

                //ET ON CACHE LA PAGE
                hide_modal();
            }
        })
        .catch((error) => {
			show_message('error',"Data not Inserted.");
		});
    }






}




//FUNCTION POUR EDIT
//L'ON UTILISE CETTE FONCTION POUR METTRE LA BONNE CLASSE SELON LA PERSONNE SUR LAQULELE L'ON VEUT EDIT
//SI LA CLASS DE "JULIE" = B.COM ALORS QUAND ON CLICK SUR EDIT, LE SELECTED SERA SUR B.COM
function editRecord(id){
    var editModal = document.getElementById("modal");
	editModal.style.display = 'block';

    fetch('php/fetch-edit.php?editId=' + id)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var option = '';
        for(var i in data['response']){


            //ON RECUP LES VALEURS DU NOM PRENOM ETC ET ON LES METS SUR LES ID EDIT DU HTML
            document.getElementById('edit-id').value = data['response'][i].id;
			document.getElementById('edit-fname').value = data['response'][i].first_name;
			document.getElementById('edit-lname').value = data['response'][i].last_name;
			document.getElementById('edit-city').value = data['response'][i].city;


            //ON FAIT UNE BOUCLE SUR LES DATA CLASS
            var selected = '';
            for(var j in data['class']){

                //SI L'ID DU DATA CLASS == A L'ID DE LA CLASS DE L'UTILISATEUR
                if(data['class'][j].cid === data['response'][i].class) {

                    //ON MET SELECETD DANS LA VARIABLE
                    selected = 'selected';
                }else{
                    selected = '';
                }

                //ET ICI ON MET SELECTED PR QUE CE SOIT CHOISI DE BASE
                option += `<option ${selected} value="${data['class'][j].cid}">${data['class'][j].class_name}</option>`;
            }

            //ON AJOUTE CA DANS LE BODY
            document.getElementById('edit-class').innerHTML = option;
        }
    })
    .catch(error => {
        show_message('error', "Can't fetch data")
    })
}


//FUNCTION EDIT
function modify_data(){


    //ON RECUP LES DATA DES DONNES EDITS QUON A STOCKER AVANT
    var id = document.getElementById('edit-id').value;
	var fname = document.getElementById('edit-fname').value;
	var lname = document.getElementById('edit-lname').value;
	var sClass = document.getElementById('edit-class').value;
	var city = document.getElementById('edit-city').value;



    //SI IL Y A UNE DONNEE QUI N'A PAS ÉTÉ REMPLI ALORS ON MET UNE ALERTE
    if(fname === '' || lname === '' || sClass === '0' || city === ''){
		alert('Please Fill All The Fields');
		return false;
	}else{

        //SINON ON MET TOUTES LES DONNÉES DANS UNE VARIABLE
		var formdata = {
			's_id' : id,
			'fname' : fname,
			'lname' : lname,
			'class' : sClass,
			'city' : city
		}


        //QU'ON STRINGIFY
		jsondata = JSON.stringify(formdata);

        fetch('php/fetch-update.php', {
            method: "PUT",
            body : jsondata,
			headers: {
				'Content-type' : 'application/json',
			}
        })
        .then((response) => response.json())
		.then((result)=>{

            //SI LE RESULT DE LA REQUETE EST SUCCESS
				if(result.update == 'success'){

                    //ALORS ON MET UN MSG DE SUCCESS
					show_message('success','Data Updated Successfully.');

                    //ON REMET LA PAGE D'UTILISATEURS
					loadTable();

                    //ET ON CACHE LA PAGE
					hide_modal();
				}else{

                    //SI LE RESULT N'EST PAS SUCESS ON MET UN MSG D'ERREUR ET ON CACHE LA PAGE
					show_message('error',"Data Can't Updated.");
					hide_modal();
				}
		})
		.catch((error) => {
			show_message('error',"Data Can't Updated : Server Problem.");
		});
    }
}



//FUNCTION DE DELETE
function deleteRecord(id){


    //SI ON APPUIE SUR LA CONFIRMATION
	if(confirm("Are you sure want to Delete this record ?")){
		fetch('php/fetch-delete.php?delId=' + id,{
			method : 'DELETE'
		})
		.then(response => response.json())
		.then(result=>{

            //SI LE RESULT DE LA REQUETE EST SUCCESS
				if(result.delete == 'success'){

                    //ON MET MSG ET ON REMET LA PAGE D'UTILISATEURS
					show_message('success','Deleted Successfully.');
					loadTable();
				}else{

                    //SINON MESSAGE D'ERREUR
					show_message('error',"Can't Delete Data.");
				}
		})
		.catch((error) => {
			show_message('error',"Data not Deleted.");
		});
	}
}



//FUNCTION DE RECHERCHE
function load_search(){
	var search = document.getElementById('search').value;

    //SI LA RECHERCHE EST NULLE 
	if(search === ''){

        //ON REMET LA PAGE UTILISATEURS
		loadTable();
		return false;
	}else{
	fetch('php/fetch-search.php?search=' + search)
	.then((response) => response.json())
	.then((data)=>{
		var tbody = document.getElementById('tbody');

        //SI DATA EST EMPTY ON MET NO RECORD FOUND
		if(data['empty']){
			tbody.innerHTML = '<tr><td colspan="6" align="center"><h3>No Record Found.</h3></td></tr>'
		}else{
			var tr = '';
			for(var i in data){


                //SINN ON REMET LA PAGE D'UTILISATEUR MAIS SEULEMENT DES DONNÉES RECUP DE LA RECHERCHE
				tr += `<tr>
		            <td align="center">${data[i].id}</td>
		            <td>${data[i].first_name} ${data[i].last_name}</td>
		            <td>${data[i].class_name}</td>
		            <td>${data[i].city}</td>
		            <td align="center"><button class="edit-btn" onclick="editRecord(${data[i].id})">Edit</button></td>
		            <td align="center"><button class="delete-btn" onclick="deleteRecord(${data[i].id})">Delete</button></td>
		          </tr>`;
			}
			tbody.innerHTML = tr;
		}
	})
	.catch((error) => {
        console.log(error)
		show_message('error',"Can't Fetch Data");
	});
	}
}


//show error / success message
function show_message(type,text){
	if(type=='error'){
		var message_box = document.getElementById('error-message');
	}else{
		var message_box = document.getElementById('success-message');	
	}
	message_box.innerHTML = text;
	message_box.style.display = "block";
	setTimeout(function(){
		message_box.style.display = "none";
	},3000);
}
