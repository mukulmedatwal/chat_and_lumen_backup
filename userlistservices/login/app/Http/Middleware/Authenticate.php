<?php

namespace App\Http\Middleware;

use App\User;
use Firebase\JWT\JWT;
use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;

class Authenticate
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param  \Illuminate\Contracts\Auth\Factory  $auth
     * @return void
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
//    public function handle($request, Closure $next, $guard = null)
//    {
//        if ($this->auth->guard($guard)->guest()) {
//            return response('Unauthorized.', 401);
//        }
//
//        return $next($request);
//    }
    public function handle($request, Closure $next, $guard = null)
    {
//         dd($request);
        if(isset($request['data']) && $request->data != '' )
        {
           
            if(is_array($request->data))
            $data = (object) $request->data;
            else
            $data = json_decode($request->data);  
            
            $request->attributes->add(['data' => $data]);
            if(isset($data->cmd) && $data->cmd != 'login' && $data->cmd != 'add_user' && $data->cmd != 'get_user')
            {
                $headers = apache_request_headers();
                if(isset($headers['Authorization']))
                {
                    $token = $headers['Authorization'];
                    try
                    {
                        $payload = (array) JWT::decode($token, '123456', array('HS256'));
                    }
                    catch (\Exception $ex)
                    {
                        return response()->json(['status' => 'error' , 'msg' => $ex->getMessage()]);
                    }
                    
//                    print_r($payload);
                    if ($payload['exp'] < time())
                    {
                        return response()->json(['status' => 'error' , 'msg' => 'Token has expired']);
                    }
                    if($payload['sub']) 
                    {
                        $user = User::find($payload['sub']);
                        if(!$user)
                        {
                            return response()->json([ 'status' => 'error' , 'msg' => 'Invalid user']);
                        }
                    }
                    $request['user'] = $user;
                }
                else
                {
                    return response()->json([ 'status' => 'error' , 'msg' => 'Please make sure your request has an Authorization header']);
                } 
            }
            
        }
        
                
//        if ($request->header('Authorization'))
//        {
//                dd($request->header('Authorization'));
//                $token = explode(' ', $request->header('Authorization'))[1];
////                dd($token);
//                $payload = (array) JWT::decode($token, '123456', array('HS256'));
//                if ($payload['exp'] < time())
//                {
//                        return response()->json(['message' => 'Token has expired']);
//                }
//                $request['user'] = $payload;
//                               
//                
//        }
//        else
//        {
//                return response()->json(['message' => 'Please make sure your request has an Authorization header'], 401);
//        }
        
        return $next($request);
    }
}
