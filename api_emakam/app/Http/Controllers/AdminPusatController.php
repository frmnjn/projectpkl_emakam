<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Role_tpu;
use App\Tpu;

class AdminPusatController extends Controller
{
    function view(){
    	$user = DB::table('user')
            ->join('role_tpu', 'user.id_user', '=', 'role_tpu.id_user')
            ->select('user.*', 'role_tpu.*')
            ->get();

		return response()->json($user);
    }

    function view_tpu(){
    	$tpu = Tpu::all();
        return response()->json($tpu);
        
    }
    
    function view_penghunimakam(){
        $view = DB::table('penghuni_makam')
            ->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
            ->select('penghuni_makam.*', 'makam.*')
            ->get();
		return response()->json($view);
    }

    function view_blok(){
    	$view = DB::table('blok_makam')
            ->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
            ->select('blok_makam.*', 'tpu.*')
            ->get();
		return response()->json($view);
    }


    function view_role_tpu(){
    	$role_tpu = Role_tpu::all();
		return response()->json($role_tpu);
    }

    function create_user(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');
        $role = $request->input('role');
        $id_tpu = $request->input('id_tpu');
        $id_user = "";

        $user = new User([
            'username' => $username,
            'password' => $password,
            'role' => $role
        ]);

        $role_tpu = new Role_tpu([
            'id_tpu' => $id_tpu,
            'id_user' => $id_user
        ]);
    }

    function update_user(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());

        return $user;
    }

    function delete_user(Request $request, $id_user)
    {
    	$role_tpu = Role_tpu::findOrFail($id_user);
        $user = User::findOrFail($id_user);
        $role_tpu->delete();
        $user->delete();
       
        return 204;
    }
}
