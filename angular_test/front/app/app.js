'use strict';

// Declare app level module which depends on views, and components
angular.module('angular_test_app', [
  'ngRoute',
  'employee',
  'activity',
  'paginator',
  'directives'
]).
config(['$routeProvider','$httpProvider', function($routeProvider , $httpProvider) {
  $routeProvider.otherwise({redirectTo: '/employees'});
   $httpProvider.interceptors.push('profillingService');
   
}])
.value('DEFAULT_VAL', {
    'RECORDS_PER_PAGE' :  10,
});
