<?php
namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PhpOffice\PhpWord\PhpWord;
use Dompdf\Dompdf;
use Fpdf;

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

	function cetak_surat_permohonan(){
		Fpdf::AddPage();
		Fpdf::Image( storage_path('app/logo_kota_malang.png'),30,8,20,25);
		Fpdf::Cell(45);
		Fpdf::SetFont('Times','B','14');
		Fpdf::Cell(133,5,'PEMERINTAH KOTA MALANG',0,1,'C');
		Fpdf::Cell(45);
		Fpdf::Cell(133,5,'DINAS PERUMAHAN DAN KAWASAN PERMUKIMAN',0,1,'C');
		Fpdf::Cell(45);
		Fpdf::SetFont('Times','','10');
		Fpdf::Cell(133,5,'Jl. Bingkil No. 1 Telp (0341) 369377 Fax (0341) 344872',0,1,'C');
		Fpdf::Cell(45);
		Fpdf::Cell(133,5,'www.dpkp.malangkota.go.id, email:dpkp@malangkota.go.id/dpkp.2017@gmail.com',0,1,'C');
		Fpdf::Cell(45);
		Fpdf::Cell(120,5,'MALANG',0,0,'C');
		Fpdf::Cell(13,5,'Kode Pos 65148',0,1,'R');

		Fpdf::SetLineWidth(1);
		Fpdf::Line(20,36,190,37);
		Fpdf::SetLineWidth(0);
		Fpdf::Line(20,37,190,37);

		Fpdf::Cell(27);
		Fpdf::SetFont('Times','','10');
		Fpdf::Cell(150,12,'Malang, 31 Agustus 2018',0,1,'R');
		Fpdf::Cell(10);
		Fpdf::Cell(15,5,'Nomor',0,0,'L');
		Fpdf::Cell(2,5,':',0,0,'L');
		Fpdf::Cell(40,5,'469/4059/35.73.304/2018',0,1,'L');
		Fpdf::Cell(10);
		Fpdf::Cell(15,5,'Sifat',0,0,'L');
		Fpdf::Cell(2,5,':',0,0,'L');
		Fpdf::Cell(40,5,'Biasa',0,1,'L');
		Fpdf::Cell(10);
		Fpdf::Cell(15,5,'Lampiran',0,0,'L');
		Fpdf::Cell(2,5,':',0,0,'L');
		Fpdf::Cell(40,5,'--',0,1,'L');
		Fpdf::Cell(10);
		Fpdf::Cell(15,5,'Hal',0,0,'L');
		Fpdf::Cell(2,5,':',0,0,'L');
		Fpdf::MultiCell(60,5,'Rekomendasi Perpanjangan Ijin Penggunaan Tanah Makam',0,'L',false);
		Fpdf::Cell(35);
		Fpdf::Cell(15,8,'Berkaitan dengan surat permohonan Ahli Waris :',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'1.',0,0,'L');
		Fpdf::Cell(40,5,'Tanggal',0,0,'L');
		Fpdf::Cell(20,5,': 28 Januari 2018',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'2.',0,0,'L');
		Fpdf::Cell(40,5,'Nama',0,0,'L');
		Fpdf::Cell(20,5,': Ngatinem',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'3.',0,0,'L');
		Fpdf::Cell(40,5,'Alamat',0,0,'L');
		Fpdf::Cell(0,5,': Jl. Sudanco Supriadi Gang VIII No 23 Kota Malang',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'3.',0,0,'L');
		Fpdf::Cell(40,5,'Perihal',0,0,'L');
		Fpdf::Cell(0,5,': Rekomendasi Perpanjangan Ijin Penggunaan Tanah Makam',0,1,'L');
		Fpdf::Cell(0,3,'',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::MultiCell(150,5,'Berdasarkan Peraturan Daerah Kota Malang Nomor 3 Tahun 2006 tentang Penyelenggaraan Pemakaman, Peraturan Walikota Malang Nomor 28 Tahun 2016 tentang Kedudukan, Susunan, Organisasi, Tugas dan Fungsi Serta Tata Kerja Dinas Perumahan dan Kawasan Permukiman serta Peraturan Walikota Malanmg Nomor 12 Tahun 2015 tentang Tata Cara Pelayanan Perijinan di Kecamatan, telah dilakukan pemeriksaan dan pengecekan terhadap permohonan Ahli Waris, permohonan tersebut telah memenuhi persyaratan yang diatur dalam peraturan perundangan yang berlaku, sehingga dapat diberikan rekomendasi Perpanjangan Ijin Penggunaan Tanah Makam kepada Pemohon dengan data sebagai berikut :',0,'J',false);
		Fpdf::Cell(0,3,'',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'1.',0,0,'L');
		Fpdf::Cell(40,5,'Nama',0,0,'L');
		Fpdf::Cell(20,5,': Yudhoyono',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'2.',0,0,'L');
		Fpdf::Cell(40,5,'Tempat Tanggal Lahir',0,0,'L');
		Fpdf::Cell(20,5,': Jakarta, 18 September 1930',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'3.',0,0,'L');
		Fpdf::Cell(40,5,'Umur',0,0,'L');
		Fpdf::Cell(0,5,': 54 Tahun',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'4.',0,0,'L');
		Fpdf::Cell(40,5,'Jenis Kelamin',0,0,'L');
		Fpdf::Cell(0,5,': Laki-laki',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'5.',0,0,'L');
		Fpdf::Cell(40,5,'Alamat',0,0,'L');
		Fpdf::Cell(0,5,': Cirebon, Jawa Barat',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'6.',0,0,'L');
		Fpdf::Cell(40,5,'Tanggal Pemakaman',0,0,'L');
		Fpdf::Cell(0,5,': 24-09-2005',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'7.',0,0,'L');
		Fpdf::Cell(40,5,'Lokasi Pemakaman',0,0,'L');
		Fpdf::Cell(0,5,': TPU. Sukorejo',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(5,5,'8.',0,0,'L');
		Fpdf::Cell(40,5,'Blok',0,0,'L');
		Fpdf::Cell(0,5,': --',0,1,'L');
		Fpdf::Cell(0,4,'',0,1,'L');
		Fpdf::Cell(0,6,'',0,1,'L');
		Fpdf::Cell(27);
		Fpdf::Cell(150,5,'Demikian rekomendasi ini dibuat untuk dapatnya diproses lebih lanjut.',0,1,'R');
		Fpdf::Cell(0,6,'',0,1,'L');
		Fpdf::Cell(107);
		Fpdf::MultiCell(70,5,'a.n.Plt. KEPALA DINAS PERUMAHAN DAN KAWASAN PERMUKIMAN, SEKRETARIS',0,'C',false);
		Fpdf::Cell(107);
		Fpdf::Cell(70,30,'',0,1,'L');
		//Fpdf::Cell(107);
		Fpdf::Image( storage_path('app/ttd.png'),143,223,20,25);
		Fpdf::Cell(107);
		Fpdf::SetFont('Times','U','10');
		Fpdf::Cell(70,5,'Dra. NUNUK SRI RUSGIYANTI',0,1,'C');
		Fpdf::Cell(107);
		Fpdf::SetFont('Times','','10');
		Fpdf::Cell(70,5,'Pembina Tingkat I',0,1,'C');
		Fpdf::Cell(107);
		Fpdf::Cell(70,5,'NIP.19640919 199003 2 005',0,1,'C');

		Fpdf::Output('D','Surat_Permohonan.pdf');
	}

}
