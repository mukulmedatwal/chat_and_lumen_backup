angular.module('employee.controller',['services','paginator'])
      .controller('employeeCtrl',['$scope','employeeService','$location','DEFAULT_VAL','$log',employeeController])

function employeeController($scope,employeeService,$location,DEFAULT_VAL,$log) {
    
    try{
        console.time("TimerName");
        
        
        $log.log("loading..");
        $log.error("error loading..");
        $log.debug("debug loading..");
        $log.info("info loading..");
        $scope.rowsPerPage = DEFAULT_VAL.RECORDS_PER_PAGE;
        $scope.employees = [];

        $scope.sortOptions = [
            {column: '+id', name: 'ID ( Low to High )'},
            {column: '-id', name: 'ID ( High to low )'},
            {column: '+name', name: 'Name ( A to Z )'},
            {column: '-name', name: 'Name ( Z to A )'},
            {column: '+department', name: 'Department ( A to Z )'},
            {column: '-department', name: 'Department ( Z to A )'},
            {column: '+salary', name: 'Salary ( Min to Max )'},
            {column: '-salary', name: 'Salary ( Max to Mix )'},
            {column: '+experience', name: 'Experience ( Low to High )'},
            {column: '-experience', name: 'Experience ( High to low )'},
        ];
        $scope.sortorder = $scope.sortOptions[0];  // set default sort order
        
        /*
        * get all employees 
        */
        $scope.getEmployees = function(){
                employeeService.get(function(data){
                $scope.employees = data;
            });
        };
        $scope.getEmployees(); // get employees data

        /*
         * delete employee
         */
        $scope.deleteEmployee = function(employeeId) {
                $scope.employees = employeeService.deleteEmployee($scope.employees , employeeId);
                $location.path('/employees');
        };
        
        console.timeEnd("TimerName");
    } catch(e) {
        
        /// push error to log
        console.log( "Got an error: " + e);
        
    }
    
   
};