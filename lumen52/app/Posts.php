<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    
    public $primaryKey = 'post_id';

    public $fillable = [   //
        'post_title',
        'post_description',
        'user_id',
    ];

    public function users()
    { 
        return $this->belongsTo('App\User' , 'user_id' , 'id');
    }
    

}
