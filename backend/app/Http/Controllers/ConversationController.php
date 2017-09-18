<?php

namespace App\Http\Controllers;

use App\Conversation;
use Illuminate\Http\Request;
use App\User;
use JWTAuth;

class ConversationController extends Controller
{
    /**
     * ConversationController constructor.
     */
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Get direct conversation by sender and recipient
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request)
    {
        $this->validate($request, [
            'recipient_id' => 'required|integer'
        ]);

        $sender = JWTAuth::parseToken()->authenticate();
        User::findOrFail($request->input('recipient_id'));
        if($sender->id == $request->input('recipient_id')) {
            return response()->json(['message' => 'Recipient cannot be sender'], 422);
        }
        $conversation = $sender->directConversationByUserId($request->input('recipient_id'));
        if(!$conversation) {
            $conversation = Conversation::create([]);
            $conversation->participants()->attach([
                $request->input('recipient_id'),
                $sender->id
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
