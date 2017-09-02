<?php

namespace App\Http\Controllers;

use App\Conversation;
use Illuminate\Http\Request;
use App\User;

class ConversationController extends Controller
{
    public function get(Request $request)
    {
        $this->validate($request, [
            'sender_id' => 'required|integer|different:recipient_id',
            'recipient_id' => 'required|integer'
        ]);

        $sender = User::findOrFail($request->input('sender_id'));
        User::findOrFail($request->input('recipient_id'));
        $conversation = $sender->conversationByUserId(true, $request->input('recipient_id'));
        if(!$conversation) {
            $conversation = Conversation::create([]);
            $conversation->participants()->attach([
                $request->input('recipient_id'),
                $request->input('sender_id')
            ]);
        }

        return response()->json(['conversation' => $conversation]);
    }
    public function messages($id)
    {
        $conversation = Conversation::findOrFail($id);

        return response()->json(['messages' => $conversation->messages]);
    }
}
