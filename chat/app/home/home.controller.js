angular.module('home.controller',['services'])
      .controller('homeCtrl',['$scope','loginService' ,'employeesService','$location','$rootScope',homeController])
      .controller('editCtrl',['$scope','loginService' ,'employeesService','$location','$routeParams',editController])
        .controller('addCtrl',['$scope','loginService' ,'employeesService','$location','$routeParams',addCtrl]);

function homeController($scope,loginService,employeesService,$location,$rootScope) {
        $scope.selectedRow = [];
        employeesService.employees(function(data) {
            $scope.employees = data;
        });
//        $scope.email = loginService.getSession().email;
        $scope.user = loginService.getSession();
        
        $scope.sortorder = '+fullName';
        $scope.deleteEmployee = function(employeeId) {
                employeesService.deleteUser(employeeId , function(data){
                    if(data.status === 'ok')
                    {
                        $scope.employees = data.data;
                        $location.path('/home');
                    }
                    else
                    {
                        alert(data.msg);
                    }
                });
                
        };
        $scope.openEdit = function(employeeId) {
                
                $location.path('/home/'+employeeId);
        };
        $scope.selectEmployee = function(employee) {
//                $scope.selectedRow.push(index);
                
                if($scope.selectedRow.indexOf(employee.id) == -1){
                    $scope.selectedRow.push(employee.id);
              }
              else {
                $scope.selectedRow.splice($scope.selectedRow.indexOf(employee.id), 1);
              }
       
             
        };
        $scope.deleteSelected = function() {
            
            employeesService.deleteBulkUser($scope.selectedRow , function(data){
                if(data.status === 'ok')
                {
                    $scope.employees = data.data;
                    $location.path('/home');
                }
                else
                {
                    alert(data.msg);
                }
            });
//            for (var i = $scope.selectedRow.length - 1; i >= 0; i--) {
//                if ($scope.selectedRow[i]) {
//                    employeesService.deleteUser($scope.employees , $scope.selectedRow[i]);
//                    $scope.selectedRow.splice(i, 1);
//                }
//            }
        };
};

function editController($scope,loginService,employeesService,$location,$routeParams) {
    
          var userId = $routeParams.userId;
          $scope.unique = false;
          $scope.error = '';
          if(userId > 0) {
               employeesService.getUserById(userId , function(data){
                   if(data.status == 'ok')
                   {
                       $scope.employee = data.data;
                   }
                   else
                   {
                       alert('error 2');
                   }
                    
                });
                $scope.save = function(employee) {
                    if(!$scope.verifyDuplicate(employee)) {
                        employeesService.updateUser(employee , function(data){
                            if(data.status === 'ok')
                            {
                                $location.path('/home');
                            }
                        });
//                        $location.path('/home');
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
          } else {
              $location.path('/home');
          }
          
    
};

function addCtrl($scope,loginService,employeesService,$location,$routeParams) {
    
          
        $scope.unique = false;
        $scope.error = '';
          
        $scope.employee = {};
        $scope.save = function(employee) {
            if(!$scope.verifyDuplicate(employee)) {
                if(employeesService.saveUser(employee , function () {
                     $location.path('/home');
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