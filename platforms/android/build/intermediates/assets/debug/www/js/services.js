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
}]);

