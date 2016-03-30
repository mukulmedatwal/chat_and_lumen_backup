angular.module('login.controller',['services'])
      .controller('loginCtrl',['$scope','loginService','$location','$rootScope',loginController]);

function loginController($scope,loginService,$location,$rootScope) {
    $scope.error = '';
    $scope.user = {};
    $scope.processLogin = function(user){
        loginService.login(user.email, user.password, function (response) {
            if (response) {
                loginService.setSession(response.user , response.token);
                $rootScope.$broadcast('authorized');
        //                console.log(loginService.getSession());
                $location.path('/home');
            } else {
                $scope.error = response.message;
            }
        });
    };
    
    
};