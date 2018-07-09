<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

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
}
