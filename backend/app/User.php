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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function conversations()
    {
        return $this->belongsToMany('App\Conversation', 'conversation_user', 'user_id', 'conversation_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function contacts()
    {
        return $this->hasMany('App\Contact', 'owner_id')->with('user');
    }

    /**
     * @param $userId
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function directConversationByUserId($userId)
    {
        return $this->conversations()->where('direct', '=', true)
            ->whereHas('participants', function($query) use ($userId)  {
                $query->where('user_id', '=', $userId);
            })->with('messages')->first();
    }

    /**
     * @param $userId
     *
     * @return bool
     */
    public function hasUserInContacts($userId)
    {
        $contactCount =  $this->contacts()->where('user_id', '=', $userId)->count();

        return $contactCount > 0;
    }
}
