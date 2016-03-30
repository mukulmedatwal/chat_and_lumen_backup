<?php

namespace App\Api;


use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Log;
class Api
{
    protected $is_error = false;
    protected $error_msg = '';
   
    public function getErrorMsg() 
    {
        return $this->error_msg;
    }

    protected function setErrorMsg($msg)
    {
        $this->error_msg = $msg;
    }  
    
    
    protected function apiClasses()
    {
        return [
            
        ];
    }


    public function Apis()
    {

        return [
            
            /*
             *  get all apis with GET method
             */
            'GET' => [    
                'getAllPosts' => ['class' => 'ApiPost'],
                'getUser' => ['class' => 'ApiPost'],
                'getUserSimple' => ['class' => 'ApiPost'],
                'getAllUsers' => ['class' => 'ApiPost'],
            ],
            
            /*
             *  get all apis with POST method
             */
            'POST' => [
                'addUser' => ['class' => 'ApiPost'],
                'login' => ['class' => 'ApiPost'],
            ],
            
            /*
             *  get all apis with PUT method
             */
            'PUT' => [
                'updateUser' => ['class' => 'ApiPost'],
            ],
            
            /*
             *  get all apis with DELETE method
             */
            'DELETE' => [
                'deleteUser' => ['class' => 'ApiPost'],
                'deleteBulkUser' => ['class' => 'ApiPost'],
            ],
        ];
    }


}
