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
use App\Notifikasi;




class NotifikasiController extends Controller{
	function __construct(){
    }

	function view_notifikasi(Request $request){
        $id=$request->input('id_user');
        $view = DB::table('notifikasi')
            ->select('*')
            ->limit(5)
            ->orderBy('id_notifikasi', 'desc')
            ->where('id_user','=',$id)
            ->get();
        return $view;
    }

    function create_dokumen(Request $request){
		return Notifikasi::create($request->all());
    }

    function update_notifikasi(Request $request){
        $id=$request->input('id_user');
        $notif = DB::table('notifikasi')
            ->where('id_user','=',$id)
            ->update(['status' => 'read']);

		return response()->json($notif);
    }



}