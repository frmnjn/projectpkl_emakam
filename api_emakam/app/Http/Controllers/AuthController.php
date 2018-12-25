<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Validator;
use JWTAuth;
use JWTAuthException;
use App\User;
use App\Role_tpu;
use App\Role_kecamatan;
use App\Dokumen;


class AuthController extends Controller
{
    function login(Request $request){
        //$user = DB::table('users')->where($request->all())->get();
        $user = DB::table('user')
        ->join('role_tpu', 'user.id_user', '=', 'role_tpu.id_user')
        ->where($request->all())->select('user.*')
        ->get();

        return response()->json($user);
    }

    function view(){
    	$user = DB::table('user')
        ->join('role_tpu', 'user.id_user', '=', 'role_tpu.id_user')
        ->where($request->all())->select('user.*', 'role_tpu.*')
        ->get();

        return response()->json($user);
    }

    function change_password(Request $request){
        $oldpassword = $request->input('oldpassword');
        $newpassword = $request->input('newpassword');
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        if (Hash::check($oldpassword, $user->password)) {
            $changepassword_status = User::findOrFail($user->id_user);
            $changepassword_status->update(['password' => Hash::make($request->input('newpassword'))]);
            if($changepassword_status){
                return response()->json(['msg' => 'change password success','success' => true,'role' => $user->role]);
            } else {
                return response()->json(['msg' => 'change password failed','success' => false]);
            }
        } else {
            return response()->json(['msg' => 'password doesnt match','success' => false]);
        }
    }

    public function signin(Request $request)
    {
        $credentials = [
            'username' => $request->input('username'),
            'password' => $request->input('password')
        ];
        
        $rules = [
            'username' => 'required',
            'password' => 'required',
        ];

        $user = User::where('username','=',$request->input('username'),'AND','password','=',Hash::make($request->input('password')))->select('id_user','role','username')->get();

        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()]);
        }
        
        $token = null;
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['success' => false, 'error' => 'Akun tidak ditemukan!', 
                    'username'=> $request->input('username'),
                    'password'=> Hash::make($request->input('password'))],401);
            }
        } catch (JWTAuthException $e) {
            return response()->json(['msg'=>'Login Gagal !','success' => false, 'error' => 'Failed to login, please try again.'], 500);
        }

        if($user[0]->role == 1){
            $role_tpu = Role_tpu::where('id_user','=',$user[0]->id_user)->select('id_user')->get();
            $resp = [
                [
                    'msg'=>'Login Berhasil !',
                    'success' => true, 
                    'token'=> $token,
                    'username' => $user[0]->username,
                    'role' => $user[0]->role,
                    'id_user' => $role_tpu[0]->id_user,

                ]
            ];
        } else {
            $resp = [
                [
                    'msg'=>'Login Berhasil !',
                    'success' => true, 
                    'token'=> $token,
                    'username' => $user[0]->username,
                    'role' => $user[0]->role,
                    'id_user' => $user[0]->id_user,
                ]
            ];
        }

        
        return response()->json($resp);
    }

    function hash(Request $request){
        $pass = [
            'secret' => Hash::make($request->input('password'))
        ];
        return response()->json($pass);
    }

    function track_progress(Request $request){
        $view = DB::table('dokumen')
        ->where($request->all())
        ->select('nama_almarhum','status')
        ->get();

        return response()->json($view);
    }
}
