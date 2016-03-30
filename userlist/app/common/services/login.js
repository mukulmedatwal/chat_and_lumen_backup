angular.module('login.service',['credentials.service','LocalStorageModule'])
       
       .service('loginService',['credentials','localStorageService','DEFAULT_VAL','$http',loginService]);

function loginService(credentials,localStorageService,DEFAULT_VAL,$http) {
    
    var service = {};
    service.login = login;
    service.logout = logout;
    service.setSession = setSession;
    service.getSession = getSession;
    return service;
  
    function login(email, password, callback) {




//            var response;
//            var user  = credentials.getAllByEmail(email);
////            console.log(user);
//            if (typeof user !== 'undefined' && user !== null && user.password === password) {
//                response = { success: true , user : user};
//            } else {
//                response = { success: false, message: 'Username or password is incorrect' };
//            }
//            callback(response);
            
            var req = {
                'cmd' : 'login',
                'token' : true,
                'email' : email,
                'password' : password,
            };
//            req.cmd = 'login';
//            req.token = true;
            var url = DEFAULT_VAL.SERVER_URL;
            $http({
                method: 'post',
                url: url,
                data: { 'data' : req },
            }).
            then(function(data) {
            if(data.data.status == 'ok')
            {
                callback(data.data.data);
            }
            else
            {
                alert(data.data.msg);
            }
        }, function(status) {
            alert('error');
        });   
        
    }
    
    function logout() {
        if(getSession()) {
            return localStorageService.remove('app_access_session');
        }
    }
        
    function setSession(user , token) {
        var currentUser = {
            'authenticated' : true,
            'name' : user.name,
            'email' : user.email,
            'access_token' : token,
        };
        return localStorageService.set('app_access_session', currentUser);
    }

    function getSession() {
        return localStorageService.get('app_access_session');
    }
};
