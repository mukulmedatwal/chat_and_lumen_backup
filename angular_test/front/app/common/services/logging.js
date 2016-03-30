angular.module('logging.service',[])
       .service('loggingService',['$log' , loggingService]);


/*
 * all ajax's call in app goes from here, currently we are using only get method to get data from server 
 */
function loggingService($log) {

   this.isLoggingEnable = function(){
       return true;
   }
   
   this.isDebugEnable = function(){
       return true;
   }
   
   this.isProfilingEnable = function(){
       return true;
   }
  
  this.
};