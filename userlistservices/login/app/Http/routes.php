<?php

use Illuminate\Support\Facades\Request;
use App\Message;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
$app->get('/stomp/', function(){

    $queue  = 'chat.u.g00000000001';

            try {
                
                
//$stomp = new Stomp('tcp://127.0.0.1:61613'); 
//$stomp->clientId = 'test-client'; 
//if ($stomp->connect()) { 
//  if ($stomp->subscribe('/topic/test.topic')) { 
//    $frame = $stomp->readFrame(); 
//    if ($frame) { 
//      $stomp->ack($frame); 
//    } 
//  } 
//  $stomp->disconnect(); 
//} 

//                $stomp = new Stomp('tcp://192.168.10.223:61613');
//                $stomp = new Stomp('stomp://192.168.10.223:61613');
//                $stomp->clientId = 'test-client'; 
////if ($stomp->connect()) { 
//     $stomp->subscribe($queue);
//                while (true) {
//                   if ($stomp->hasFrame()) {
//                       $frame = $stomp->readFrame();
//                       print_r($frame);
//                       if ($frame != NULL) {
//                           print "Received: " . $frame->body . " - time now is " . date("Y-m-d H:i:s"). "\n";
//                           $stomp->ack($frame);
//                       }
//                   sleep(1);
//                   }
//                   else {
//                       print "No frames to read\n";
//                   }
//                }
////}
//               
                
                
                /////
                echo 'loading./...';
                // Network Rail Stomp Handler example by ian13
                        $server = "tcp://192.168.10.223:61613";
                        $user = "admin";
                        $password = "admin";
                        $channel = "chat.";

                        $con = new Stomp($server, $user, $password
                                , array('client-id' => 'savingmessages')
                                );
                        if (!$con) {
                           die('Connection failed: ' . stomp_connect_error());
                        }

                        $con->subscribe('/topic/' . $channel );
//                        $con->cli
                        while($con){
                            echo '<br/>';
                             echo 'connected!!';
                           if ($con->hasFrame()){
                               $msg = $con->readFrame();
                               echo '<br/>';
//                               foreach (json_decode($msg->body) as $event) {
                                 // do stuff with $event here
                                   echo 'new Message';
                                   echo '<br/>';
                                   if(isset($msg->body))
                                   {
                                       $messageBody = json_decode($msg->body);
                                    print_r($msg);
                                    
                                    
                                    $message = new Message();
                                    $message->message = $messageBody->msg;
                                    $message->from_user_id = $messageBody->from_id;
                                    
                                    $message->is_group_msg = $messageBody->is_group;
                                    if($messageBody->is_group > 0)
                                        $message->to_group_id = $messageBody->to_id;
                                    else
                                        $message->to_user_id = $messageBody->to_id;
                                    
                                    $messageKey = Message::createMessageKey( $message->from_user_id , $message->to_user_id);
                                    
                                    $message->msg_key = $messageKey;
                                    $message->save();
                                   }
//                               }
                               $con->ack($msg);
                           }
                        }
//
                        die('Connection lost: ' . time());

                
                ///
                
            } catch(StompException $e) {
                die('Connection failed: ' . $e->getMessage());
            }

    
});

$app->get('/', 'indexController@get');


$app->post('/', 'indexController@post');


$app->put('/', 'indexController@put');


$app->delete('/', 'indexController@delete');


//
//$app->post('/', function (Illuminate\Support\Facades\Request $request) use ($app) {
//    return $app->version();
//});
//
//
//$app->put('/', function () use ($app) {
//    return $app->version();
//});
//
//
//$app->delete('/', function () use ($app) {
//    return $app->version();
//});


//$app->get('/test', function () use ($app) {
//    return 'this is test';
//});

//$app->get('/posts','PostsController@getPosts');
//
//$app->post('/save','PostsController@save');
//
//$app->put('/update/{id}','PostsController@update');
//$app->delete('/delete/{id}','PostsController@delete');
//
//
//$app->get('/as',['middleware' => 'auth' , 'ProjectsController@store']);
//
////$app->group(['prefix' => 'projects', 'middleware' => 'auth'], function($app) {
//////    $app->post('/', 'ProjectsController@store');
////    $app->put('/{projectId}', 'ProjectsController@update');
////    $app->delete('/{projectId}', 'ProjectsController@destroy');
////});
////
////$app->group(['prefix' => 'projects'], function ($app)
////{
////    $app->get('/', 'ProjectsController@index');
////    $app->get('/{projectId}', 'ProjectsController@show');
////});
//
//
//$app->post('auth/login', 'Auth\AuthController@postLogin');
