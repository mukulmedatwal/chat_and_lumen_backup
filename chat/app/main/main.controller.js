angular.module('main.controller',['services'])
      .controller('mainCtrl',['$rootScope', '$location','loginService' ,'chatService','DEFAULT_VAL',mainController]);

function mainController($rootScope, $location,loginService,chatService,DEFAULT_VAL) {
    var main = this;
    main.user = loginService.getSession();
    console.log(main.user);
    if(!main.user) {
        $location.path('/login');
    }
    
    
    
    
    
    
    main.logout = function (){
        main.user = null;
        loginService.logout();
        $location.path('/login');
    }
    
    
    $rootScope.$on('authorized', function() {
        main.user = loginService.getSession();
        
      
                
    });

    $rootScope.$on('unauthorized', function() {
        main.logout();
    });
    
};