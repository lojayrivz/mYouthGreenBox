
(function(){
	'use strict';
	angular
		.module('app')
		.config(RoutesConfig);
		
	RoutesConfig.$inject  = ['$routeProvider', '$locationProvider'];

	function RoutesConfig($routeProvider, $locationProvider){
		$locationProvider.hashPrefix('');
		$routeProvider
			.when("/mapping",{
				templateUrl: 'src/components/mapping/mapping.html',
                controller: "MappingController",
                controllerAs: "MapVM"
			})
			.when("/login",{
				templateUrl: 'src/components/login/login.html',
                controller: "LoginController",
                controllerAs: "LoginVM"
			})
			.when("/registration",{
				templateUrl: 'src/components/registration/registration.html',
                controller: "RegistrationController",
                controllerAs: "RegisterVM"
			})
			.otherwise({ template: "<h1>Sample Otherwise</h1>" });
	}	
		

})();

