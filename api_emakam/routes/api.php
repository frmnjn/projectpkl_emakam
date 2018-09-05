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

//ADMIN PUSAT
//login
Route::middleware('cors')->post('login', 'AuthController@login');
Route::middleware('cors')->post('signin', 'AuthController@signin');
Route::middleware('cors')->post('hash', 'AuthController@hash');

//change password
Route::middleware('cors')->post('change_password', 'AuthController@change_password');

//user
Route::middleware('cors')->get('user/view', 'AdminPusatController@view');
Route::middleware('cors')->post('create_user', 'AdminPusatController@create_user');
Route::middleware('cors')->put('update_user/{id_user}', 'AdminPusatController@update_user');
Route::middleware('cors')->delete('delete_user/{id_user}', 'AdminPusatController@delete_user');
Route::middleware('cors')->get('constraint_user', 'AdminPusatController@constraint_user');

//tpu
Route::middleware('cors')->get('tpu/view_byUser', 'AdminTPUController@view_tpu_byUser');
Route::middleware('cors')->get('tpu/view', 'AdminPusatController@view_tpu');
Route::middleware('cors')->post('tpu/create', 'AdminPusatController@create_tpu');
Route::middleware('cors')->put('tpu/edit/{id}', 'AdminPusatController@edit_tpu');
Route::middleware('cors')->delete('tpu/delete/{id}', 'AdminPusatController@delete_tpu');

//role_tpu
Route::middleware('cors')->get('role_tpu/view_byuser', 'AdminPusatController@view_role_byuser');
Route::middleware('cors')->get('role_tpu/view', 'AdminPusatController@view_role_tpu');
Route::middleware('cors')->post('create_role_tpu', 'AdminPusatController@create_role_tpu');
Route::middleware('cors')->put('update_role_tpu/{id_role_tpu}', 'AdminPusatController@update_role_tpu');
Route::middleware('cors')->delete('delete_role_tpu/{id_role_tpu}', 'AdminPusatController@delete_role_tpu');


//ADMIN TPU
//penghuni makam
Route::middleware('cors')->get('penghuni_makam/view', 'AdminTPUController@view_penghunimakam');
Route::middleware('cors')->post('penghuni_makam/create', 'AdminTPUController@create_penghunimakam');
Route::middleware('cors')->put('penghuni_makam/update/{id}', 'AdminTPUController@update_penghunimakam');
Route::middleware('cors')->delete('penghuni_makam/delete/{id}', 'AdminTPUController@delete_penghunimakam');

//makam
Route::middleware('cors')->get('makam/view', 'AdminTPUController@view_makam');
Route::middleware('cors')->post('makam/create', 'AdminTPUController@create_makam');
Route::middleware('cors')->put('makam/edit/{id}', 'AdminTPUController@edit_makam');
Route::middleware('cors')->delete('makam/delete/{id}', 'AdminTPUController@delete_makam');

//blok makam
Route::middleware('cors')->get('blok/view', 'AdminTPUController@view_blok');
Route::middleware('cors')->post('blok/create', 'AdminTPUController@create_blok');
Route::middleware('cors')->put('blok/edit/{id}', 'AdminTPUController@edit_blok');
Route::middleware('cors')->delete('blok/delete/{id}', 'AdminTPUController@delete_blok');

//polygon
Route::middleware('cors')->get('polygon/view', 'AdminTPUController@view_polygon');
Route::middleware('cors')->post('polygon/create', 'AdminTPUController@create_polygon');
Route::middleware('cors')->delete('polygon/delete/{id}', 'AdminTPUController@delete_polygon');

//Registrasi
Route::middleware('cors')->post('dokumen/upload', 'AdminTPUController@upload');

//PENGGUNA
//Search
Route::middleware('cors')->get('blok/view_search', 'PenggunaController@view_search_blok');
Route::middleware('cors')->get('penghuni_makam/view_search', 'PenggunaController@view_search_penghunimakam');


//mailing
Route::middleware('cors')->get('send', 'MailController@send');

//Dokumen
Route::middleware('cors')->get('dokumen/view', 'KepalaTPUController@view_dokumen');
Route::middleware('cors')->post('dokumen/update', 'KepalaTPUController@update_dokumen');
Route::middleware('cors')->post('dokumen/create', 'KepalaTPUController@create_dokumen');
Route::middleware('cors')->get('dokumen/view_picture', 'KepalaTPUController@view_picture');

Route::middleware('cors')->get('dokumen/view_siap_cetak', 'AdminKecamatan@view_dokumen_siap_cetak');
Route::middleware('cors')->get('dokumen/cetak', 'AdminKecamatan@cetak_dokumen');
