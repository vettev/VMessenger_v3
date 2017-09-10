<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Contact;

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
        $contacts = $user->contacts->with('user');
        if(count($contacts) > 0) {
            return response()->json(compact('contacts'), 200);
        }

        return response()->json(['message' => 'No contacts found'], 404);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|integer'
        ]);

        $owner = JWTAuth::parseToken()->authenticate();

        $contact = new Contact([
            'user_id' => $request->input('user_id')
        ]);
        $owner->contacts()->save($contact);
    }
}
