angular.module('activity.service',[])
       .service('activityService',[ 'webService', activityService]);



function activityService(webService) {
    var apiUrl = "activity.json";
    var service = {};
    service.get = get;
    service.deleteActivity = deleteActivity;
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
    function deleteActivity(actvities , id) {
        angular.forEach(actvities, function(value, key) {
            if(value.id == id) {
                actvities.splice(key , 1);
            }
        });
        return actvities;
    }
};