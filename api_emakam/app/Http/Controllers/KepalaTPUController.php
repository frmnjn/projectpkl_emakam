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

	function view_dokumen(){
        $view = DB::table('dokumen')
            ->select('*')
            ->get();
        return $view;
    }


    function update_dokumen(Request $request){
        $id=$request->input('id');
        $dokumen = Dokumen::findOrFail($id);
		$dokumen->update($request->all());

		return response()->json($dokumen);
    }



}