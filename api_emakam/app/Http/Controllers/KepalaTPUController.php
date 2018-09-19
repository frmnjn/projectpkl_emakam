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
        ->join('penghuni_makam', 'dokumen.nama_pewaris', '=', 'penghuni_makam.nama_ahli_waris')
        ->join('makam','penghuni_makam.id_makam','=','makam.id_makam')
        ->join('blok_makam','makam.id_blok','=','blok_makam.id_blok')
        ->join('tpu','blok_makam.id_tpu','=','tpu.id_tpu')
        ->select('dokumen.id','dokumen.nama_almarhum','dokumen.nama_pewaris','dokumen.tgllhr_ahli_waris','dokumen.email','dokumen.pekerjaan_ahli_waris','dokumen.file_ktp','dokumen.file_kk','dokumen.file_surat_izin','dokumen.kelengkapan_dokumen','dokumen.status','penghuni_makam.id_penghuni_makam','penghuni_makam.nama','penghuni_makam.jenis_kelamin','penghuni_makam.alamat_terakhir','penghuni_makam.tanggal_lahir_alm','penghuni_makam.tanggal_wafat','penghuni_makam.tanggal_pemakaman','penghuni_makam.id_makam','penghuni_makam.nama_ahli_waris','penghuni_makam.alamat_ahli_waris','penghuni_makam.nik_ahli_waris','penghuni_makam.kontak_ahli_waris','makam.*','blok_makam.*','tpu.*')
        ->get();
        return response()->json($view);
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