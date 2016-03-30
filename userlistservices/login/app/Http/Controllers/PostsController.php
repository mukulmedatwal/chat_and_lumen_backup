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
        $this->middleware('auth', ['only' => ['getPosts']]);
    }

    public function getPosts(Request $request)
    {
        
        $api = new PostApi;
        $data = $request->attributes->get('data');
        $action = $this->convertHypherDelimitedToCamelCase($data->cmd);
        if(method_exists($api, $action))
        {
            $response = call_user_func_array(array($api, $action), array($request , $data));
            if($response)
            {
                $return = array( 'status' => 'ok',  'data' => $response, );
            }
            else
            {
                $return =  array( 'status' => 'error', 'msg' => $api->getErrorMsg(), );
            }
        }
        else
        {
            $return =  array( 'status' => 'error', 'msg' => 'cmd : "'.$data->cmd.'" not exits', );
        }
        if(isset($request['callbacks']))
        return $request['callbacks'].'('.json_encode($return).')';
        return $return;
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

    
}
