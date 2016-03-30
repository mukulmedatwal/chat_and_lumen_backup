angular.module('chat.service',['ngLodash'])
       .service('chatService',['DEFAULT_VAL' ,'$compile','$rootScope'  ,  chatService]);



function chatService(DEFAULT_VAL , $compile, $rootScope) {

    var MAX_MQTT_CONNECT_COUNT = DEFAULT_VAL.MAX_MQTT_CONNECT_COUNT;
    var MQTT_CONNECT_COUNT = 0;
    var CLIENT_KEY_LENGTH = DEFAULT_VAL.CLIENT_KEY_LENGTH;
    var topicSlug = DEFAULT_VAL.TOPIC_KEY;
    var client;
    var service = {};
    service.strPad = strPad;
    service.escapeHtml = escapeHtml;
    service.handle = handle; 
    service.webSocketAllow = webSocketAllow; 
    service.subscribeClient = subscribeClient; 
    service.submitChat = submitChat; 
    service.getUserDestination = getUserDestination; 
    service.panelExist = panelExist; 
    service.addChatPanel = addChatPanel; 
    return service;




    function escapeHtml(string) {
        
        var entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };
  
        return String(string).replace(/[&<>"'\/]/g, function (s) {
            return entityMap[s];
        });
    }
    
    function webSocketAllow(){
        if(window.WebSocket) {
            return true;
        }
        return false;
    }
    
    function panelExist(eleId){
        if(document.getElementById(eleId))
        {
            return true;
        }
        return false;
    }
    function subscribeClient(userData , $scope)
    {
//            console.log(user);
            var host = DEFAULT_VAL.HOST;
            var port = DEFAULT_VAL.PORT; 
            var user = DEFAULT_VAL.USER;
            var password =  DEFAULT_VAL.PASSWORD; //$("#connect_password").val();
           
            
            
            var clientId  = userData.id + '-' + new Date().getTime();
            
          
            
            client = new Messaging.Client(host, Number(port), clientId );


             // the client is notified when it is connected to the server.
            var onConnect = function(frame) 
            {
                console.log('mqqt connected.');
                console.log(userData);
                angular.forEach(userData.topics, function(topic, key) {
                    console.log(topic.topic_key);
                    client.subscribe(topicSlug + topic.topic_key);
                });
//                 client.subscribe(topicSlug);
                
            }; 

           // this allows to display debug logs directly on the web page
           var debug = function(str)
           {
               console.log(document.createTextNode(str + "\n"));
           };  

           function disconnectClient()
           {
                console.log('mqqt connectinn lost:');
               client.disconnect();
           }

           function onFailure(failure)
           {
                console.log('mqqt connectinn fail : '+ failure);
                console.log(failure);
                connectMqtt();
           }

           function onConnectionLost(responseObject)
           {
               console.log('mqqt connectinn lost: '+responseObject);
               connectMqtt();
           }
           
           function onMessageArrived(message)
            {
                console.log(message);
                console.log($scope);
                if(!message)
                {
                   return false;
                }
                
                var m = jQuery.parseJSON(message.payloadString);
                
               if(m.event_type === 'chat')
                {
                    var from_id = m.from_id;
                    var from_display_id = m.from_display_id;
                    var to_id = m.to_id;
                    var to_display_id = m.to_display_id;
                    var msg = m.msg;
                    var timestamp = m.timestamp;
                    timestamp = parseFloat(timestamp);
                    var sent_from_client_id = m.sent_from_client_id;
//                    var msg = escapeHtml(m.msg);
                    var targetDivId = '#chat-messages_';
                    var appendText = '';
                     var toDestination = m.to_destination;
                    if(from_id == userData.id )
                    {
                            var index = _.findIndex($scope.chatLists, function(o) { return o.topic_key == toDestination; });
                            var nameDisplayInChat = '';
//                            $scope.chatLists[index].chats.push(m);
                            
                    }
                    else
                    {
                        
                         
                        if( m.is_group)
                        {
                            var formUserClientID = m.to_destination;
                            var actionUserId = to_id;
                            var diaplayName = to_display_id;
                            var nameDisplayInChat = from_display_id;
                            
                        }
                        else
                        {
                            var formUserClientID = m.from_destination;
                            var actionUserId = from_id;
                            var diaplayName = from_display_id;
//                            var nameDisplayInChat = to_display_id;
                            var nameDisplayInChat = from_display_id;
                        }
                       
                        var index = _.findIndex($scope.chatLists, function(o) { return o.topic_key == formUserClientID; });
                       
                        
                        
                       
                       
                        var badge =  $('#_l_'+actionUserId+' .badge');
                        var badgeCount = parseInt(badge.text());
                        if(isNaN(badgeCount))
                        {
                            badgeCount = 0;
                        }
                        badgeCount =  badgeCount + 1;
                        console.log(to_id);
                        console.log(badgeCount);
                        badge.text(  badgeCount );
                    }
                    
                    if($scope.chatLists[index].chats === "")
                    {
                        $scope.chatLists[index].chats = [];
                    }
                    var chatObj = {
//                            "msg" : emojione.toImage(msg),
                        "msg" : msg,
                        "timestamp" : timestamp,
                        "user_image" : m.user_image,
                        "name" : nameDisplayInChat,
                    };
                        
                    $scope.chatLists[index].chats.push(chatObj);
                    if($scope.chatLists[index].topic_key == $scope.chatList.topic_key)
                    {
                        $rootScope.$broadcast('newMessage');
                    }
                    console.log($scope.chatLists[index]);
//                    
//                    
//                    
//                    
                    $scope.$apply();
                    var wtf    = $('#chat-messages');
                    var height = wtf[0].scrollHeight;
                    wtf.scrollTop(height);
//                    $scope.$digest();
                    return false;
                 }
                 
                   return;
              
            }
            
            client.onMessageArrived = onMessageArrived;
            client.onConnectionLost = onConnectionLost;            
            
            function connectMqtt()
            {
                var currentConnectionCount = getMqqtConnectionLostCount();
                if(currentConnectionCount <= MAX_MQTT_CONNECT_COUNT)
                {
                    setMqqtConnectionLostCount();
                    console.log('connecting mqqt '+getMqqtConnectionLostCount()+' times.');
                    client.connect({
//                        timeout: timeout,                       //seconds
//                        keepAliveInterval: keepAliveInterval,
                        userName:user, 
//                        useSSL: false,// for secure connection on https #added by Virendra Yadav ver1.1 on 2015-02-03 to set MQTT SSL use setting
                        password:password, 
                        onSuccess:onConnect, 
                        onFailure:onFailure
                    });
                    console.log(client);
                }
                else
                {
                    console.log('mqqt unable to connect more than '+MAX_MQTT_CONNECT_COUNT+' times.');
                }
            }
            connectMqtt();
    }
    
    
    function clientSubmit( jsonData ,  destination) //send data packet to client
    {
        messageToMe = new Messaging.Message(jsonData);
        messageToMe.destinationName = destination;
        client.send(messageToMe);
    }
        
      
    function getTopicKey(toDestination)
    {
//        var toDestination = getDestination(userId);
        return DEFAULT_VAL.TOPIC_KEY + toDestination;
    }
    function getUserDestination(userId)
    {
        console.log(CLIENT_KEY_LENGTH);
       return 'u' + strPad(userId , CLIENT_KEY_LENGTH , 0);
    }
    function submitChat( user_id , user_name,  to_id , to_display_id , toDestination ,  is_group ) // send chat data
    {
            if(to_display_id.length <= 0 )
            {
                alert("Please Insert Your Name");
                 return false;
            }
            var dateCurrent = new Date().getTime();
            var sent_from_client_id = user_id+'rand';
            var toDestinationWithKey  = getTopicKey(toDestination);
            var userTopic = getUserDestination(user_id);
            var topicId  = getTopicKey(userTopic);
            var text = $('#chattext').val();
            text = text.trim();
            //alert(text.length);
            if(text.length > 0 )
            {
                var serverMsg = {
                "event_type":"chat", 
                "is_sender_msg":false, 
                "from_id":user_id,
                "from_display_id":user_name,
                "to_id":to_id,
                "to_display_id":to_display_id, 
                "msg":text, 
                "user_image":'http://www.planwallpaper.com/static/images/Winter-Tiger-Wild-Cat-Images.jpg', 
                'to_destination' : toDestination ,
                'from_destination' : userTopic ,
                'is_group' : is_group,
//                "date":date, 
//                "time":datetime, 
                "timestamp":dateCurrent, 
                "sent_from_client_id":sent_from_client_id
                };
                var serverMsgToReciver = {
                    "event_type":"chat", 
                    "is_sender_msg":true, 
                    "from_id":user_id,
                    "from_display_id":user_name,
                    "to_id":to_id,
                    "to_display_id":to_display_id, 
                    "msg":text, 
                    "user_image":'http://www.planwallpaper.com/static/images/Winter-Tiger-Wild-Cat-Images.jpg', 
                    'to_destination' : toDestination ,
                     'from_destination' : userTopic ,
                      'is_group' : is_group,
//                    "date":date, 
//                    "time":datetime,
                     "timestamp":dateCurrent, 
                    "sent_from_client_id":sent_from_client_id
                };
                serverMsg = JSON.stringify(serverMsg);
                serverMsgToReciver = JSON.stringify(serverMsgToReciver);
                if (text)
                {
                    clientSubmit( serverMsg , toDestinationWithKey); //send msg to client
                    clientSubmit( serverMsg , topicSlug); //send msg to client
                    if(is_group === 0)
                    clientSubmit( serverMsgToReciver , topicId); //send msg to self

    //                    messageToMe = new Messaging.Message(serverMsg);
    //                    messageToMe.destinationName = toDestinationWithKey;
    //                    client.send(messageToMe);
                  
                }
            }
            $('#chattext').val("");
            
            return false;
        }
        
    
    function setMqqtConnectionLostCount()
    {
        
        MQTT_CONNECT_COUNT = MQTT_CONNECT_COUNT + 1;
        
    }
    function getMqqtConnectionLostCount()
    {
        return MQTT_CONNECT_COUNT;
    }
    
    function handle(e , to_id , to_display_id){
        
        if(e.keyCode === 13){
            submitChat(to_id , to_display_id)
        }

        return false;
    }
  
    function strPad(input, length, string) {
        
        string = string || '0'; input = input + '';
        return input.length >= length ? input : new Array(length - input.length + 1).join(string) + input;
        
    }
    
    function addChatPanel(toDestination , userId , name , $scope)
    {
        var chatPanel = 'chat-main_'+toDestination;
        if(panelExist(chatPanel))
        {
            console.log('panel exist');
        }
        else
        {
            console.log('creating panel');
            var chatDiv = '<div id="'+chatPanel+'" ng-show="chatList.id == '+userId+'" class="chat-main-panel panel panel-primary">'+
                                    '<div class="panel-heading">'+
                                        '<h3 class="panel-title">'+name+'</h3>'+
                                    '</div>'+
                                    '<div class="panel-body" >'+
                                        '<div class="chat-panel">'+
                                            '<div id="chat-messages_'+toDestination+'" class="chat-massages" >'+
                                            '</div>'+
                                            '<div class="chat-action-box">'+
                                                '<div class="col-md-12 no-mrg">'+
                                                    '<div class="col-md-11 no-mrg">'+
                                                        '<textarea rows="3" class="form-control "  on-enter-event ="submitChat( chatList.id , chatList.name, chatList.topic_key , chatList.is_group )" placeholder="enter your message" id="chattext_'+toDestination+'"></textarea>'+
                                                   ' </div>'+
                                                    '<div class="col-md-1 no-mrg">'+
                                                        '<button type="button" class="btn  btn-primary" ng-click="submitChat( chatList.id , chatList.name, chatList.topic_key , chatList.is_group )" > Send </button>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>' ;      
            angular.element(document.getElementById('chat-main-panle')).append($compile(chatDiv)($scope));
        }
        
    }

};
