<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Message;
use App\User;
use App\Conversation;
use App\Events\MessageSent;
use JWTAuth;

class MessageController extends Controller
{
    /**
     * MessageController constructor.
     */
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'recipient_id' => 'required|integer',
            'conversation_id' => 'required|integer',
            'body' => 'required'
        ]);

        $senderId = JWTAuth::parseToken()->authenticate()->id;
        $recipientId = $request->input('recipient_id');
        $conversationId = $request->input('conversation_id');
        $body = $request->input('body');

        User::findOrFail($senderId);
        User::findOrFail($recipientId);
        $conversation = Conversation::findOrFail($conversationId);
        $participants = $conversation->participants;
        if( !($participants->contains('id', $recipientId)
            && $participants->contains('id', $senderId)) ) {
            return response()->json(['message' => 'Something is wrong in conversation id'], 422);
        }

        $message = new Message([
            'sender_id' => $senderId,
            'body' => $body
        ]);

        $conversation->messages()->save($message);
        event(new MessageSent($message, $recipientId));

        return response()->json(['message' => $message]);
    }
}
