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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('cors')->post('login', 'AuthController@login');
Route::middleware('cors')->get('user/view', 'AdminPusatController@view');
Route::middleware('cors')->get('tpu/view', 'AdminPusatController@view_tpu');
Route::middleware('cors')->get('penghuni_makam/view', 'AdminPusatController@view_penghunimakam');
Route::middleware('cors')->post('penghuni_makam/create', 'AdminPusatController@create_penghunimakam');
Route::middleware('cors')->put('penghuni_makam/update/{id}', 'AdminPusatController@update_penghunimakam');
Route::middleware('cors')->delete('penghuni_makam/delete/{id}', 'AdminPusatController@delete_penghunimakam');
Route::middleware('cors')->get('blok/view', 'AdminPusatController@view_blok');
Route::middleware('cors')->get('role_tpu/view', 'AdminPusatController@view_role_tpu');
Route::middleware('cors')->put('update_user/{id_user}', 'AdminPusatController@update_user');
Route::middleware('cors')->delete('delete_user/{id_user}', 'AdminPusatController@delete_user');
