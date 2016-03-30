angular.module('message.controller',['services'])
      .controller('messageCtrl',['$scope','loginService' ,'employeesService','$location','$rootScope','chatService','$compile',messageController])
      .controller('chatCtrl',['$scope','loginService' ,'employeesService','$location','$stateParams','chatService','DEFAULT_VAL',chatController])
     ;

function messageController($scope,loginService,employeesService,$location,$rootScope,chatService,$compile) {
    
    $scope.user = loginService.getSession();
    if($scope.user && $scope.user.id) {
        chatService.subscribeClient($scope.user , $scope);
    }
    
    employeesService.getChatList(function(data) {
//            $scope.employees = data;
            $scope.chatLists = data;
            var index = _.findIndex($scope.chatLists, function(o) { return o.topic_key == $scope.user.defaultGroup.topic_key; });
            $scope.chatList = $scope.chatLists[index];
            if($scope.chatList)
            {
        //        console.log($scope.chatList);
                $scope.toDestination = $scope.chatList.topic_key;
                //chatService.addChatPanel(toDestination , $scope.chatList.id , $scope.chatList.name , $scope);
            }
        });
//        
    
    
    $scope.openChat = function(chatList) {
        console.log(chatList);
             $scope.chatList = chatList;
            $scope.toDestination = chatList.topic_key;
            var wtf    = $('#chat-messages');
            var height = wtf[0].scrollHeight;
            wtf.scrollTop(height);
//                    var toDestination = chatList.topic_key;
//                    chatService.addChatPanel(toDestination , chatList.id , $scope.chatList.name , $scope);
        };
        
        $scope.submitChat = function ( toUserId , toUserName , todestination , is_group ) {
////            alert('hi');
            chatService.submitChat( $scope.user.id , $scope.user.name,  toUserId , toUserName ,todestination , is_group );
            
        }
        
        $scope.converToEmoji = function(msg) {
            msg = chatService.escapeHtml(msg);
            return emojione.toImage(msg);
        }
        
//        $rootScope.$on('newMessage', function() {
//           $scope.chatList = $scope.chatList;
//        });
    
//        
//        
//    console.log('asd');
//        $scope.selectedRow = [];
//        employeesService.getChatList(function(data) {
////            $scope.employees = data;
//            $scope.getChatList = data;
//        });
//        $scope.employee = null;
//        if(!$scope.employee)
//        {
//             employeesService.getUserById(80 , function(data){
//                if(data.status == 'ok')
//                {
//                    $scope.employee = data.data;
//                    var toDestination = chatService.getDestination(80);
//
//                }
//                else
//                {
//                    alert('error 2');
//                }
//
//             });
//        }
//        $scope.user = loginService.getSession();
////        $scope.user = loginService.getSession();
//        if($scope.user && $scope.user.id) {
////            var userId = $scope.user.id;
//            chatService.subscribeClient($scope.user.id , $scope);
//        }
//        
//        $scope.submitChat = function ( toUserId , toUserName ) {
////            alert('hi');
//            chatService.submitChat( $scope.user.id , $scope.user.name,  toUserId , toUserName  );
//            
//        }
//        
//        $scope.openChat = function(employeeId) {
//                employeesService.getUserById(employeeId , function(data){
//                    if(data.status == 'ok')
//                    {
//                        $scope.employee = data.data;
//                        var toDestination = chatService.getDestination(employeeId);
//                        
//                        chatService.addChatPanel(toDestination , employeeId , $scope.employee.name , $scope);
//
//                    }
//                    else
//                    {
//                        alert('error 2');
//                    }
//
//                 });
//                
//        };
//       
};


function chatController($scope,loginService,employeesService,$location,$stateParams,chatService,DEFAULT_VAL) {
    
    
        var userId = $stateParams.id;
        console.log(userId);
        $scope.userId = userId;
        
        $scope.toDestination = chatService.getDestination(userId);
        employeesService.getUserById(userId , function(data){
            if(data.status == 'ok')
            {
                $scope.employee = data.data;
            }
            else
            {
                alert('error 2');
            }

         });
                
//        employeesService.employees(function(data) {
//            $scope.employees = data;
//        });
//        $scope.user = loginService.getSession();
//        $scope.openChat = function(employeeId) {
//                
//                $location.path('/message/'+employeeId);
//        };
        
        
        
        $scope.submitChat = function () {
//            alert('hi');
            chatService.submitChat( $scope.user.id , $scope.user.name,  userId , $scope.employee.name );
            
        }
};
