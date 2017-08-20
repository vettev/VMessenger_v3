<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['sender_id', 'body', 'conversation_id'];

    public function conversation()
    {
        return $this->belongsTo('App\Conversation');
    }
    public function sender()
    {
        return $this->belongsTo('App\User');
    }
}
