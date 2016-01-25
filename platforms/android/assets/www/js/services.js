angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('Routers', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('http://ec2-54-179-153-152.ap-southeast-1.compute.amazonaws.com:8080/api/routers');
			},
			create : function(routerData) {
				return $http.post('http://ec2-54-179-153-152.ap-southeast-1.compute.amazonaws.com:8080/api/routers', routerData);
			},
			delete : function(id) {
				return $http.delete('http://ec2-54-179-153-152.ap-southeast-1.compute.amazonaws.com:8080/api/routers/' + id);
			}
		}
}])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('$localdrive', ['$window','Routers', function($window) {
	var obj = {};
	obj.errorHandler = function(filename, e) {
  		var msg = '';
  		//alert('ger' + JSON.stringify(e));
  		// fileName passing not working
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
      		//alert('hi ' + msg);
          //alert('Error (' + fileName + '): ' + msg);	
  	//	$window.localStorage[key] = value;
    };

    obj.writeToFile = function(fileName, data) {
    	data = JSON.stringify(data, null, '\t');
            //alert('data: ' + data)
            $window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function (directoryEntry) {
                //alert('insidewindow');
                directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                  //alert('directoryEntry');
                    fileEntry.createWriter(function (fileWriter) {
                      //alert('fileEntry');
                        fileWriter.onwriteend = function (e) {
                            // for real-world usage, you might consider passing a success callback
                            //alert('Write of file "' + fileName + '"" completed.');
                        };

                        fileWriter.onerror = function (e) {
                            // you could hook this up with our global error handler, or pass in an error callback
                           // alert('Write failed: ' + e.toString());
                        };
                        //alert('before blob');
                        var blob = new Blob([data], { type: 'text/plain' });
                        fileWriter.write(blob);
                    }, obj.errorHandler.bind(null, fileName));
                }, obj.errorHandler.bind(null, fileName));
            }, obj.errorHandler.bind(null, fileName));

      
    };

    obj.readFromFile = function(fileName, cb) {
    	var pathToFile = cordova.file.cacheDirectory + fileName;
           // alert('pathToFile: ' + pathToFile);
            $window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
              //alert('insidewindow');
                fileEntry.file(function (file) {
                    var reader = new FileReader();

                    reader.onloadend = function (e) {
                        cb(JSON.parse(this.result));
                    };
                   // alert('beforereadastext');
                    reader.readAsText(file);
                   // alert('afterreadastext');
                }, obj.errorHandler.bind(null, fileName));
            }, obj.errorHandler.bind(null, fileName));
      
    };

    return obj;
    

  }

])


;

