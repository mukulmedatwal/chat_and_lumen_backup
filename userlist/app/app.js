'use strict';

// Declare app level module which depends on views, and components
angular.module('tandem', [
  'ngRoute',
  'user',
  'login' ,
  'home',
  'main',
  'LocalStorageModule',
  'directives'
]).
config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
  
  $httpProvider.interceptors.push('sessionService');
//   $httpProvider.defaults.useXDomain = true;
   
//   $httpProvider.defaults.useXDomain = true;
//    $httpProvider.defaults.withCredentials = true;
//    delete $httpProvider.defaults.headers.common['X-Requested-With'];
//    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://userlistlogin:90';
  
}])
.value('DEFAULT_VAL', {
    'SERVER_URL' : 'http://localhost:90/userlistservices/login/public/'
})
;
