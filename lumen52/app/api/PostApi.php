<?php

namespace App\Api;

use Illuminate\Http\Request;
use App\Posts;
use App\User;
use Illuminate\Support\Facades\Cache;
use \Illuminate\Cache\CacheManager;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Log;
class PostApi
{
    public function getAllPosts($request , $options = [])
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
    
    public function getUser($request , $options = [])
    {
        $result = User::find($request->user_id);
//        dd($result);
        $result->posts;
        return $result;
    }

    public function getUserSimple($request , $options = [])
    {
//        abort(403); to threw exception 
        $result = DB::select('select * from users where id = :id', [ 'id' => $request->user_id]);
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

}
