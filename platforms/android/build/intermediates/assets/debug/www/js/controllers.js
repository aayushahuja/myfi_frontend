angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope) {
	//var a = function(){}
	//var a = $scope;
	//$scope.demo = "aayush";

})
   
.controller('signupCtrl', function($scope) {

})
.controller('account', function($scope) {

})   

.controller('addWiFiCtrl', ['$scope', 'Routers', function($scope, Routers) {
  
  //
  $scope.$on('$ionicView.enter', function() {

    
 	var set_ssid = function(val,ssid){
		//alert("hi " + JSON.stringify(data));
    //alert('val:' + val + ' typeof ' + typeof val);
    //alert('ssid:' + ssid);
    
		$scope.ssid = ssid.replace(/^"(.*)"$/, '$1');
    $scope.ssid_copy = ssid.replace(/^"(.*)"$/, '$1');
    if( val == true ){
      //alert('checbox value : ' + $scope.form.val);
      $scope.form.val=val;
      //alert('set');
    };

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
                  "ssid"    : '\"' + $scope.ssid + '\"',
                  "bssid"   : '\"' + $scope.ssid + '\"',
                  "password":form.pass,
                  }];
        $scope.share_router_state = "router : " + JSON.stringify(router);

        var check_router_registered = function(db_data){
          //alert("scan_data: " + JSON.stringify(scan_data));

              for(var j=0; j < db_data.length; j++){
                  var db_ssid = db_data[j].ssid;
                 // alert(db_ssid);

                  if( '\"' + $scope.ssid + '\"' == db_ssid ){
                    //alert('here' + JSON.stringify(scan_data[i]));
                    //alert('present');
                    return 'true';
                    //filtered_routers.scan.push(scan_data[i]);
                    //filtered_routers.db.push(db_data[j]);
                   // alert('here2');
                  };
              };
              return 'false';
        
        };

        Routers.get().success( function(db_data){
          //alert("db_data : " + JSON.stringify(db_data));
          var val = check_router_registered(db_data);
          //alert('filtered_routers : ' + JSON.stringify(filtered_routers));

          show_data_internal(val);
        });
        var show_data_internal = function(val){
          if(val == 'false'){
            Routers.create(router)

            // if successful creation, call our get function to get all the new todos
            .success(function(data) {
              alert('Sharing started !');
              //$scope.loading = false;
              //$scope.formData = {}; // clear the form so our user is ready to enter another
              //$scope.todos = data; // assign our new list of todos
            });
          }
          else{
              alert('Router is already being shared..');
          } ; 
        };

      }
      else{
        $scope.share_router_state = 'none';//form.val:' + String(form.val) 'comparison :' + String(form.val).localeCompare('true');
      };  
  };
$scope.sliderRangeValue = 5;
cordova.plugins.hotspot.scanWifiByLevel(
   function (scan_data) {
      display_scan_routers(scan_data.slice(1));
   },function (err) {
       // error 
   }
);
  var display_scan_routers = function( scan_data ){
    $scope.scan_routers = scan_data;
  };
  cordova.plugins.hotspot.isConnectedToInternetViaWifi(
    function () {
       // is connected 
      window.WifiWizard.getCurrentSSID(function(current_ssid) {  
        //this.a.demo=JSON.stringify(data);
        //document.write(JSON.stringify(data));
        //alert("current ssid: " + current_ssid);
        var check_router_registered = function(db_data){
          //alert("scan_data: " + JSON.stringify(scan_data));

              for(var j=0; j < db_data.length; j++){
                  var db_ssid = db_data[j].ssid;
                 // alert(db_ssid);

                  if( current_ssid == db_ssid ){
                    //alert('here' + JSON.stringify(scan_data[i]));
                    //alert('present');
                    return true;
                    //filtered_routers.scan.push(scan_data[i]);
                    //filtered_routers.db.push(db_data[j]);
                   // alert('here2');
                  };
              };
              return false;
        
        };

      Routers.get().success( function(db_data){
          //alert("db_data : " + JSON.stringify(db_data));
          var val = check_router_registered(db_data);
          //alert('filtered_routers : ' + JSON.stringify(filtered_routers));
          show_data_internal(val);
       });

       var show_data_internal = function(val){
          //alert('show_data_internal + ' + val);
          show_data_internal_2(val,current_ssid);
       };

       //ssid_exists(data);
        //alert($scope);
       }, function(err) {
        //$scope.demo=JSON.stringify(err);
       }); 
      var show_data_internal_2 = function(val,ssid){
          //alert('show_data_internal_2 val+ ' + val);
          //alert('show_data_internal_2 ssid ' + ssid);
          show_data_external(val,ssid);
      };
    },function () {
       // is not connected 
       alert('connect to internet via Wifi...');
    });
  
  var show_data_external = function(val,ssid){
        set_ssid(val,ssid);
  };


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
   });
 }])

   
.controller('availableWiFiCtrl', ['$scope','$http','Routers', '$localstorage', function($scope, $http, Routers, $localstorage) {

  $scope.$on('$ionicView.enter', function() {
//$scope.$on('$ionicView.enter', function() {

  //var filtered_routers = [];
  $scope.router_clicked = function(data,index){
    //alert(JSON.stringify(data));
    //alert(String(index));
    //alert("localstorage2: " + JSON.stringify($localstorage.getObject("filtered_scan_routers")));
    //alert("localstorage3: " + JSON.stringify($localstorage.getObject("filtered_db_routers")));
    
    var ssid = $localstorage.getObject("filtered_db_routers")[index].ssid.replace(/^"(.*)"$/, '$1');
    var password = $localstorage.getObject("filtered_db_routers")[index].password;
    //alert(ssid);
    //alert(password);
    cordova.plugins.hotspot.connectToHotspot(ssid, password, 
      function () {
       // connected 
       alert('Connected !!');
      },function () {
       // not connected 
       alert('Not Connected..');
      }
    );

  };
  
	var show_data = function(data){

    $scope.routers = data.scan;
    $localstorage.setObject("filtered_scan_routers", data.scan);
    $localstorage.setObject("filtered_db_routers", data.db);
    /*alert("localstorage1: " + JSON.stringify($localstorage.getObject("filtered_scan_routers")));*/
    //filtered_routers = data;

  };

  var show_scan_all_data = function(data){
    $scope.scan_routers = data;
    //$localstorage.setObject("filtered_scan_routers", data.scan);
    //$localstorage.setObject("filtered_db_routers", data.db);
    /*alert("localstorage1: " + JSON.stringify($localstorage.getObject("filtered_scan_routers")));*/
    //filtered_routers = data;

  };

  cordova.plugins.hotspot.scanWifiByLevel(
   function (scan_data) {
       // array of results 
       //alert(JSON.stringify(scan_data));

       var filtered_routers =[];
       filtered_routers.scan = [];
       filtered_routers.db   = [];
       var filter_routers = function(db_data){
          //alert("scan_data: " + JSON.stringify(scan_data));
          for(var i=0; i < scan_data.length; i++){
              //alert(scan_data[i].SSID);
              var scan_ssid = '\"' + scan_data[i].SSID + '\"';
             // alert(scan_ssid);
              for(var j=0; j < db_data.length; j++){
                  var db_ssid = db_data[j].ssid;
                 // alert(db_ssid);

                  if( scan_ssid == db_ssid ){
                    //alert('here' + JSON.stringify(scan_data[i]));

                    filtered_routers.scan.push(scan_data[i]);
                    filtered_routers.db.push(db_data[j]);
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
        //alert('filtered_routers: ' + JSON.stringify(data) + ' \n typeof ' + typeof data );
        //alert('filtered_routers[0]: ' + JSON.stringify(data[0]) + ' \n typeof ' + typeof data[0] );
        //alert('filtered_routers[0].SSID: ' + data[0].SSID + ' \n typeof ' + typeof data[0].SSID );
        show_data(data);
      };
     
      show_scan_all_data(scan_data);
   },function (err) {
       // error 
   }
);



   
	//});
  });
}]);
 