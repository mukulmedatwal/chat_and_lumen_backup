angular.module('session.service',['storage.service'])
       
   .service('sessionService', interceptorService);
       

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
