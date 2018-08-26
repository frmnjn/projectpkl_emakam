<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PhpOffice\PhpWord\PhpWord;
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

	function cetak_dokumen(Request $request){
		$file   = storage_path('app/template.docx');
		$hasil   = storage_path('app/hasil.docx');
		$phpWord = new PhpWord();

		$doc   = $phpWord->loadTemplate($file);
		$doc -> setValue('nama_ahli_waris',$request->input('nama_ahli_waris'));
		$doc -> setValue('tanggal',$request->input('tanggal'));
		$doc -> setValue('nik_ahli_waris',$request->input('nik_ahli_waris'));
		$doc -> setValue('kontak_ahli_waris',$request->input('kontak_ahli_waris'));
		$doc -> saveAs($hasil);

		return response()->download($hasil)->deleteFileAfterSend(true);
	}
}
