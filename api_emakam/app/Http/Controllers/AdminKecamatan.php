<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PhpOffice\PhpWord\PhpWord;
use File;
use App\User;
use App\Role_tpu;
use App\Tpu;
use App\Penghuni_makam;
use App\Makam;
use App\Blok_Makam;
use App\Dokumen;
use App\Polygon;

class AdminKecamatan extends Controller{
	function __construct(){
		$this->middleware('jwt.auth');
	}

	function view_dokumen_siap_cetak(){
        $view = DB::table('dokumen')
        	->join('penghuni_makam', 'dokumen.nama_almarhum', '=', 'penghuni_makam.nama')
        	->where('dokumen.kelengkapan_dokumen','=','Lengkap','AND','dokumen.status','=','Proses Selesai')
            ->select('dokumen.*','penghuni_makam.*')
            ->get();
        return response()->json($view);
    }

    function cetak_dokumen(Request $request){
		$file   = storage_path('app/template.docx');
		$hasil   = storage_path('app/hasil.docx');
		$phpWord = new PhpWord();

		$doc   = $phpWord->loadTemplate($file);
		$doc -> setValue('nama_ahli_waris',$request->input('nama_ahli_waris'));
		$doc -> setValue('tanggal',$request->input('tanggal'));
		$doc -> setValue('tanggal_sekarang',$request->input('tanggal_sekarang'));
		$doc -> setValue('nik_ahli_waris',$request->input('nik_ahli_waris'));
		$doc -> setValue('kontak_ahli_waris',$request->input('kontak_ahli_waris'));
		$doc -> saveAs($hasil);

		return response()->download($hasil)->deleteFileAfterSend(true);
	}

}
