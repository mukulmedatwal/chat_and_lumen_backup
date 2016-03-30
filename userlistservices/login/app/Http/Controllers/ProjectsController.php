<?php

namespace App\Http\Controllers;

use App\Api\PostApi;
use App\Http\Middleware\RequestHandler;
use \Illuminate\Http\Request;
use App\Posts;
use Illuminate\Support\Facades\Cache;
use App\User;
use Log;

class ProjectsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('requestHandler', ['only' => ['getPosts']]);
    }

    public function store(Request $request)
    {
        
       return array('store');
    }
    public function update(Request $request)
    {
        
       return array('update');
    }
    public function distroy(Request $request)
    {
        
       return array('distroy');
    }
    public function index(Request $request)
    {
        
       return array('index');
    }
    public function show(Request $request)
    {
        
       return array('show');
    }
    
    
}
