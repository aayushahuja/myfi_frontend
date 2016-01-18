angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('Routers', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/routers');
			},
			create : function(routerData) {
				return $http.post('/api/routers', routerData);
			},
			delete : function(id) {
				return $http.delete('/api/routers/' + id);
			}
		}
}]);

