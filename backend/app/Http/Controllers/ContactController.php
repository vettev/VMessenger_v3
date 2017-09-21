<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Contact;
use JWTAuth;

class ContactController extends Controller
{
    /**
     * ContactController constructor.
     */
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $contacts = $user->contacts()->with('user')->get();
        if($contacts->count() > 0) {
            return response()->json(compact('contacts'), 200);
        }

        return response()->json(['message' => 'No contacts found'], 404);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|integer'
        ]);
        $userId =  $request->input('user_id');

        $owner = JWTAuth::parseToken()->authenticate();
        if($owner->id == $userId) {
            return response()->json(['message' => 'You cannot add yourself to contacts'], 422);
        }
        if($owner->hasUserInContacts($userId)) {
            return response()->json(['message' => 'You have this user in contacts already'], 422);
        }

        $contact = new Contact([
            'user_id' => $userId
        ]);
        $owner->contacts()->save($contact);
        $contact->user = $contact->user;

        return response()->json(['message' => 'Contact saved', 'contact' => $contact], 201);
    }
}
