'use strict';

// Declare app level module which depends on views, and components
angular.module('tandem', [
  'ngRoute',
  'ui.router',
  'user',
  'login' ,
  'home',
  'main',
  'message',
  'LocalStorageModule',
  'directives',
  'ngLodash',
]).
config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
  $routeProvider.otherwise({redirectTo: '/message'});
  
  $httpProvider.interceptors.push('sessionService');
//   $httpProvider.defaults.useXDomain = true;
   
//   $httpProvider.defaults.useXDomain = true;
//    $httpProvider.defaults.withCredentials = true;
//    delete $httpProvider.defaults.headers.common['X-Requested-With'];
//    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://userlistlogin:90';
  
}])
.value('DEFAULT_VAL', {
    'SERVER_URL' : 'http://192.168.10.223:90/userlistservices/login/public/',
    'TOPIC_KEY' : 'chat/',
    'HOST' : '192.168.10.223',
    'PORT' : 61614,
    'USER' : 'admin',
    'PASSWORD' : 'admin',
    'MAX_MQTT_CONNECT_COUNT' : 4,
    'CLIENT_KEY_LENGTH' :11
    })


.filter('html', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});