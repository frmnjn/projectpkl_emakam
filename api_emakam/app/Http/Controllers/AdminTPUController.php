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


class AdminTPUController extends Controller{
	function __construct(){
		$this->middleware('jwt.auth');
	}

	function view_makam(Request $request){
		$id_tpu = $request->input('id_tpu');
		$view = DB::table('makam')
		->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
		->join('tpu', 'tpu.id_tpu', '=', 'blok_makam.id_tpu')
		->where('tpu.id_tpu','=',$id_tpu)
		->select('blok_makam.*', 'makam.*','tpu.*')
		->get();
		return response()->json($view);
	}

	function create_makam(Request $request){

		return Makam::create($request->all());

	}

	function edit_makam(Request $request,$id){

		$makam = Makam::findOrFail($id);
		$makam->update($request->all());

		return response()->json($makam);

	}

	function delete_makam(Request $request,$id){
		$penghuni_makam = DB::table('penghuni_makam')
		->where('penghuni_makam.id_makam','=',$id)
		->delete();

		$makam = Makam::findOrFail($id);
		$makam->delete();

		return response()->json($makam);

	}

	function view_penghunimakam(Request $request){
		$id_tpu = $request->input('id_tpu');
		$view = DB::table('penghuni_makam')
		->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
		->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
		->where('blok_makam.id_tpu','=',$id_tpu)
		->select('penghuni_makam.*', 'makam.*')
		->get();
		return response()->json($view);
	}

	function view_search_penghunimakam(){
		$view = DB::table('penghuni_makam')
		->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
		->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
		->select('penghuni_makam.*', 'makam.*')
		->get();
		return response()->json($view);
	}

	function create_penghunimakam(Request $request){

		$nama = $request->input('nama');
		$alamat_terakhir = $request->input('alamat_terakhir');
		$tanggal_wafat = $request->input('tanggal_wafat');
		$status = $request->input('status');
		$id_makam = $request->input('id_makam');
		$nama_ahli_waris = $request->input('nama_ahli_waris');
		$alamat_ahli_waris = $request->input('alamat_ahli_waris');
		$nik_ahli_waris = $request->input('nik_ahli_waris');
		$kontak_ahli_waris = $request->input('kontak_ahli_waris');

		return Penghuni_Makam::create(array(
			'nama' => $nama,
			'alamat_terakhir' => $alamat_terakhir,
			'tanggal_wafat' => $tanggal_wafat,
			'status' => $status,
			'id_makam' => $id_makam,
			'nama_ahli_waris' => $nama_ahli_waris,
			'alamat_ahli_waris' => $alamat_ahli_waris,
			'nik_ahli_waris' => $nik_ahli_waris,
			'kontak_ahli_waris' => $kontak_ahli_waris,
		));

	}

	public function update_penghunimakam(Request $request, $id)
	{
		$penghuni_makam = Penghuni_makam::findOrFail($id);
		$penghuni_makam->update($request->all());
		return $penghuni_makam;
	}

	public function delete_penghunimakam(Request $request, $id)
	{
		$penghuni_makam = Penghuni_makam::findOrFail($id);
		$penghuni_makam->delete();

		return 204;
	}

	function view_blok(Request $request){
		$id_tpu = $request->input('id_tpu');
		$view = DB::table('blok_makam')
		->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
		->where('tpu.id_tpu','=',$id_tpu)
		->select('blok_makam.*', 'tpu.*')
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

	function create_blok(Request $request){

		return Blok_Makam::create($request->all());

	}

	public function edit_blok(Request $request, $id)
	{
		$blok = Blok_Makam::findOrFail($id);
		$blok->update($request->all());
		return $blok;
	}

	public function delete_blok(Request $request, $id)
	{
		$penghuni_makam = DB::table('penghuni_makam')
		->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
		->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
            // ->select('penghunimakam.*','blok_makam.*', 'tpu.*')
		->where('blok_makam.id_blok','=',$id)
		->delete();

		$makam = DB::table('makam')
		->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
            // ->select('blok_makam.*', 'tpu.*')
		->where('blok_makam.id_blok','=',$id)
		->delete();

		$blok = Blok_Makam::findOrFail($id);
		$blok->delete();

		return response()->json($blok);
	}

	function view_role_tpu(){
		$role_tpu = Role_tpu::all();
		return response()->json($role_tpu);
	}

}
