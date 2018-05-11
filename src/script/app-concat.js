
var app = angular.module("app",["ngRoute","ngCookies","ngMaterial"]);


app.constant('DIR_PATH',{
	MAPPING: 'src/components/mapping/mapping.html',
	LOGIN: 'src/components/login/login.html'
});


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
			.when("/forgotpassword",{
				templateUrl: 'src/components/forgotPassword/forgotPassword.html',
				controller: "ForgotPasswordController",
				controllerAs: "ForgotPassVM"
			})
			.otherwise({ redirectTo: '/login' });
});


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
app.factory("MappingFactory",function($http){

});


app.controller("ForgotPasswordController",function(){
	var ForgotPassVM = this;
});


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




app.controller('MappingController',function($scope,$cookies,$location){
		if($cookies.get('email').length<=0){
			$location.path('/login');
		}

		var MapVM = this;
		
		MapVM.infoWindow  = new google.maps.InfoWindow;
		MapVM.inProgress  = true;
		MapVM.errorStatus = false;
		MapVM.position 	  = {lat: null,lng: null};
  		MapVM.map;
  		MapVM.recentPoint = {lat:null,lng:null};

		MapVM.initMap = function () {
	       	if(navigator.geolocation){
	       		navigator.geolocation.getCurrentPosition(currentPosition,currentPositionHandleError);
	       	}
	       	else{
	       		currentPositionHandleError();
	       	}
      	}


      	var currentPosition = function(position){
      		MapVM.map = new google.maps.Map(document.getElementById('map'), {
       			center: {lat: null,lng:null},
				zoom: 13
			});
			google.maps.event.addListener(MapVM.map,'click',MapVM.addMarker);
      		MapVM.position.lat = position.coords.latitude;
      		MapVM.position.lng = position.coords.longitude;
      		MapVM.infoWindow.setPosition(MapVM.position);
  			MapVM.infoWindow.setContent('Current Location');
  			MapVM.infoWindow.open(MapVM.map);
  			MapVM.map.setCenter(MapVM.position);
  			MapVM.inProgress = false;
      	}

      	var currentPositionHandleError = function(){
      		MapVM.errorStatus = true;
      		MapVM.inProgress  = false;
      	}
      	

      	MapVM.addMarker   = function(event){
      		var Latitude  = event.latLng.lat();
			var Longitude = event.latLng.lng();
			MapVM.recentPoint.lng = Longitude;
			MapVM.recentPoint.lat = Latitude;
			successMarker(Latitude,Longitude,'Success');
			console.log(MapVM.recentPoint);
      	}

      	var successMarker = function(Latitude,Longitude,contentString){
      		var marker = new google.maps.Marker({
				position:new google.maps.LatLng(Latitude,Longitude),
				map:MapVM.map,
				icon: 'images/ic-butt/binicon.ico'
			}); 
			var infowindow = new google.maps.InfoWindow({
				content:contentString
			});
			marker.addListener('click', function() {
				infowindow.open(MapVM.map,marker);
			});
      	}
});



app.controller("RegistrationController",function(){
	var RegisterVM = this;
});



app.controller("SignUpController",function(){
	var SignUpVM = this;
});


