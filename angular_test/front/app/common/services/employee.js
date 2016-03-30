angular.module('employee.service',[])
       .service('employeeService',[ 'webService', employeeService]);



function employeeService(webService) {
    var apiUrl = "employee.json";
    var service = {};
    service.get = get;
    service.deleteEmployee = deleteEmployee;
    return service;

    /*
     * get all employees from server
     */
    function get(callback) {
        
        webService.get(apiUrl , callback);
    }
    
    /*
     * Delete Employee
     */
    function deleteEmployee(employees , id) {
        angular.forEach(employees, function(value, key) {
            if(value.id == id) {
                employees.splice(key , 1);
            }
        });
        return employees;
    }
};