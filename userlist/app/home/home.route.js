angular.module('home.route', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'app/home/views/home.html',
    controller: 'homeCtrl'
  }).when('/home/:userId', {
    templateUrl: 'app/home/views/edit.html',
    controller: 'editCtrl'
  }).when('/add', {
    templateUrl: 'app/home/views/edit.html',
    controller: 'addCtrl'
  });
}]);