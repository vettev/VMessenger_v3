<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'description', 'avatar', 'birthdate'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Set the user's password (crypted)
     *
     * @param $val
     */
    public function setPasswordAttribute($val) {
        $this->attributes["password"] = bcrypt($val);
    }

    public function conversations()
    {
        return $this->belongsToMany('App\Conversation', 'conversation_user', 'user_id', 'conversation_id');
    }

    public function conversationByUserId($direct, $userId)
    {
        return $this->conversations()->where('direct', '=', $direct)
            ->whereHas('participants', function($query) use ($userId)  {
                $query->where('user_id', '=', $userId);
            })->first();
    }
}
