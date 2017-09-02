<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;
use App\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $this->validate($request, [
            "email" => "email|required",
            "password" => "required"
        ]);

        $credentials = request()->only("email", "password");

        try {
            if(! $token = JWTAuth::attempt($credentials)) {
                return response()->json(["error" => "Invalid credentials"], 401);
            }
        } catch ( JWTException $e) {
            return response()->json(["error" => "Could not create token"], 500);
        }
        $user = User::where('email', '=', $request->input('email'))->first();

        return response()->json(compact('user', 'token'), 200);
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            "email" => "required|email|unique:users",
            "name" => "required|string",
            "password" => "required|min:6|same:re_password",
            "re_password" => "required"
        ]);

        $name = $request->input("name");
        $email = $request->input("email");
        $password = $request->input("password");

        $user = User::create([
            "name" => $name,
            "email" => $email,
            "password" => $password
        ]);

        $response = [
            "message" => "User created",
            "user" => $user,
        ];

        return response()->json($response, 201);
    }

    public function getUser() {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(compact('user'));
    }
}
