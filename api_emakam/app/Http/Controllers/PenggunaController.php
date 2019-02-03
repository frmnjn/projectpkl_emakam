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


class PenggunaController extends Controller{
	// function __construct(){
    //     $this->middleware('jwt.auth');
    // }

	function view_all_makam(){
        // $makam = Makam::all();
        // return response()->json($makam);

        $view = DB::table('makam')
        ->join('blok_makam', 'blok_makam.id_blok', '=', 'makam.id_blok')
        ->select('blok_makam.*', 'makam.*')
        ->get();

        return response()->json($view);
    }

    function view_all_pmakam(){
        $pmakam = Penghuni_makam::all();
        return response()->json($pmakam);
    }

    

    function view_search_penghunimakam(Request $request){
        $id_user=$request->input('id_user');
        $role=$request->input('role');
        if($role == '1' || $role == '2'){
            $view = DB::table('penghuni_makam')
            ->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
            ->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
            ->join('tpu', 'tpu.id_tpu', '=', 'blok_makam.id_tpu')
            ->join('role_tpu','role_tpu.id_tpu','=', 'blok_makam.id_tpu')
            ->select('penghuni_makam.*', 'makam.*')
            ->where('role_tpu.id_user','=',$id_user)
            ->orderBy('id_penghuni_makam','desc')
	    ->distinct()->get();
        } else {
            $view = DB::table('penghuni_makam')
            ->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
            ->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
            ->join('tpu', 'tpu.id_tpu', '=', 'blok_makam.id_tpu')
            ->join('role_tpu','role_tpu.id_tpu','=', 'blok_makam.id_tpu')
            ->select('penghuni_makam.*', 'makam.*')
            ->orderBy('id_penghuni_makam','desc')->distinct()->get();
        }
        return response()->json($view);
    }

    function view_all_tpu(){
        $view = DB::table('tpu')
		->select('*')
		->get();

		return response()->json($view);
        
    }


    function view_search_blok(){
        $view = DB::table('blok_makam')
        ->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
        ->select('blok_makam.*', 'tpu.*')
        ->get();
        return response()->json($view);
    }

    function view_blok_by_idTPU(Request $request){
        $id_tpu=$request->input('id_tpu');
        $view = DB::table('blok_makam')
        ->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
        ->select('blok_makam.*', 'tpu.*')
        ->where('tpu.id_tpu','=',$id_tpu)
        ->get();
        return response()->json($view);
    }
}
