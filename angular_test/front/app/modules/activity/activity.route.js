angular.module('activity.route', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/activity', {
    templateUrl: 'app/modules/activity/views/activity.html',
    controller: 'activityCtrl'
  });
}]);