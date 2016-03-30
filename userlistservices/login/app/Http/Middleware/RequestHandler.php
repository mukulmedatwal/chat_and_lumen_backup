<?php

namespace App\Http\Middleware;

use Closure;
class RequestHandler
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        
        if(isset($request->data))
        {
//              dd($request);
            $data = json_decode($request->data);
//            $data[]
//            dd($data);
            $request->attributes->add(['data' => $data]);
            if(!isset($data->token) || $data->token !== true)  // check request 
            {
                dd('invalid token');
//                return new RedirectResponse(url('/test'));
            }
        }
//        dd($request);
       
        $return =  $next($request);
        return $return;
    }
}
