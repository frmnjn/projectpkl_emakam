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
	function __construct(){
        $this->middleware('jwt.auth');
    }

	function view_search_penghunimakam(){
        $view = DB::table('penghuni_makam')
        ->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
        ->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
        ->select('penghuni_makam.*', 'makam.*')
        ->orderBy('id_penghuni_makam','desc')
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
}