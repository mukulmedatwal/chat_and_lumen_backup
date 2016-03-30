<?php

namespace App\Api;

use JWTAuth;
use Illuminate\Support\Facades\Hash;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use App\Posts;
use App\User;
use App\Group;
use App\GroupUser;
use App\UserTopic;
use Illuminate\Support\Facades\Cache;
use \Illuminate\Cache\CacheManager;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Log;
class PostApi extends Api
{
    
    /**
     * Generate JSON Web Token.
     */
    protected function createToken(Request $request, $user)
    {
//        print_r($request->header('User-Agent'));
        $payload = [
            'sub' => $user->id,
            'iat' => time(),
//            'exp' => time() + (10),
            'exp' => time() + (2 * 7 * 24 * 60 * 60),
//            'ant' => $request->header('User-Agent')
        ];
        return JWT::encode($payload, '123456');
    }

    /**
     * Unlink provider.
     */
    public function unlink(Request $request, $provider)
    {
        $user = User::find($request['user']['sub']);
        if (!$user)
        {
            return response()->json(['message' => 'User not found']);
        }
        $user->$provider = '';
        $user->save();
        
        return response()->json(array('token' => $this->createToken($request , $user)));
    }
    
    public function getAllPosts(Request $request , $data ,  $options = [])
    {
//        $expiresAt = Carbon::now()->addMinutes(10);
//        $posts = Cache::put('abc', 'dsfs', $expiresAt);
//                $posts = Cache::get('abc');
//
//        dd($posts);
//       Debugbar::startMeasure('render','Time for rendering');
        $posts = new Posts();
        $results = $posts->find(10);
//        $results = $posts->with('users', function($query){
//            $query->where('user_id', '>', '0');
//            
//        })->get();
        $results->users;
//        $results->currentPage(3);
        
//        echo $results->appends(array('data' => '{"token":true,"cmd":"get_all_posts"}'))->links();
        Log::info('User failed to login.', [$results]);
        return $results;
//        Debugbar::stopMeasure('render');
//        return Posts::all();
    }
    
    public function getUser(Request $request , $data  , $options = [])
    {
        if(isset($data->user_id))
        {
            $result = User::find($data->user_id);
        }
        else if(isset($data->email)) 
        {
            $result = User::where('email' , $data->email)->get()->first();
        }
        else
        {
            $this->setErrorMsg('Invalid input data');  
            return false;
        }
        if($result) return $result;
        $this->setErrorMsg('email not found');
        return false;
    }

    public function getUserSimple(Request $request , $data , $options = [])
    {
//        abort(403); to threw exception 
        $result = DB::select('select * from users where id = :id', [ 'id' => $data->user_id]);
//        $result = User::find($request->user_id);
//        dd($users);
//        $result->posts;
        return $result;
        
//        DB::insert('insert into users (id, name) values (?, ?)', [1, 'Dayle']);
        
//        $affected = DB::update('update users set votes = 100 where name = ?', ['John']);
        
//        $deleted = DB::delete('delete from users');
        
//        DB::statement('drop table users');
        
        
//        DB::transaction(function () {
//            DB::table('users')->update(['votes' => 1]);
//         
//            DB::table('posts')->delete();
//        });

        /*
         * Manually Using Transactions
        
            DB::beginTransaction();   // start

            DB::rollBack();  // bollback when error comes

            DB::commit(); // commit transaction when peocess completed
         */
        #
        
    }

     public function login(Request $request , $data , $options = [])
    {
        $user = User::where('email', '=', $data->email)->first();
        if (!$user)
        {
            $this->setErrorMsg('Wrong email and/or password');
            return false;
        }
        if (Hash::check($data->password, $user->password))
        {
            $userTopics = UserTopic::getUserTopics($user->id);
            $defaultGroup = Group::getUserDefaultGroup($user->id);
//            dD($defaultGroup);
            unset($user->password);
            return ['token' => $this->createToken($request , $user) , 'user' => $user , 'topics' => $userTopics , 'default' => $defaultGroup[0]];
        }
        else
        {
//            return ['message' => 'Wrong email and/or password'];
            $this->setErrorMsg('Wrong email and/or password');
            return false;
        }
    }
    
    public function addUser(Request $request , $data , $options = [])
    {
        if( 
                !isset($data->email) || $data->email == '' ||
                !isset($data->name) || $data->name == '' 
//                !isset($data->age) || $data->age == ''  ||
//                !isset($data->gender) || $data->gender == ''  
        )
        {
            $this->setErrorMsg('invalid input data');
            return false;
        }
        $user = User::findByEmailOrFail($data->email);
        if($user) 
        {
            $this->setErrorMsg('user already exist');
            return false;
        }
        $user = new User;
        $user->name = $data->name;
        $user->email = $data->email;
        $user->password = '123456';
//        $user->address = $data->address;
//        $user->age = $data->age;
//        $user->gender = $data->gender;
//        $user->education = $data->education;
        if($user->save())
        {
            $userTopic = new UserTopic();
            $userTopic->user_id = $user->id;
            $userTopic->topic_key = UserTopic::getUserTopicKey($user->id);
            $userTopic->save();
            
            $defaultGroups = Group::where('is_default_group', '=', '1')->get();
            
            if($defaultGroups)
            {
//                dd($defaultGroups);
                foreach($defaultGroups as $defaultGroup)
                {
//                    dd($defaultGroup);
                    $groupUser = new GroupUser();
                    $groupUser->group_id = $defaultGroup->group_id;
                    $groupUser->user_id = $user->id;
                    $groupUser->status = 'a';
                    $groupUser->save();
                    
                    
                    $userTopic = new UserTopic();
                    $userTopic->user_id = $user->id;
                    $userTopic->group_id = $groupUser->group_id;
                    $userTopic->topic_key = UserTopic::getGroupTopicKey($groupUser->group_id);
                    $userTopic->save();
                    
                }
                $userTopics = UserTopic::getUserTopics($user->id);
                $defaultGroup = Group::getUserDefaultGroup($user->id);
                unset($user->password);
                return ['token' => $this->createToken($request , $user) , 'user' => $user, 'topics' => $userTopics , 'default' => $defaultGroup[0]];
            }
            ;
        }
        
        
        
        
        $this->setErrorMsg('unexpected error:');
        return false;
    }
    
    
    public function getAllUsers(Request $request , $data , $options = [])
    {
//        $expiresAt = Carbon::now()->addMinutes(10);
//        $posts = Cache::put('abc', 'dsfs', $expiresAt);
//               echo  $posts = Cache::get('abc');
        $users = new User();
        $results = $users->all();
        if($results)
        {
            return ['pages' => 5 , 'users' => $results];
        }
        $this->setErrorMsg('unexpected error:');
        return false;
    }
    
   
    public function updateUser(Request $request , $data , $options = [])
    {
        if(isset($data->user['id']))
        {
            $user = User::find($data->user['id']);
            $user->name = $data->user['name'];
            $user->email = $data->user['email'];
            $user->address = $data->user['address'];
            $user->education = $data->user['education'];
            $user->age = $data->user['age'];
            $user->gender = $data->user['gender'];
            if($user->save())
            {
                return $user;
            }
        }
        $this->setErrorMsg('unexpected error:');
        return false;
    }
    public function deleteUser(Request $request , $data , $options = [])
    {
        
        if(isset($data->user_id))
        {
            if(User::find($data->user_id)->delete())
            {
                return self::getAllUsers($request , $data , $options);
            }
        }
        $this->setErrorMsg('unexpected error:');
        return false;
    }
    public function deleteBulkUser(Request $request , $data , $options = [])
    {
//        dd($data->user_ids);
        if(isset($data->user_ids))
        {
            if(User::destroy($data->user_ids))
            {
                return self::getAllUsers($request , $data , $options);
            }
        }
        $this->setErrorMsg('unexpected error:');
        return false;
    }
    
    
    
    public function getChatList(Request $request , $data , $options = [])
    {
        $userId = $request->user->id;
        $results = DB::select('
            
            select u.id , u.name , ut.topic_key ,  if( ut.group_id , 1 , 0 ) is_group  , (
            select 
                group_concat(CONCAT_ws( "[--]",
                                        concat("msg(--)" ,message) , 
                                        concat("from_user_id(--)" ,from_user_id) , 
                                        concat("to_user_id(--)" ,to_user_id) , 
                                        concat("to_group_id(--)" ,to_group_id) , 
                                        concat("is_group_msg(--)" ,is_group_msg) , 
                                        concat("name(--)" ,if(from_user_id = :uid2 , "" , u.name) ) , 
                                        concat("is_seen(--)" ,is_seen) , 
                                        concat("created_at(--)" ,created_at) 
                                        ) SEPARATOR "[(---)]")
                from messages where  msg_key = createMessageKey(u.id , :id1) ) chats  from users u
                        join user_topic ut on ut.user_id = u.id and ut.group_id = 0 
                        where u.id != :uid

                        union
                        select g.group_id , g.group_name , ut.topic_key ,  if( ut.group_id , 1 , 0 ) is_group , 
                         (
                            select 
                                group_concat(CONCAT_ws( "[--]",
                                                        concat("msg(--)" ,message) , 
                                                        concat("from_user_id(--)" ,from_user_id) , 
                                                        concat("to_user_id(--)" ,to_user_id) , 
                                                        concat("to_group_id(--)" ,to_group_id) , 
                                                        concat("is_group_msg(--)" ,is_group_msg) , 
                                                        concat("name(--)" ,if(from_user_id = :uid3 , "" , ( select su.name from users su where su.id = from_user_id ))) , 
                                                        concat("is_seen(--)" ,is_seen) , 
                                                        concat("created_at(--)" ,created_at) 
                                                        ) SEPARATOR "[(---)]")
                                from messages where  to_group_id = g.group_id  ) chats
                                from groups g 
                        join group_user gu on gu.group_id = g.group_id 
                        join user_topic ut on ut.group_id = g.group_id 

                        where gu.user_id = :id', [ 'uid' => $userId ,'uid2' => $userId ,'uid3' => $userId , 'id1' => $userId , 'id' => $userId]);
//        $results = DB::select('select u.id , u.name , ut.topic_key ,  if( ut.group_id , 1 , 0 ) is_group  ,  "" chats  from users u
//                        join user_topic ut on ut.user_id = u.id and ut.group_id = 0 
//                        where u.id != :uid
//
//                        union
//                        select g.group_id , g.group_name , ut.topic_key ,  if( ut.group_id , 1 , 0 ) is_group , "" chats from groups g 
//                        join group_user gu on gu.group_id = g.group_id 
//                        join user_topic ut on ut.group_id = g.group_id 
//
//                        where gu.user_id = :id', [ 'uid' => $userId , 'id' => $userId]);
//        $users = new User();
//        $results = $users->all();
        if($results)
        {
            $data = [];
            $i = 0;
            foreach ($results as $key => $result)
            {
                $data[$i]['id'] = $result->id;
                $data[$i]['topic_key'] = $result->topic_key;
                $data[$i]['name'] = $result->name;
                $data[$i]['is_group'] = $result->is_group;
                $data[$i]['chats'] = [];
                
                $messagesData  = explode('[(---)]', $result->chats);
                if($messagesData)
                {
                    foreach($messagesData as $message )
                    {
                        $messageRow  = explode('[--]', $message);
                        
                        if($messageRow)
                        {
                            $rowKeyVal = [];
//                            $i = 0;
                            foreach($messageRow as $messageColumnAndValue)
                            {
                                $arrMessageColumnAndValue  = explode('(--)', $messageColumnAndValue);
//                                print_r($arrMessageColumnAndValue);
                                if(isset($arrMessageColumnAndValue[1]))
                                $rowKeyVal[$arrMessageColumnAndValue[0]] = $arrMessageColumnAndValue[1];
//                                echo $messageColumnAndValue;
//                                $i++;?
                            }
                            $rowKeyVal['user_image'] = 'http://www.planwallpaper.com/static/images/Winter-Tiger-Wild-Cat-Images.jpg';
                            $data[$i]['chats'][] = $rowKeyVal;
//                            print_r($rowKeyVal);
                        }
                    }
                    
                }
                $i++;
            }
//            print_r($results);
//            return $results;
            return $data;
        }
        $this->setErrorMsg('unexpected error:');
        return false;
    }
    
    
    public function getLimit($pageNo = '0',$pageSize = '10')
    {
        $limit['start'] = '0';
        if($pageNo > 0)
        {
            $limit['start'] = $pageNo*$pageSize;               
        }        
        return $limit;
    }
    
//     $sqlWithLimit = $sql." LIMIT {$filter['limit']} OFFSET {$filter['offset']}";
    
//     'offset' => $limit['start'],
//    'limit' => $pageSize,
}
