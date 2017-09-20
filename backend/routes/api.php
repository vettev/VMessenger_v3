<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::resource('user', 'UserController', ['only' => ['show', 'update', 'destroy']]);
Route::post('/search', 'UserController@search');

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');
Route::get('/user', 'AuthController@getUser');

Route::post('/message', 'MessageController@store');

Route::post('/conversation', 'ConversationController@get');
Route::get('/conversation/{id}/messages', 'ConversationController@messages');

Route::resource('contact', 'ContactController', ['only' => [
    'index', 'store', 'update', 'destroy'
]]);