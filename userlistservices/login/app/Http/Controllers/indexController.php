<?php

namespace App\Http\Controllers;

use App\Api\GetApi;
use \Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Log;

class IndexController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth' , ['except' => ['stomp']]);
        $this->middleware('auth', ['except' => ['stomp']]);
    }

    public function get(Request $request)
    {
        $getApi = new GetApi($request , 'GET');
        return $getApi->callApi();
    }
    public function post(Request $request)
    {
        $getApi = new GetApi($request , 'POST');
        $data = $getApi->callApi();
        if($data)
        {
            return $data;
        }
        return array( 'status' => 'error', 'msg' => $getApi->getErrorMsg(), );
    }
    public function put(Request $request)
    {
        $getApi = new GetApi($request , 'PUT');
        $data = $getApi->callApi();
        if($data)
        {
            return $data;
        }
        return array( 'status' => 'error', 'msg' => $getApi->getErrorMsg(), );
        
    }
    public function delete(Request $request)
    {
//        dd($request);
        $getApi = new GetApi($request , 'DELETE');
//           dd('ads');
        $data = $getApi->callApi();
        if($data)
        {
            return $data;
        }
        return array( 'status' => 'error', 'msg' => $getApi->getErrorMsg(), );
    }
    public function stomp(Request $request)
    { 

            $queue  = 'chat/u/';

            try {
                $stomp = new Stomp('tcp://192.168.10.223:61613');
                $stomp = new Stomp('ws://192.168.10.223:61614');
                $stomp->subscribe($queue);
                while (true) {
                   if ($stomp->hasFrame()) {
                       $frame = $stomp->readFrame();
                       if ($frame != NULL) {
                           print "Received: " . $frame->body . " - time now is " . date("Y-m-d H:i:s"). "\n";
                           $stomp->ack($frame);
                       }
            //       sleep(1);
                   }
                   else {
                       print "No frames to read\n";
                   }
                }
            } catch(StompException $e) {
                die('Connection failed: ' . $e->getMessage());
            }

    }
}
