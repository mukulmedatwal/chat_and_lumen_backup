<?php

namespace App\Api;


use App\Api\PostApi;
use \Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Log;
class GetApi
{
    
    private $data;
    private $request;
    private $method;
    private $actionClass = null;
    public $error_msg = '';


    public function __construct(Request $request , $method = 'GET')
    {
      
        if(isset($request->data))
        {
            $this->request = $request;
            $this->data = $request->attributes->get('data');
            $this->method = $method;
            return true;
        }
        $this->error_msg = 'invalid input data';
        return false;
        
    }
    
    private function get()
    {
        return [    
                'getAllPosts' => ['class' => 'PostApi'],
                'getUser' => ['class' => 'PostApi'],
                'getUserSimple' => ['class' => 'PostApi'],
                'getAllUsers' => ['class' => 'PostApi' ],
                'getChatList' => ['class' => 'PostApi' ],
            ];
    }
    private function post()
    {
        return [    
                'addUser' => ['class' => 'PostApi'],
                'login' => ['class' => 'PostApi'],
            ];
    }
    private function put()
    {
        return [    
                 'updateUser' => ['class' => 'PostApi'],
            ];
    }
    private function delete()
    {
        return [    
                'deleteUser' => ['class' => 'PostApi'],
                'deleteBulkUser' => ['class' => 'PostApi'],
            ];
    }


    public function apis()
    {

        return [
            
            /*
             *  get all apis with GET method
             */
            'GET' => $this->get(),
            
            /*
             *  get all apis with POST method
             */
            'POST' => $this->post(),
            
            /*
             *  get all apis with PUT method
             */
            'PUT' => $this->put(),
            
            /*
             *  get all apis with DELETE method
             */
            'DELETE' => $this->delete(),
        ];
    }

    public function callApi($options = [])
    {
       
        $return = '';
        if($this->validateData())
        {
            if($this->isApiExists())
            {
                $data = $this->data;
                $action = $data->cmd;
                $api = $this->actionClass;
//                dd($this->request);
                $response = call_user_func_array(array($api, $action), array($this->request , $data));
//                print_r($response);
                if($response)
                {
                    return array( 'status' => 'ok',  'data' => $response, );
                }
                else
                {
                    return array( 'status' => 'error', 'msg' => $api->getErrorMsg(), );
                }
            }
            else
            {
                return array( 'status' => 'error', 'msg' => 'cmd : "'.$data->cmd.'" not exits', );
            }
            
        }
//        return $return;
    }
    
    
    public function validateData()
    {
//        dd($this->data);
        if(isset($this->data->cmd))
        {
            $this->convertHypherDelimitedToCamelCase();
            $apis = $this->apis()[$this->method];
            if(isset($apis[$this->data->cmd]))
            {
                $action = $this->convertHypherDelimitedToCamelCase();
                $className = $apis[$this->data->cmd]['class'];
                $this->actionClass = $this->getClassObject($className);
                return true;
            }
        }
        $this->error_msg = 'invalid CMD';
        return false;
    }

    private function isApiExists()
    {
        if(method_exists($this->actionClass, $this->data->cmd))
        {
            return true;
        }
        $this->error_msg = 'Cmd Method not "'+$this->data->cmd+'" exists';
        return false;
    }

    public function getErrorMsg()
    {
        return $this->error_msg;
    }

    private function convertHypherDelimitedToCamelCase()
    {
        $stringParts = explode('_', $this->data->cmd);
        if($stringParts)
        {
            $stringParts = array_map('ucfirst', $stringParts);
            $this->data->cmd = lcfirst(implode('', $stringParts));
        }
    }
    
    private function getClassObject($className)
    {
        switch ($className)
        {
            case 'PostApi':
                return new PostApi();
                break;

            default:
                break;
        }
    }
    
}
