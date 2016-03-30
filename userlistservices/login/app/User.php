<?php

namespace App;

use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Model implements
    AuthenticatableContract,
    AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email','password'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];
    
    public function posts()
    { 
        return $this->hasMany('App\Posts' , 'user_id' , 'id');
    }
    
    public function  setPasswordAttribute($value) 
    {
        $this->attributes['password'] = Hash::make($value);
    }
    
    public static function findByEmailOrFail(
        $email,
        $columns = array('*')
    ) {
        if ( ! is_null($user = static::where('email' , $email)->first($columns))) {
            return $user;
        }

        return false;
    }
}
