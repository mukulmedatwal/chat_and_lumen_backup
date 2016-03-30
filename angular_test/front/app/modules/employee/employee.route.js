angular.module('employee.route', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/employees', {
    templateUrl: 'app/modules/employee/views/employee.html',
    controller: 'employeeCtrl'
  });
}]);