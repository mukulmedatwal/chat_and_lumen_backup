<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserTopic extends Model
{
    protected $table = 'user_topic';
    public $primaryKey = 'user_topic_id';

    public $fillable = [   //
        'user_id',
        'group_id',
        'topic_key',
    ];
    
    
    const TOPIC_KEY_USER = 'u';
    const TOPIC_KEY_GROUP = 'g';
    const TOPIC_KEY_LENGTH = 11;
    
    public static function getUserTopicKey($userId) 
    {
        return self::TOPIC_KEY_USER  .  str_pad($userId, self::TOPIC_KEY_LENGTH ,0, STR_PAD_LEFT);
    }
    
    public static function getGroupTopicKey($groupId) 
    {
        return self::TOPIC_KEY_GROUP  .  str_pad($groupId, self::TOPIC_KEY_LENGTH ,0, STR_PAD_LEFT);
    }
    
    public function addTopicKey()
    {
        
    }
    
    public static function getUserTopics($userId)
    {
        return self::where('user_id', '=', $userId)->get(array('topic_key', 'group_id'));
    }

//    public function users()
//    { 
//        return $this->belongsTo('App\User' , 'user_id' , 'id');
//    }
    

}
