angular.module('message.route', [ 'ngRoute'])
.config(['$routeProvider', function($routeProvider) {
        
        // Now set up the states
//  $stateProvider
//    
//    .state('message', {
//        
//      url: "/message",
//      templateUrl: "app/message/views/message.html",
//      controller: 'messageCtrl'
//    })
//    .state('message.user', {
//      url: "/:id/:name",
//      params: { id : null },
//      templateUrl: "app/message/views/chat.html",
//      controller: 'chatCtrl'
//    })
    
  $routeProvider.when('/message', {
    templateUrl: 'app/message/views/message.html',
    controller: 'messageCtrl'
  })
//          .when('/message/:userId', {
//    templateUrl: 'app/message/views/message.html',
//    controller: 'chatCtrl'
//  })
//          when('/add', {
//    templateUrl: 'app/home/views/edit.html',
//    controller: 'addCtrl'
//  })
  ;
  
}]);