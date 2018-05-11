<?php
	class Garbage{
		private $conn;
		private $table_name = "garbages";

		public $userid;
		public $latitude;
		public $longitude;

		public function __construct($db){
			$this->conn = $db;
		}

		//create garbage

	function create(){
		$query = "INSERT INTO ".$this->table_name."(user_id,latitude,longitude) VALUES (?,?,?)";

		$stmt = $this->conn->prepare($query);

		$stmt->bindParam('1',$this->user_id);
		$stmt->bindParam('2',$this->latitude);
		$stmt->bindParam('3',$this->longitude);

		if($stmt->execute()){
			return true;
		}else return false;
	}

		//retrieve information from location

		function retrieveGarbageInfo(){
			$query = "SELECT g FROM ".$this->table_name." g WHERE g.latitude = ? AND longitude = ? LIMIT 0,1";

			$stmt = $this->conn->prepare($query);

			$stmt->bindParam(1,$this->latitude);
			$stmt->bindParam(2,$this->longitude);

			$stmt->execute();

			$row = $stmt->fetch(PDO::FETCH_ASSOC);
			return $row;
		}
	
	function read(){

	    // select all query
	    $query = "SELECT * FROM " . $this->table_name;
	 
	    // prepare query statement
	    $stmt = $this->conn->prepare($query);
	 
	    // execute query
	    $stmt->execute();
	 
	    return $stmt;
	}
}

