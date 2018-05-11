<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate product object
include_once '../objects/garbage.php';
include_once '../objects/user.php';


$database = new Database();
$db = $database->getConnection();
 
$garbage = new Garbage($db);
$user = new User($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$user->username = $data->userid;
$garbage->user_id = $user->getUserID();
$garbage->longitude = $data->longitude;
$garbage->latitude = $data->latitude;

$result = $garbage->create();

if($result){
    echo '{';
        echo '"message": "Garbage bin was successfully registered."';
    echo '}';
}else{ 
    echo '{';
        echo '"message": "Unable to register garbage bin."';
    echo '}';
}

?>