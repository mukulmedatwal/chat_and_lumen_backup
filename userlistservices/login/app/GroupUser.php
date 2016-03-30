<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupUser extends Model
{
    protected $table = 'group_user';
    public $primaryKey = 'group_user_id';

    public $fillable = [   //
        'group_name',
        'group_image',
        'status',
    ];

//    public function users()
//    { 
//        return $this->belongsTo('App\User' , 'user_id' , 'id');
//    }
    

}
