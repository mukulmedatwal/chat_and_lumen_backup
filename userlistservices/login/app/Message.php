<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table = 'messages';
    public $primaryKey = 'message_id';

//    public $fillable = [   //
//        'user_id',
//        'group_id',
//        'topic_key',
//    ];
//    
    public static function createMessageKey($from_user_id , $to_user_id)
    {
         //create thead key
        $threadKey = '';
        if( $from_user_id > $to_user_id )
            $threadKey = $to_user_id.':'.$from_user_id;
        else
            $threadKey = $from_user_id.':'.$to_user_id;
        return $threadKey;
    }
    

}
