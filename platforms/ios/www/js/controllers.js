angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope) {
	//var a = function(){}
	//var a = $scope;
	//$scope.demo = "aayush";

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('addWiFiCtrl', function($scope) {


 	var set_ssid = function(data){

		//alert("hi " + JSON.stringify(data));
		$scope.ssid = data;
	};

	var set_bssid = function(data){

		//alert("hi " + JSON.stringify(data));
		$scope.bssid = data;
	};
	var set_network = function(data){

		alert("hi " + JSON.stringify(data));
		$scope.network = data;
	};

   window.WifiWizard.getCurrentSSID(function(data) {	
        //this.a.demo=JSON.stringify(data);
        //document.write(JSON.stringify(data));
        //alert(JSON.stringify(data));
        set_ssid(data);
        //alert($scope);
    }, function(err) {
        //$scope.demo=JSON.stringify(err);
    }); 

   // onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');

    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latLong = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
        center: latLong,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var div = document.getElementById("map_canvas");
    var map = plugin.google.maps.Map.getMap(div);
    map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
    
    //alert(map);
    var marker = new google.maps.Marker({
          position: latLong,
          map: map,
          title: 'my location'
      });
};

function onMapReady() {
      var button = document.getElementById("button");
      button.addEventListener("click", onBtnClicked, false);
    }

    function onBtnClicked() {
      map.showDialog();
    }

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);
//window.geolocation.getCurrentPosition(onSuccess, onError);
/*
   window.WifiWizard.getCurrentNetwork(function(data) {	
        //this.a.demo=JSON.stringify(data);
        //document.write(JSON.stringify(data));
        //alert(JSON.stringify(data));
        alert(data);
        set_network(data);
        //alert($scope);
    }, function(err) {
        //$scope.demo=JSON.stringify(err);
    });
   */

})
   
.controller('availableWiFiCtrl', function($scope) {
$scope.$on('$ionicView.enter', function() {

	  var a124 = function(data){

		//alert("hi " + JSON.stringify(data));
		$scope.routers = data;
	};

	angular.element(document).ready(function () {

	
	var a123 = function(data){

		a124(data);
	};

   window.WifiWizard.getScanResults(function(data) {	
        //this.a.demo=JSON.stringify(data);
       // document.write(JSON.stringify(data));
       // alert(JSON.stringify(data));
        a123(data);
        //alert($scope);
    }, function(err) {
        //$scope.demo=JSON.stringify(err);
    })

    });
	});

});
 