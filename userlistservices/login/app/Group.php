<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class Group extends Model
{
    
    protected $table = 'groups';
    public $primaryKey = 'group_id';

    public $fillable = [   //
        'group_name',
        'group_image',
        'status',
    ];
    
    
    
    public static function getUserDefaultGroup($userId)
    {
        return DB::select('
                        select g.group_id as id , g.group_name as name , ut.topic_key ,  if( ut.group_id , 1 , 0 ) is_group from groups g 
                        join group_user gu on gu.group_id = g.group_id 
                        join user_topic ut on ut.group_id = g.group_id 

                        where gu.user_id = :id and g.is_default_group = 1  limit 1', [ 'id' => $userId]);
    }

//    public function users()
//    { 
//        return $this->belongsTo('App\User' , 'user_id' , 'id');
//    }
    

}
