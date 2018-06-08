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
 
$database = new Database();
$db = $database->getConnection();
 
$garbage = new Garbage($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$garbage->user_id = $data->user_id;
$garbage->garbage_location = $data->garbage_location;
$garbage->longitude = $data->longitude;
$garbage->latitude = $data->latitude;
 
// create the product
if($garbage->create()){
    echo '{';
        echo '"message": "Garbage bin was successfully registered."';
    echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to register garbage bin."';
    echo '}';
}
?>