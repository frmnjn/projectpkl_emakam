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

class AuthController extends Controller
{
    function login(Request $request){
        //$user = DB::table('users')->where($request->all())->get();
        $user = DB::table('user')
        ->join('role_tpu', 'user.id_user', '=', 'role_tpu.id_user')
        ->where($request->all())->select('user.*', 'role_tpu.*')
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

        $user = User::where('username','=',$request->input('username'),'AND','password','=',Hash::make($request->input('password')))->select('id_user','role')->get();
       // DB::table('user')
       //      ->join('role_tpu', 'user.id_user', '=', 'role_tpu.id_user')
       //      ->where($request->all())->select('user.*', 'role_tpu.*')
       //      ->get();




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
                'role' => $user[0]->role,
                'id_user' => $role_tpu[0]->id_user
            ]
        ];
        } else {
            $resp = [
            [
                'msg'=>'Login Berhasil !',
                'success' => true, 
                'token'=> $token,
                'role' => $user[0]->role
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
}
