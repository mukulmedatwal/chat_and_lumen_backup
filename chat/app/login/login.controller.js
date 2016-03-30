angular.module('login.controller',['services'])
      .controller('loginCtrl',['$scope','loginService','$location','$rootScope','chatService','DEFAULT_VAL','employeesService',loginController]);

function loginController($scope,loginService,$location,$rootScope,chatService,DEFAULT_VAL,employeesService) {
    $scope.error = '';
    $scope.user = {};
    $scope.processLogin = function(user){
        loginService.login(user.email, user.password, function (response) {
            if (response) {
                loginService.setSession(response.user , response.token , response.topics , response.default);
                
                
                $rootScope.$broadcast('authorized');
                
                
    
        //                console.log(loginService.getSession());
                $location.path('/message');
            } else {
                $scope.error = response.message;
            }
        });
    };
    
    $scope.save = function(employee) {
            if(!$scope.verifyDuplicate(employee)) {
                if(loginService.saveUser(employee , function (response) {
                     if (response) {
                            loginService.setSession(response.user , response.token , response.topics, response.default);


                            $rootScope.$broadcast('authorized');



                    //                console.log(loginService.getSession());
                            $location.path('/message');
                        } else {
                            $scope.error = response.message;
                        }
                }));
                
            }
        };
        $scope.verifyDuplicate = function(employee) {

            var user;
                    employeesService.getUser(employee.email , function(data){
                        if(data.status === 'ok') 
                        {
                            user = data.data;
                            if(user && user.id != employee.id) 
                            {
                                $scope.unique = true; 
                            }
                            else
                            {
                                $scope.unique = false;
                            }
                        }
                        else
                        {
                            $scope.unique = false; 
                        }
                    });
                    return $scope.unique;
        }
        
    
    
};