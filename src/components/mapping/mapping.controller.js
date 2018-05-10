
(function(){
	'use strict';
	angular
		.module('app')
		.controller('MappingController',MappingController);

	MappingController.$inject = ['$scope'];

	function MappingController($scope){
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


	}
})();

