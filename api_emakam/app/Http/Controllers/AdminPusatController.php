<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Role_tpu;
use App\Tpu;
use App\Penghuni_makam;

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
        


        // $p_makam = new Penghuni_makam([
            // 'nama' => $nama,
            // 'alamat_terakhir' => $alamat_terakhir,
            // 'tanggal_wafat' => $tanggal_wafat,
            // 'status' => $status,
            // 'id_makam' => $id_makam,
            // 'nama_ahli_waris' => $nama_ahli_waris,
            // 'alamat_ahli_waris' => $alamat_ahli_waris,
            // 'nik_ahli_waris' => $nik_ahli_waris,
            // 'kontak_ahli_waris' => $kontak_ahli_waris,
        // ]);

        // $p_makam->save();
		// return $p_makam;
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
