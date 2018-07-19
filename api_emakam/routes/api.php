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

//login
Route::middleware('cors')->post('login', 'AuthController@login');
Route::middleware('cors')->post('signin', 'AuthController@signin');
Route::middleware('cors')->post('hash', 'AuthController@hash');

//user
Route::middleware('cors')->get('user/view', 'AdminPusatController@view');
Route::middleware('cors')->post('create_user', 'AdminPusatController@create_user');
Route::middleware('cors')->put('update_user/{id_user}', 'AdminPusatController@update_user');
Route::middleware('cors')->delete('delete_user/{id_user}', 'AdminPusatController@delete_user');
Route::middleware('cors')->get('constraint_user', 'AdminPusatController@constraint_user');

//tpu
Route::middleware('cors')->get('tpu/view', 'AdminPusatController@view_tpu');
Route::middleware('cors')->post('tpu/create', 'AdminPusatController@create_tpu');
Route::middleware('cors')->put('tpu/edit/{id}', 'AdminPusatController@edit_tpu');
Route::middleware('cors')->delete('tpu/delete/{id}', 'AdminPusatController@delete_tpu');

//penghuni makam
Route::middleware('cors')->get('penghuni_makam/view', 'AdminPusatController@view_penghunimakam');
Route::middleware('cors')->post('penghuni_makam/create', 'AdminPusatController@create_penghunimakam');
Route::middleware('cors')->put('penghuni_makam/update/{id}', 'AdminPusatController@update_penghunimakam');
Route::middleware('cors')->delete('penghuni_makam/delete/{id}', 'AdminPusatController@delete_penghunimakam');

//makam
Route::middleware('cors')->get('makam/view', 'AdminPusatController@view_makam');
Route::middleware('cors')->post('makam/create', 'AdminPusatController@create_makam');
Route::middleware('cors')->put('makam/edit/{id}', 'AdminPusatController@edit_makam');
Route::middleware('cors')->delete('makam/delete/{id}', 'AdminPusatController@delete_makam');



//blok makam
Route::middleware('cors')->get('blok/view', 'AdminPusatController@view_blok');
Route::middleware('cors')->post('blok/create', 'AdminPusatController@create_blok');
Route::middleware('cors')->put('blok/edit/{id}', 'AdminPusatController@edit_blok');
Route::middleware('cors')->delete('blok/delete/{id}', 'AdminPusatController@delete_blok');


//role_tpu
Route::middleware('cors')->get('role_tpu/view', 'AdminPusatController@view_role_tpu');
Route::middleware('cors')->post('create_role_tpu', 'AdminPusatController@create_role_tpu');
Route::middleware('cors')->put('update_role_tpu/{id_role_tpu}', 'AdminPusatController@update_role_tpu');
Route::middleware('cors')->delete('delete_role_tpu/{id_role_tpu}', 'AdminPusatController@delete_role_tpu');


