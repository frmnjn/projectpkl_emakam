<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Role_tpu;
use App\Tpu;
use App\Penghuni_makam;
use App\Makam;
use App\Blok_Makam;


class AdminPusatController extends Controller
{
    function __construct(){
        $this->middleware('jwt.auth');
    }

    function view(){
        $user = User::all();

        return response()->json($user);
    }

    function view_tpu(){
    	$tpu = Tpu::all();
        return response()->json($tpu);
        
    }

    function create_tpu(Request $request){

        return Tpu::create($request->all());

    }

    function edit_tpu(Request $request,$id){

        $tpu = Tpu::findOrFail($id);
        $tpu->update($request->all());

        return response()->json($tpu);

    }

    public function delete_tpu(Request $request, $id)
    {
        $penghuni_makam = DB::table('penghuni_makam')
            ->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
            ->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
            ->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
            // ->select('penghunimakam.*','blok_makam.*', 'tpu.*')
            ->where('tpu.id_tpu','=',$id)
            ->delete();

        $makam = DB::table('makam')
            ->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
            ->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
            // ->select('penghunimakam.*','blok_makam.*', 'tpu.*')
            ->where('tpu.id_tpu','=',$id)
            ->delete();

        $blokmakam = DB::table('blok_makam')
            ->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
            // ->select('penghunimakam.*','blok_makam.*', 'tpu.*')
            ->where('tpu.id_tpu','=',$id)
            ->delete();
        
        $tpu = Tpu::findOrFail($id);
        $tpu->delete();

        return response()->json($tpu);
    }
    
    function view_role_tpu(){
        $role_tpu = Role_tpu::all();
        return response()->json($role_tpu);
    }

    function create_role_tpu(Request $request)
    {
        $id_tpu = $request->input('id_tpu');
        $id_user = $request->input('id_user');

        $role_tpu = new Role_tpu([
            'id_tpu' => $id_tpu,
            'id_user' => $id_user
        ]);

        $role_tpu->save();

        return response()->json(['msg' => "Hak Akses Berhasil dibuat!"]);
    }

    function update_role_tpu(Request $request, $id_role_tpu)
    {
        $role_tpu = Role_tpu::findOrFail($id_role_tpu);
        
        $role_tpu->update($request->all());

        return response()->json(['msg' => "Hak Akses Berhasil di update!"]);
    }

    function delete_role_tpu(Request $request, $id_role_tpu)
    {
        $role_tpu = Role_tpu::findOrFail($id_role_tpu);
        $role_tpu->delete();

        return response()->json(['msg' => "Hak Akses Berhasil dihapus!"]);
    }

        function create_user(Request $request)
    {
        $username = $request->input('username');
        $password = Hash::make($request->input('password'));
        $role = $request->input('role');
        //$id_tpu = $request->input('id_tpu');
        //$id_user = "";

        $user = new User([
            'username' => $username,
            'password' => $password,
            'role' => $role
        ]);

        $user->save();
    }

    function update_user(Request $request, $id_user)
    {
        $user = User::findOrFail($id_user);


        $username = $request->input('username');
        $password = $request->input('password');
        $role = $request->input('role');

        $user->update([
            'username' => $request->input('username'),
            'password' => $request->input('password'),
            'role' => $request->input('role')
        ]);
        $role_tpu->save();

        return response()->json($username);
    }

    function delete_user(Request $request, $id_user)
    {
        $user = DB::table('user')->select('id_user')->where('id_user', '=', $id_user)->value('id_user');
        $role_tpu = DB::table('role_tpu')->select('id_user')->where('id_user', '=', $id_user)->value('id_user');
        if(empty($user)){
            $msg = ([
                'msg' => "Data User tidak ditemukan !"
            ]);
        } else {
            if(empty($role_tpu)){
                $user = User::findOrFail($id_user);
                $user->delete();
                $msg = ([
                    'msg' => "User berhasil dihapus"
                ]);
            } else {
                $msg = ([
                    'msg' => "Anda harus menghapus hak akses user terlebih dahulu !"
                ]);
            }
        }
        return response()->json($msg);
    }

    function constraint_user(){
        $user = DB::table('user')
        ->join('role_tpu', 'user.id_user', '=', 'role_tpu.id_user')
        ->join('tpu', 'role_tpu.id_tpu', '=', 'tpu.id_tpu')
        ->select('user.*', 'role_tpu.*','tpu.*')
        ->get();
        return response()->json($user);
    }
}
