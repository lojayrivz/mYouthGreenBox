
app.controller('LoginController',function($scope,$cookies,$location,LoginFactory){
	$scope.LoginProgress    = false;
	$scope.responseStatus   = true;
	$scope.dataResponse     = '';
	$scope.validateUser = function(user){
			$scope.LoginProgress = true;
			if(user!=null){
				$scope.username = user.username;
				$scope.password = user.password;
			}else{
				$scope.username = "";
				$scope.password = "";
			}
			LoginFactory.validateUser($scope).then(function successCallback(response){
				if(response.data.message=="Successfully logged in."){
					$location.path("/mapping");
				}else{
					$scope.username = "";
					$scope.password = "";
				}
				$cookies.put("email",$scope.username);
				$cookies.put("password",$scope.password);
				$scope.LoginProgress    = false;
				$scope.dataResponse     = response.data.message;
			},function errorCallback(response){
				$scope.LoginProgress    = false;
				//console.log(response);
			});
	}
});


