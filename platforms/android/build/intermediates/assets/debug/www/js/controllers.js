angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope) {
	//var a = function(){}
	//var a = $scope;
	//$scope.demo = "aayush";

})
   
.controller('signupCtrl', function($scope) {

})
   

.controller('addWiFiCtrl', ['$scope', 'Routers', function($scope, Routers) {
 	var set_ssid = function(data){
		//alert("hi " + JSON.stringify(data));
		$scope.ssid = data;
	};
	var set_bssid = function(data){
		//alert("hi " + JSON.stringify(data));
		$scope.bssid = data;
	};
	var set_network = function(data){
		//alert("hi " + JSON.stringify(data));
		$scope.network = data;
	};

  $scope.change = function(form) {
      //alert(JSON.stringify(form.val));
      
      //if( "true".localeCompare(String(form.val)) == 0){
      if(form.val == 'true'){  

        router = [{
                  "ssid"    :$scope.ssid,
                  "bssid"   :$scope.ssid,
                  "password":form.pass,
                  }];
        $scope.share_router_state = "router : " + JSON.stringify(router);

        Routers.create(router)

          // if successful creation, call our get function to get all the new todos
          .success(function(data) {
            alert('added');
            //$scope.loading = false;
            //$scope.formData = {}; // clear the form so our user is ready to enter another
            //$scope.todos = data; // assign our new list of todos
          });

      }
      else{
        $scope.share_router_state = 'none';//form.val:' + String(form.val) 'comparison :' + String(form.val).localeCompare('true');
      };  
  };

  window.WifiWizard.getCurrentSSID(function(data) {	
        //this.a.demo=JSON.stringify(data);
        //document.write(JSON.stringify(data));
        
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
    var latitude  = position.coords.latitude;
    var latLong   = new google.maps.LatLng(latitude, longitude);

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

}])

   
.controller('availableWiFiCtrl', ['$scope','$http','Routers', function($scope, $http, Routers) {
$scope.$on('$ionicView.enter', function() {

	var show_data = function(data,scan_data){
    document.write(JSON.stringify(data) + '\n\n' + JSON.stringify(scan_data));
    alert('data: ' + JSON.stringify(data));

		$scope.routers = data;
    for(var i=0; i < data.length; i++){
      alert(data[i].SSID);
    };
	};

   window.WifiWizard.getScanResults(function(scan_data) {	
        //this.a.demo=JSON.stringify(data);
       // document.write(JSON.stringify(data));
       // alert(JSON.stringify(data));
       var filtered_routers =[];
       var filter_routers = function(db_data){
          alert("scan_data: " + JSON.stringify(scan_data));
          for(var i=0; i < scan_data.length; i++){
              //alert(scan_data[i].SSID);
              var scan_ssid = '\"' + scan_data[i].SSID + '\"';
             // alert(scan_ssid);
              for(var j=0; j < db_data.length; j++){
                  var db_ssid = db_data[j].ssid;
                 // alert(db_ssid);

                  if( scan_ssid == db_ssid ){
                    //alert('here' + JSON.stringify(scan_data[i]));
                    filtered_routers.push(scan_data[i]);
                   // alert('here2');
                  };
              };
          };
       };

      Routers.get().success( function(db_data){
          //alert("db_data : " + JSON.stringify(db_data));
          filter_routers(db_data);
          //alert('filtered_routers : ' + JSON.stringify(filtered_routers));
          show_data_internal(filtered_routers);
       });

      var show_data_internal = function(data){
        alert('filtered_routers: ' + JSON.stringify(data) + ' \n typeof ' + typeof data );
        alert('filtered_routers[0]: ' + JSON.stringify(data[0]) + ' \n typeof ' + typeof data[0] );
        alert('filtered_routers[0].SSID: ' + data[0].SSID + ' \n typeof ' + typeof data[0].SSID );
        show_data(data,scan_data);
      };
      //alert("scanned_routers: " + JSON.stringify(scan_data)); 
      //alert("filtered_routers: " + JSON.stringify(filtered_routers));
      //show_data(filtered_routers);
        //alert($scope);
    }, function(err) {
        //$scope.demo=JSON.stringify(err);
    })

   
	});

}]);
 