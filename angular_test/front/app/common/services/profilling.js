angular.module('profilling.service',[])
       .service('profillingService', function() {
    var service = this;

    

    console.time("TimerName");
    
    service.request = function(config) { 
        
         
        console.log(config);
        
        return config;
    };

    service.response = function(response) {
        
         console.log(response);
        return response;
    };
    
    service.responseError = function(response) {
//        return response;
    };
})