<?php 
	$servername = "mysql1327.cp.hostnet.nl";
	$username = "u211941_berendh";
	$password = "StilleAap1";
	$dbname = "db211941_pushtest";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$geo = 'NL';
	$subObject = $_POST['subObject'];
	$endpoint = $_POST['endpoint'];
	$service = 'none';
	$navigator = 'none';

	$sql = "INSERT INTO subscribers (subObject, geo, service, navigator)
	VALUES ('$subObject','$geo', '$service', '$navigator')";

	$check = "SELECT subObject FROM subscribers WHERE subObject="+$subObject;
	$checkRes = $conn->query($check);

	if ($checkRes->num_rows==0){
		if ($conn->query($sql) === TRUE) {
		    echo "New record created successfully";
		} else {
		    echo "Error: " . $sql . "<br>" . $conn->error;
		}
	} else {
	    echo "user already exists";
	}

	$conn->close();

?>