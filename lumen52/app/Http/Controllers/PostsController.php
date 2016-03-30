<?php

namespace App\Http\Controllers;

use App\Api\PostApi;
use App\Http\Middleware\RequestHandler;
use \Illuminate\Http\Request;
use App\Posts;
use Illuminate\Support\Facades\Cache;
use App\User;
use Log;
class PostsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('requestHandler', ['only' => ['getPosts']]);
    }

    public function getPosts(Request $request)
    {
//    $then = microtime();

//        phpinfo();
        $error = "test Error";
        Log::emergency($error);
        Log::alert($error);
        Log::critical($error);
        Log::error($error);
        Log::warning($error);
        Log::notice($error);
        Log::info($error);
        Log::debug($error);
//        dd($request->attributes->get('data'));
        $api = new PostApi;
        $data = $request->attributes->get('data');
        $action = $this->convertHypherDelimitedToCamelCase($data->cmd);
        $response = call_user_func_array(array($api, $action), array($data));
        $api = new PostApi;
        $data = $request->attributes->get('data');
        $action = $this->convertHypherDelimitedToCamelCase($data->cmd);
        $response = call_user_func_array(array($api, $action), array($data));
//       sleep(6.5);
//$now = microtime();
//$t = $now-$then;
//echo date("H:i:s", strtotime($t) );
        return array(
            'status' => 'ok',
            'data' => $response,
        );
//        return \App\Posts::all();
    }
    
    public function save(Request $request)
    {
//        $post = new \App\Posts;
//        $post->post_title = "abc";
//        $post->post_description = "abc_description";
//        $post->save();
        
        
        
        
//        app('db')->transaction(function() {
            
//            dd($request);
           $user = User::findOrFail($request->user_id);
//           dd($user);
//            if(!$user) 
//            {
//                about(404);
//            }
            
            $user->posts()->create($request->all());
//            exit();
//        });
//        echo 'comming';
//        dd($request->all());
//        dd($user);
    }
    public function update(Request $request , $id)
    {
        $posts =  Posts::find($id);
        $posts->post_title = "update";
        $posts->save();
        dd($posts);
        
    }
    public function delete(Request $request , $id)
    {
//       $posts =  Posts::find($id)->delete();  // delete by pk 
        
        
//        Posts::destroy(1); // delete by pk 

//        Posts::destroy(array(1, 2, 3)); // bulk delete by pk 

//        Posts::destroy(21, 22, 23);  // bulk delete by pk 
        
        Posts::where('post_title', '=', 'mukul')->delete(); // bulk delete by any condition 
    }

    private function convertHypherDelimitedToCamelCase($underscoreDelimitedString)
    {
        $stringParts = explode('_', $underscoreDelimitedString);
//        dd($parts);
        if($stringParts)
        {
            $stringParts = array_map('ucfirst', $stringParts);
            return lcfirst(implode('', $stringParts));
        }
        return $underscoreDelimitedString;
    }
    
}
