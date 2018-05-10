<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$user = new User($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

if(!isset($data->username) || !isset($data->password)){
		echo "{";
			echo '"message": "Input missing fields."';
		echo "}";
}else{
	$user->username = $data->username;
	$user->password = $data->password;
	if($user->username == "" || $user->password == ""){
		echo "{";
			echo '"message": "Input missing fields."';
		echo "}";
	}else if($user->validate()){
		echo "{";
			echo '"message": "Successfully logged in."';
		echo "}";
	}else{
		echo "{";
			echo '"message": "Invalid Credentials."';
		echo "}";
	}
}

?>