<?php

namespace App\Http\Controllers;
use App\Mail\EmailNotification;
use Mail;
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
use App\Polygon;

class AdminTPUController extends Controller{
	function __construct(){
		$this->middleware('jwt.auth');
	}

	function view_makam(Request $request){

		$id_user=$request->input('id_user');
		$view = DB::table('makam')
		->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
		->join('tpu', 'tpu.id_tpu', '=', 'blok_makam.id_tpu')
		->join('role_tpu','role_tpu.id_tpu','=', 'blok_makam.id_tpu')
		->select('blok_makam.*', 'makam.*','tpu.nama_tpu','tpu.id_tpu','tpu.id_kecamatan')
		->where('role_tpu.id_user','=',$id_user)
		->orderBy('id_makam','desc')
		->get();
		return response()->json($view);
	}

	function create_makam(Request $request){

		try{

			Makam::create($request->all());
			return response()->json(["pembuatan makam sukses"]);

		}catch(Exception $e){
			return response()->json(["pembuatan makam gagal"]);

		}

		


	}

	function edit_makam(Request $request,$id){
		try{
			$makam = Makam::findOrFail($id);
			$makam->update($request->all());
	
			return response()->json(["edit makam sukses"]);
		}catch(Exception $e){

		}

		
	}

	function delete_makam(Request $request,$id){
		try{
			$penghuni_makam = DB::table('penghuni_makam')
			->where('penghuni_makam.id_makam','=',$id)
			->delete();
	
			$makam = Makam::findOrFail($id);
			$makam->delete();
	
			return response()->json(["delete makam sukses"]);
		}catch(Exception $e){
			
		}
		

	}

	function delete_expire_makam(Request $request){
		$makam = DB::table('makam')
		->leftjoin('penghuni_makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
		->select('makam.*','penghuni_makam.*')
		->where('created_at','<=',NOW()->subYears(3))
		->delete();


		return response()->json($makam);

	}

	

	function view_penghunimakam(Request $request){
		$id_user=$request->input('id_user');
		$view = DB::table('penghuni_makam')
		->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
		->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
		->join('tpu', 'tpu.id_tpu', '=', 'blok_makam.id_tpu')
		->join('role_tpu','role_tpu.id_tpu','=', 'blok_makam.id_tpu')
		->select('penghuni_makam.*', 'makam.*','tpu.*')
		->where('role_tpu.id_user','=',$id_user)
		->orderBy('id_penghuni_makam','desc')
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
		try{
			$penghuni_makam = Penghuni_makam::create($request->all());
			return $penghuni_makam;
		}catch(Exception $e){

		}

		
	}

	public function update_penghunimakam(Request $request, $id)
	{
		try{
			$penghuni_makam = Penghuni_makam::findOrFail($id);
			$penghuni_makam->update($request->all());
			return response()->json(["update penghuni makam sukses"]);
		}catch(Exception $e){

		}
		
	}

	public function delete_penghunimakam(Request $request, $id)
	{
		try{
			$penghuni_makam = Penghuni_makam::findOrFail($id);
			$penghuni_makam->delete();
			return response()->json(["delete penghuni makam sukses"]);
		}catch(Exception $e){

		}
		
	}

	function view_blok(Request $request){
		$id_user = $request->input('id_user');
		$view = DB::table('blok_makam')
		->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
		->join('role_tpu','role_tpu.id_tpu','=', 'tpu.id_tpu')
		->select('blok_makam.*', 'tpu.*')
		->where('role_tpu.id_user','=',$id_user)
		->orderBy('id_blok','desc')
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
		try{
			return Blok_Makam::create($request->all());
		}catch(Exception $e){

		}


	}

	public function edit_blok(Request $request, $id)
	{
		try{
			$blok = Blok_Makam::findOrFail($id);
			$blok->update($request->all());
			return response()->json(["edit blok makam sukses"]);
		}catch(Exception $e){

		}
		
	}

	public function delete_blok(Request $request, $id)
	{
		try{
			$penghuni_makam = DB::table('penghuni_makam')
			->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
			->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
			->where('blok_makam.id_blok','=',$id)
			->delete();

			$makam = DB::table('makam')
			->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
			->where('blok_makam.id_blok','=',$id)
			->delete();

			$blok = Blok_Makam::findOrFail($id);
			$blok->delete();

			return response()->json(["delete blok makam sukses"]);
		}catch(Exception $e){

		}
		
	}

	function view_role_tpu(){
		$role_tpu = Role_tpu::all();
		return response()->json($role_tpu);
	}

	function view_tpu_byUser(request $request){
		$id=$request->input('id_user');
		$view = DB::table('tpu')
		->join('role_tpu','tpu.id_tpu','=','role_tpu.id_tpu')
		->where('role_tpu.id_user','=',$id)
		->get();
		return response()->json($view);

	}
	
	function view_polygon(Request $request){
		$table = DB::table('polygon')
		->select('polygon.*')
		->orderBy('id_polygon', 'asc')
		->get();
		return $table;
	}

	public function create_polygon(Request $request)
	{
		try{
			return Polygon::create($request->all());
		}catch(Exception $e){
			
		}

	}

	public function delete_polygon(Request $request, $id)
	{
		try{
			$table = DB::table('polygon')
			->where('polygon.id_blok','=',$id)
			->delete();
			return $table;
		}catch(Exception $e){

		}
		
	}

	function upload(Request $request){
		try{

		$ktp = $request->file('file_ktp');
		$kk = $request->file('file_kk');
		$sk = $request->file('file_sk');
		$sk_lama = $request->file('file_sk_lama');

		$surat_izin = $request->file('file_surat_izin');
		$progress= 'Menunggu Persetujuan Kepala UPT';
		$dokumen= 'Lengkap';
		$status1 = true; $status2 = true; $status3 = true; $status4 = false;

		

		if(!empty($ktp)) {
			$status1= true;
		}
		if(!empty($kk)) {
			$status2 = true;
		}
		if(!empty($surat_izin)) {
			$status3 = true;
		}
		if(!empty($sk)) {
			$status4 = true;
		}
		if($status1 && $status2 && $status3 && $status3){
			$path_ktp = $ktp->store('public/files');
			$path_kk = $kk->store('public/files');
			$path_surat_izin = $surat_izin->store('public/files');
			$path_sk = $surat_izin->store('public/files');
			$path_sk_lama;
			
			if(!empty($sk_lama)){
				$path_sk_lama = $surat_izin->store('public/files');
			}else{
				$path_sk_lama="Kosong";
			}




			$create=Dokumen::create(array(
				'kode_registrasi' => '',
				'nama_almarhum' => $request->input('nama_almarhum'),
				'nama_pewaris' => $request->input('nama_pewaris'),
				'email' => $request->input('email'),
				'pekerjaan_ahli_waris' => $request->input('pekerjaan_ahli_waris'),
				'id_penghuni_makam' => $request->input('id_penghuni_makam'),
				'id_tpu' => $request->input('id_tpu'),
				'id_kecamatan' => $request->input('id_kecamatan'),
				'tgllhr_ahli_waris' => $request->input('tgllhr_ahli_waris'),
				'file_ktp' => $path_ktp,
				'file_kk' => $path_kk,
				'file_surat_izin' => $path_surat_izin,
				'file_sk' => $path_sk,
				'file_sk_lama' => $path_sk_lama,
				'status' => $progress ,
				'kelengkapan_dokumen' => $dokumen,
			));
			$kode_registrasi=$request->input('kode_tpu').'-'.$create->id;
			$update=Dokumen::findOrFail($create->id);
			$update->update(array(
				'kode_registrasi' => $kode_registrasi
			));

			$request->merge(['message'=>'Nomor registrasi anda adalah '.$kode_registrasi]);
			$request->merge(['to'=>$request->input('email')]);

			Mail::send(new EmailNotification());
			return 	response()->json('upload sukses!');
			
		} else{
			return response()->json('upload gagal!');
		}

		}catch(Exception $e){
			
		}
		

	}
	


	

}
