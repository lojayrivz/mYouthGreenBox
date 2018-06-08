app.factory('LoginFactory',function($http){
	var factory = {};
		factory.validateUser = function($scope){
			return $http({
				method: 'POST',
				data: {
					'username': $scope.username,
					'password': $scope.password
				},
				url: 'api/user/validate.php'
			});
		}
		return factory;
});