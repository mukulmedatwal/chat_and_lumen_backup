angular.module('session.service',['storage.service'])
       
   .service('sessionService', interceptorService);
       

//function($rootScope) {
//       
//       
//       
//    var service = this;
//
//    service.request = function(config) { 
////        console.log('req');
////        var currentUser = loginService.getSession(),
////               var currentUser = null;
////            access_token = currentUser ? currentUser.access_token : '123456';
////             console.log(currentUser);
////        if (access_token) {
//            config.headers.authorization = 'access_token';
//            config.headers['x-session-token'] = 'adasdasdasd';
//            config.headers['Authorization'] = 'basic adasdasdasd';
////        } else {
//             console.log(config);
////            $location.path('/login');
////            $rootScope.$broadcast('unauthorized');
////        }
//        return config;
//    };
//    
//    
//    
//
//    service.response = function(response) {
//        return response;
//    };
//    
//    service.responseError = function(response) {
//        return response;
//    };
//    return service;
//});

function interceptorService(storageService, $rootScope) {
    var setInjector = {
        request: function(config) {
            if (storageService.getSession()) {
                config.headers['Authorization'] = storageService.getSession()['access_token'];
            }else {
//            $location.path('/login');
            $rootScope.$broadcast('unauthorized');
        }
            return config;
        }
    };
    return setInjector;
};
