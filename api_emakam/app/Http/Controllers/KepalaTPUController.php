<?php

namespace App\Http\Controllers;
use Storage;
use Illuminate\Http\Request;
    
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Role_tpu;
use App\Tpu;
use App\Penghuni_makam;
use App\Makam;
use App\Blok_Makam;
use App\Dokumen;



class KepalaTPUController extends Controller{
	function __construct(){
    }

	function view_dokumen(Request $request){
        $id_user=$request->input('id_user');
        $role=$request->input('role');
        
        if($role == '4'||$role == '5'){
            $view = DB::table('dokumen')
            ->join('kecamatan', 'kecamatan.id_kecamatan', '=', 'dokumen.id_kecamatan')
            ->join('role_kecamatan', 'role_kecamatan.id_kecamatan', '=', 'dokumen.id_kecamatan')
            ->where('role_kecamatan.id_user','=',$id_user)
            ->select('*')
            ->get();

            return $view;
        }else if($role == '1' || $role == '2'){
            $view = DB::table('dokumen')
            ->join('tpu', 'tpu.id_tpu', '=', 'dokumen.id_tpu')
            ->join('role_tpu', 'role_tpu.id_tpu', '=', 'dokumen.id_tpu')
            ->where('role_tpu.id_user','=',$id_user)
            ->select('*')
            ->get();

            return $view;
        }else{
            $view = DB::table('dokumen')
            ->select('*')
            ->get();

            return $view;

        }

    }

    function create_dokumen(Request $request){
		return Dokumen::create($request->all());
    }

    function update_dokumen(Request $request){
        $id=$request->input('id');
        $dokumen = Dokumen::findOrFail($id);
		$dokumen->update($request->all());

		return response()->json($dokumen);
    }



}