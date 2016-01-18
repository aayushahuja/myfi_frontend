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

  $scope.change = function() {
        alert($scope.share_router);
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
   .click(function() {
    // this function will get executed every time the #home element is clicked (or tab-spacebar changed)
    if($(this).is(":checked")) // "this" refers to the element that fired the event
    {
        alert('home is checked');
    }
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
    //var div = document.getElementById("map_canvas");
   // var map = plugin.google.maps.Map.getMap(div);
    //map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

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

   
.controller('availableWiFiCtrl', ['$scope','$http','Routers', function($scope, $http, Routers) {
$scope.$on('$ionicView.enter', function() {
/*
	var show_data = function(data){
		$scope.routers = data;
	};

   window.WifiWizard.getScanResults(function(scan_data) {	
        //this.a.demo=JSON.stringify(data);
       // document.write(JSON.stringify(data));
       // alert(JSON.stringify(data));
       var filtered_routers =[];
       var filter_routers = function(db_data){
          alert("scan_data: " + JSON.stringify(scan_data));
          for(var i=0; i < scan_data.length; i++){
              for(var j=0; j < db_data.length; j++){
                  if( scan_data[i].localeCompare(db_data[j]) == 0){
                    filter_routers.push(scan_data[i]);
                  };
              };
          };
       };

       Routers.get().success( function(db_data){
          alert("db_data : " + JSON.stringify(db_data));
          filter_routers(db_data);
       });

      alert("filtered_routers: " + JSON.stringify(filtered_routers));
      show_data(filter_routers);
        //alert($scope);
    }, function(err) {
        //$scope.demo=JSON.stringify(err);
    })

*/    
	});

});
 