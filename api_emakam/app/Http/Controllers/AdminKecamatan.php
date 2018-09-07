<?php
namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PhpOffice\PhpWord\PhpWord;
use Dompdf\Dompdf;


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

	function cetak_pdf(Request $request){

		$source   = storage_path('app\hello.html');

		$dompdf = new Dompdf();
		$dompdf->loadHtml("

		
<h3><center>FORMULIR PENGAJUAN PERPANJANGAN</center></h3>
<h3><center>MASA PRAKTIK KERJA LAPANGAN (PKL)</center></h3>
<br>
<br>
<p>Yang bertanda tangan di bawah ini:</p>
<p>Nama Ahli Waris	:   </p>
<p>Tanggal Wafat		:   </p>
<p>NIK Ahli Waris		:   </p>
<p>Kontak Ahli Waris	:   </p>
<br>
<p>Dengan ini mengajukan permohonan untuk perizinan makam.</p>
<table style='width:100%'>
  <tr>
    <th></th>
	<th></th>
	<th></th>  
  </tr>
  <tr>
	<td>
		<p>Mengetahui,</p>
		<p>Kepala Dinas Perkim,</p>
		<img src='Storage/Berkas/ttd.png' alt='ttd'>
		<p>NIP/NIK. 0123456798</p>
	</td>
	<td>&nbsp;</td>
	<td>
		<p>Menyetujui,</p>
		<p>Kepala Kecamatan</p>
		<img src='Storage/Berkas/ttd.png' alt='ttd'>
		<p>NIK.1892379127</p>
	</td> 
  </tr>
  <tr>
    <td>&nbsp;</td>
  	<td>
		<p>Mengetahui,</p>
		<p>Kepala Dinas Perkim,</p>
		<img src='Storage/Berkas/ttd.png' alt='ttd'>
		<p>NIP/NIK. 0123456798</p>
	</td>
	<td>&nbsp;</td>
  </tr>
</table>
<p>	</p>
		");

		// (Optional) Setup the paper size and orientation
		$dompdf->setPaper('A4', 'portrait');

		// Render the HTML as PDF
		$dompdf->render();

		// Output the generated PDF to Browser
		$dompdf->stream();
	}




}
