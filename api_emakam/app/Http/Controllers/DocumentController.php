<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Dokumen;
use File;

class DocumentController extends Controller{
	// function __construct(){
	// 	$this->middleware('jwt.auth');
	// }

	function get_file_ktp(Request $request){
		$id = $request->input('id');
		$get_path_ktp = Dokumen::where('id','=',$id)->select('file_ktp')->get();
		$get_path_ktp = $get_path_ktp[0]->file_ktp;
		$get_path_ktp = str_replace('public', 'storage', $get_path_ktp);
		$url = 'http://localhost:8000/'.$get_path_ktp;
		return redirect()->away($url);
	}
	
	function get_file_kK(Request $request){
		$id = $request->input('id');
		$get_path_kk = Dokumen::where('id','=',$id)->select('file_kk')->get();
		$get_path_kk = $get_path_kk[0]->file_kk;
		$get_path_kk = str_replace('public', 'storage', $get_path_kk);
		$url = 'http://localhost:8000/'.$get_path_kk;
		return redirect()->away($url);
	}
}
