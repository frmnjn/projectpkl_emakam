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
use App\Role_kecamatan;




class AdminPusatController extends Controller
{
    function __construct(){
        $this->middleware('jwt.auth');
    }

    function view(){
        $user = User::all();

        return response()->json($user);
    }

    function view_tpu(){
        $view = DB::table('tpu')
        ->join('kecamatan', 'kecamatan.id_kecamatan', '=', 'tpu.id_kecamatan')
		->select('*')
		->get();

		return $view;
        
    }

    function create_tpu(Request $request){
        try{
            Tpu::create($request->all());
            return response()->json(["create TPU  sukses"]);
        }catch(Exception $e){

        }

        

    }

    function edit_tpu(Request $request,$id){
        try{
            $tpu = Tpu::findOrFail($id);
            $tpu->update($request->all());

            return response()->json(["edit TPU sukses"]);
        }catch(Exception $e){

        }

        

    }

    public function delete_tpu(Request $request, $id)
    {
        try{
        $penghuni_makam = DB::table('penghuni_makam')
            ->join('makam', 'penghuni_makam.id_makam', '=', 'makam.id_makam')
            ->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')
            ->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
            // ->select('penghunimakam.*','blok_makam.*', 'tpu.*')
            ->where('tpu.id_tpu','=',$id)
            ->delete();

        $makam = DB::table('makam')
            ->join('blok_makam', 'makam.id_blok', '=', 'blok_makam.id_blok')

            ->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
            // ->select('penghunimakam.*','blok_makam.*', 'tpu.*')
            ->where('tpu.id_tpu','=',$id)
            ->delete();

        $polygon = DB::table('polygon')
        	->join('blok_makam','blok_makam.id_blok','=','polygon.id_blok')
            ->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
            // ->select('penghunimakam.*','blok_makam.*', 'tpu.*')
            ->where('tpu.id_tpu','=',$id)
            ->delete();  

        $blokmakam = DB::table('blok_makam')
            ->join('tpu', 'blok_makam.id_tpu', '=', 'tpu.id_tpu')
            // ->select('penghunimakam.*','blok_makam.*', 'tpu.*')
            ->where('tpu.id_tpu','=',$id)
            ->delete();


        
        $tpu = Tpu::findOrFail($id);
        $tpu->delete();

        return response()->json(["delete TPU sukses"]);
        }catch(Excpetion $e){

        }

    }
    
    function view_role_tpu(){
        $role_tpu = Role_tpu::all();
        return response()->json($role_tpu);
    }

    function create_role_tpu(Request $request)
    {
        try{

        }catch(Exception $e){

        }
        $id_tpu = $request->input('id_tpu');
        $id_user = $request->input('id_user');

        $role_tpu = new Role_tpu([
            'id_tpu' => $id_tpu,
            'id_user' => $id_user
        ]);

        $role_tpu->save();

        return response()->json(['msg' => "Hak Akses Berhasil dibuat!"]);
    }

    function create_role_kecamatan(Request $request)
    {
        try{

        }catch(Exception $e){

        }
        $id_tpu = $request->input('id_tpu');
        $id_user = $request->input('id_user');

        $role = Role_kecamatan::create($request->all());

        return response()->json(['msg' => "Hak Akses Berhasil dibuat!"]);
    }

    function update_role_tpu(Request $request, $id_role_tpu)
    {
        try{
            $role_tpu = Role_tpu::findOrFail($id_role_tpu);
        
            $role_tpu->update($request->all());
    
            return response()->json(['msg' => "Hak Akses Berhasil di update!"]);
        }catch(Exception $e){

        }

    }

    function update_role_kecamatan(Request $request, $id_role)
    {
        try{
            $role = Role_kecamatan::findOrFail($id_role);
        
            $role->update($request->all());
    
            return response()->json(['msg' => "Hak Akses Berhasil di update!"]);
        }catch(Exception $e){

        }
        
    }

    function delete_role_tpu(Request $request, $id_role_tpu)
    {
        try{
            $role_tpu = Role_tpu::findOrFail($id_role_tpu);
            $role_tpu->delete();
    
            return response()->json(['msg' => "Hak Akses Berhasil dihapus!"]);
        }catch(Exception $e){

        }
        
    }

    function delete_role_kecamatan(Request $request, $id_role)
    {
        try{
            $role = Role_kecamatan::findOrFail($id_role);
            $role ->delete();
    
            return response()->json(['msg' => "Hak Akses Berhasil dihapus!"]);
        }catch(Exception $e){

        }

    }

    function view_role_byuser(Request $request){
		$id= $request->input('id_user');
		$view = DB::table('role_tpu')
		 ->where('role_tpu.id_user','=',$id)
		 ->get();
		return response()->json($view);
	}

        function create_user(Request $request)
    {
        try{
            $username = $request->input('username');
            $password = Hash::make($request->input('password'));
            $role = $request->input('role');
            //$id_tpu = $request->input('id_tpu');
            //$id_user = "";
    
            $user = new User([
                'username' => $username,
                'password' => $password,
                'role' => $role
            ]);
    
            $user->save();
    
            return response()->json(['msg' => "create user sukses"]);
        }catch(Exception $e){

        }
       
    }

    function update_user(Request $request, $id_user)
    {
        try{
            $user = User::findOrFail($id_user);


            $username = $request->input('username');
            $password = $request->input('password');
            $role = $request->input('role');
    
            $user->update([
                'username' => $request->input('username'),
                'password' => $request->input('password'),
                'role' => $request->input('role')
            ]);
            $role_tpu->save();
    
            return response()->json(['msg' => "update user sukses"]);

        }catch(Exception $e){

        }
        
    }

    function delete_user(Request $request, $id_user)
    {
        try{
            $role = $request->input('role');
            $user = DB::table('user')->select('id_user')->where('id_user', '=', $id_user)->value('id_user');
            if(empty($user)){
                $msg = ([
                    'msg' => "Data User tidak ditemukan !"
                ]);
            } else {
                if($role==1||$role==2){
                    $role_tpu = DB::table('role_tpu')->select('id_user')->where('id_user', '=', $id_user)->value('id_user');
                    if(empty($role_tpu)){
                        $user = User::findOrFail($id_user);
                        $user->delete();
                        $msg = ([
                            'msg' => "User berhasil dihapus"
                        ]);
                    } else {
                        $msg = ([
                            'msg' => "Anda harus menghapus hak akses user terlebih dahulu !"
                        ]);
                    }
                }else if($role==5||$role==4){
                    $role_kecamatan = DB::table('role_kecamatan')->select('id_user')->where('id_user', '=', $id_user)->value('id_user');
                    if(empty($role_kecamatan)){
                        $user = User::findOrFail($id_user);
                        $user->delete();
                        $msg = ([
                            'msg' => "User berhasil dihapus"
                        ]);
                    } else {
                        $msg = ([
                            'msg' => "Anda harus menghapus hak akses user terlebih dahulu !"
                        ]);
                    }
                }else{
                    $user = User::findOrFail($id_user);
                        $user->delete();
                        $msg = ([
                            'msg' => "User berhasil dihapus"
                        ]);
                }
    
                
            }
            return response()->json(['msg' => "delete user sukses"]);
        }catch(Exception $e){

        }
        
    }

    function constraint_user_kecamatan(){
        $user = DB::table('user')
        ->join('role_kecamatan', 'user.id_user', '=', 'role_kecamatan.id_user')
        ->join('kecamatan', 'role_kecamatan.id_kecamatan', '=', 'kecamatan.id_kecamatan')
        ->select('user.*', 'role_kecamatan.*','kecamatan.*')
        ->get();
        return response()->json($user);
    }

    function constraint_user(){
        $user = DB::table('user')
        ->join('role_tpu', 'user.id_user', '=', 'role_tpu.id_user')
        ->join('tpu', 'role_tpu.id_tpu', '=', 'tpu.id_tpu')
        ->select('user.*', 'role_tpu.*','tpu.*')
        ->get();
        return response()->json($user);
    }
}
