app.factory('MappingFactory',function($http){
	var factory = {};
	factory.registerBin = function($scope){
		return $http({
			method: 'POST',
			data: {
				'userid': $scope.ownerid,
				'latitude': $scope.latitude,
				'longitude': $scope.longitude
			},
			url: 'api/garbages/register.php',
		});
	};

	factory.viewAllBins = function(){
        return $http({
            method: 'GET',
            url: 'api/garbages/read.php'
        });		
	}

	return factory;
});

