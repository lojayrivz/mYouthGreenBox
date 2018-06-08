
app.controller('LoginController',function($scope,$cookies,$location,LoginFactory){
	$scope.validateUser = function(user){
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
				console.log(response.data.message);
			},function errorCallback(response){
				console.log(response);
			});
	}
});


