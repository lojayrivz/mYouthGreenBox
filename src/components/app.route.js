
app.config(function($routeProvider,$locationProvider){
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
			.when("/signup",{
				templateUrl: 'src/components/signup/signup.html',
				controller: "SignUpController",
                controllerAs: "SignUpVM"
			})
			.otherwise({ redirectTo: '/login' });
});
