// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'chart.js', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

.run(function($ionicPlatform, Routers, $localdrive, $localstorage, $state, $ionicSideMenuDelegate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //alert('here');
    /*Routers.get().success( function(db_data){
          //$localdrive.writeToFile("test.json",db_data);
          //alert("db_data : " + JSON.stringify(db_data));
    
       });
*/
    cordova.plugins.hotspot.isConnectedToInternet(
      function(){
        //alert('isConnectedToInternet');
        Routers.get().success( function(db_data){
          $localdrive.writeToFile("myfi_details.json", db_data);
          $localstorage.setObject("registered_routers", db_data);
          //alert("db_data : " + JSON.stringify(db_data));
          //alert('updated');
          //alert('test');
          //var test = $localstorage.getObject("registered_routers");
          //alert("test: " + JSON.stringify(test));
    
       });
      },function(){
        $localdrive.readFromFile('myfi_details.json', function (data) {
            //fileData = data;
            //alert('got data' + JSON.stringify(data));
            $localstorage.setObject("registered_routers", data);
            //show(fileData);
        }, function(){
            alert('need to connect to net to initialize');
        });
      }


    );

  var goto_next_view = function(){
      //alert('here');
      $state.go('menu.availableWiFi');
    };
    $localdrive.readFromFile('current_user.json', function (data) {
            //fileData = data;
            //alert('got data' + JSON.stringify(data));
            //alert(data);
            $localstorage.setObject("current_user", data);
            //show(fileData);
            $ionicSideMenuDelegate.canDragContent(true);
            goto_next_view();

        }, function(){
            //alert('need to connect to net to initialize');
        });

    //$state.go('menu.credits');
    



    //alert(cordova.file.cacheDirectory);
    /*document.addEventListener('deviceready', onDeviceReady, false);  
      function onDeviceReady() {  
        var errorHandler = function (fileName, e) {  
          var msg = '';

          switch (e.code) {
              case FileError.QUOTA_EXCEEDED_ERR:
                  msg = 'Storage quota exceeded';
                  break;
              case FileError.NOT_FOUND_ERR:
                  msg = 'File not found';
                  break;
              case FileError.SECURITY_ERR:
                  msg = 'Security error';
                  break;
              case FileError.INVALID_MODIFICATION_ERR:
                  msg = 'Invalid modification';
                  break;
              case FileError.INVALID_STATE_ERR:
                  msg = 'Invalid state';
                  break;
              default:
                  msg = 'Unknown error';
                  break;
          };

          alert('Error (' + fileName + '): ' + msg);
        };

        //alert('here12 ' + cordova.file.cacheDirectory);
        function writeToFile(fileName, data) {
            data = JSON.stringify(data, null, '\t');
            alert('data: ' + data)
            window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function (directoryEntry) {
                alert('insidewindow');
                directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                  alert('directoryEntry');
                    fileEntry.createWriter(function (fileWriter) {
                      alert('fileEntry');
                        fileWriter.onwriteend = function (e) {
                            // for real-world usage, you might consider passing a success callback
                            alert('Write of file "' + fileName + '"" completed.');
                        };

                        fileWriter.onerror = function (e) {
                            // you could hook this up with our global error handler, or pass in an error callback
                            alert('Write failed: ' + e.toString());
                        };
                        alert('before blob');
                        var blob = new Blob([data], { type: 'text/plain' });
                        fileWriter.write(blob);
                    }, errorHandler.bind(null, fileName));
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }

        //writeToFile('example.json', { foo: 'baraayush' });
        //alert('here');

        function readFromFile(fileName, cb) {
            
        }

        var fileData;
        //alert('here2');
        readFromFile('exampl2e.json', function (data) {
            fileData = data;
            show(fileData);
        });
        var show = function(fileData){
          alert('fileData: ' + JSON.stringify(fileData));
        };
        

     };   */
 //   angular.module('app.controllers', [])
  //  var md = cordova.require("cordova/plugin_list").metadata;
	//console.log(md);
//    WifiWizard.startScan();	
  });
  //alert('hi');
})
