angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
    .state('menu', {
      url: '/sideMenu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
    
      
        
    .state('menu.login', {
      url: '/login',
      views: {
        'side-menu21': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      }
    })
        
      
    
      
        
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
        
    .state('menu.addWiFi', {
      url: '/addWifi',
      views: {
        'side-menu21': {
          templateUrl: 'templates/addWiFi.html',
          controller: 'addWiFiCtrl'
        }
      }
    })
        
     .state('menu.credits', {
      url: '/credits',
      views: {
        'side-menu21': {
          templateUrl: 'templates/credits.html',
          controller: 'credits'
        }
      }
    }) 
    
      
        
    .state('menu.availableWiFi', {
      url: '/availableWifi',
      views: {
        'side-menu21': {
          templateUrl: 'templates/availableWiFi.html',
          controller: 'availableWiFiCtrl'
        }
      }
    })
       
    .state('menu.account', {
      url: '/account',
      views: {
        'side-menu21': {
          templateUrl: 'templates/account.html',
          controller: 'account'
        }
      }
    })    
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/sideMenu/login');

});