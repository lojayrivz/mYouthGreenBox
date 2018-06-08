<?php
	class User{
		private $conn;
		private $table_name = "users";

		public $user_id;
		public $username;
		public $password;

		public function __construct($db){
			$this->conn = $db;
		}

		//create user

		function create(){
			$query = "INSERT INTO ".$this->table_name." SET username=:username, password=:password";

			$stmt = $this->conn->prepare($query);

			$this->username = htmlspecialchars(strip_tags($this->username));
			$this->password = htmlspecialchars(strip_tags($this->password));

			$stmt->bindParam("username",$this->username);
			$stmt->bindParam("password",$this->password);

			if($stmt->execute()){
				return true;
			}else return false;
		}

		//validate user

		function validate(){
			$query = "SELECT u.password FROM ".$this->table_name." u WHERE u.username = ? LIMIT 0,1";

			$stmt = $this->conn->prepare($query);

			$stmt->bindParam(1,$this->username);

			$stmt->execute();

			$row = $stmt->fetch(PDO::FETCH_ASSOC);

			if($this->password==$row['password']) return true;
			else return false;
		}

	}