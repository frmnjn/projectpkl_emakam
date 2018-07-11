<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Role_tpu;
use App\Tpu;
use App\Penghuni_makam;
use App\Makam;


class AdminPusatController extends Controller
{
    function view(){
        $user = User::all();

        return response()->json($user);
    }

    function constraint_user(){
        $user = DB::table('user')
        ->join('role_tpu', 'user.id_user', '=', 'role_tpu.id_user')
        ->join('tpu', 'role_tpu.id_tpu', '=', 'tpu.id_tpu')
        ->select('user.*', 'role_tpu.*','tpu.*')
        ->get();
        return response()->json($user);
    }

    function view_tpu(){
    	$tpu = Tpu::all();
        return response()->json($tpu);
        
    }

    function view_makam(){
    	$view = DB::table('makam')
        ->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
        ->join('tpu', 'tpu.id_tpu', '=', 'blok_makam.id_tpu')
        ->select('blok_makam.*', 'makam.*','tpu.*')
        ->get();
        return response()->json($view);
    }

    function create_makam(Request $request){

        return Makam::create($request->all());

    }

    function edit_makam(Request $request,$id){

        $makam = Makam::findOrFail($id);
        $makam->update($request->all());

        return response()->json($makam);

    }

    function delete_makam(Request $request,$id){
        $penghuni_makam = DB::table('penghuni_makam')
            ->where('penghuni_makam.id_makam','=',$id)
            ->delete();
        
        $makam = Makam::findOrFail($id);
        $makam->delete();

        return response()->json($makam);

    }
    
    function view_penghunimakam(){
        $view = DB::table('penghuni_makam')
        ->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
        ->select('penghuni_makam.*', 'makam.*')
        ->get();
        return response()->json($view);
    }

    function create_penghunimakam(Request $request){

        $nama = $request->input('nama');
        $alamat_terakhir = $request->input('alamat_terakhir');
        $tanggal_wafat = $request->input('tanggal_wafat');
        $status = $request->input('status');
        $id_makam = $request->input('id_makam');
        $nama_ahli_waris = $request->input('nama_ahli_waris');
        $alamat_ahli_waris = $request->input('alamat_ahli_waris');
        $nik_ahli_waris = $request->input('nik_ahli_waris');
        $kontak_ahli_waris = $request->input('kontak_ahli_waris');

        return Penghuni_Makam::create(array(
            'nama' => $nama,
            'alamat_terakhir' => $alamat_terakhir,
            'tanggal_wafat' => $tanggal_wafat,
            'status' => $status,
            'id_makam' => $id_makam,
            'nama_ahli_waris' => $nama_ahli_waris,
            'alamat_ahli_waris' => $alamat_ahli_waris,
            'nik_ahli_waris' => $nik_ahli_waris,
            'kontak_ahli_waris' => $kontak_ahli_waris,
        ));
        
    }
    
    public function update_penghunimakam(Request $request, $id)
    {
        $penghuni_makam = Penghuni_makam::findOrFail($id);
        $penghuni_makam->update($request->all());
        return $penghuni_makam;
    }

    public function delete_penghunimakam(Request $request, $id)
    {
        $penghuni_makam = Penghuni_makam::findOrFail($id);
        $penghuni_makam->delete();

        return 204;
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

    function create_role_tpu(Request $request)
    {
        $id_tpu = $request->input('id_tpu');
        $id_user = $request->input('id_user');

        $role_tpu = new Role_tpu([
            'id_tpu' => $id_tpu,
            'id_user' => $id_user
        ]);

        $role_tpu->save();

        return response()->json($role_tpu);
    }

    function update_role_tpu(Request $request, $id_user)
    {
        $role_tpu = Role_tpu::findOrFail($id_user);
        
        $role_tpu->update($request->all());

        return response()->json(['msg' => "Hak Akses Berhasil di update!"]);
    }

    function delete_role_tpu(Request $request, $id_user)
    {
        $role_tpu = Role_tpu::findOrFail($id_user);
        $role_tpu->delete();

        return response()->json(['msg' => "Hak Akses Berhasil dihapus!"]);
    }
}
