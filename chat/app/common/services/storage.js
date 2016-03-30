angular.module('storage.service',['LocalStorageModule'])
       
       .service('storageService',['localStorageService',loginService]);

function loginService(localStorageService) {
    
    var service = {};
    
    service.setSession = setSession;
    service.getSession = getSession;
    return service;
  
        
    function setSession(user , token , topics) {
        var currentUser = {
            'authenticated' : true,
            'name' : user.name,
            'id' : user.id,
            'email' : user.email,
            'access_token' : token,
            'topics' : topics,
        };
        return localStorageService.set('app_access_session', currentUser);
    }

    function getSession() {
        return localStorageService.get('app_access_session');
    }
};
