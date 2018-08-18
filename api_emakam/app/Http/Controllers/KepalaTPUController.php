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
use App\Dokumen;



class KepalaTPUController extends Controller{
	function __construct(){
        $this->middleware('jwt.auth');
    }

	function view_dokumen(){
        $view = DB::table('dokumen')
            ->select('*')
            ->get();
        return $view;
    }

    function view_search_blok(){
        $view = DB::table('blok_makam')
        ->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
        ->select('blok_makam.*', 'tpu.*')
        ->get();
        return response()->json($view);
    }
}