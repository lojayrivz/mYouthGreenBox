<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// include database and object files
include_once '../config/database.php';
include_once '../objects/garbage.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$garbage = new Garbage($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

$garbage->latitude = $data->latitude;
$garbage->longitude = $garbage->longitude;

$result = $garbage->retrieveGarbageInfo();

if(is_null($result)){
		echo "{";
			echo '"message": "Garbage Information not found."';
		echo "}";
}else{
		echo json_encode($result);
}

?>