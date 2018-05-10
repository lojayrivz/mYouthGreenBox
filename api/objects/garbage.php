<?php
	class Garbage{
		private $conn;
		private $table_name = "garbages";

		public $garbage_id;
		public $user_id;
		public $garbage_location;
		public $latitude;
		public $longitude;

		public function __construct($db){
			$this->conn = $db;
		}

		//create user

		function create(){
			$query = "INSERT INTO ".$this->table_name." SET user_id=:userid, garbage_location=:location,latitude=:latitude,longitude=:longitude";

			$stmt = $this->conn->prepare($query);

			$this->user_id = htmlspecialchars(strip_tags($this->user_id));
			$this->garbage_location = htmlspecialchars(strip_tags($this->garbage_location));
			$this->longitude = htmlspecialchars(strip_tags($this->longitude));
			$this->latitude = htmlspecialchars(strip_tags($this->latitude));

			$stmt->bindParam("userid",$this->user_id);
			$stmt->bindParam("location",$this->garbage_location);
			$stmt->bindParam("latitude",$this->latitude);
			$stmt->bindParam("longitude",$this->longitude);

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
	}