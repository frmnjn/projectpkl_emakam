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

	function view_kecamatan(){
		$view = DB::table('dokumen')
            ->join('kecamatan', 'kecamatan.id_kecamatan', '=', 'dokumen.id_kecamatan')
            ->join('role_kecamatan', 'role_kecamatan.id_kecamatan', '=', 'dokumen.id_kecamatan')
            ->where('role_kecamatan.id_user','=',$id_user)
            ->select('*')
            ->get();

            return $view;
	}

	function view_dokumen_siap_cetak(Request $request){
		$id_user=$request->input('id_user');
		$view = DB::table('dokumen')
		->join('kecamatan', 'kecamatan.id_kecamatan', '=', 'dokumen.id_kecamatan')
		->join('role_kecamatan', 'role_kecamatan.id_kecamatan', '=', 'dokumen.id_kecamatan')
		->where('role_kecamatan.id_user','=',$id_user)
		->select('*')
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

	function cetak_surat_permohonan(Request $request){
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
		Fpdf::Cell(5,5,'4.',0,0,'L');
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
		$nama_almarhum = $request->input('nama_almarhum');
		Fpdf::Output('D',"Surat_Permohonan_$nama_almarhum.pdf");
	}

	function cetak_surat_perizinan(Request $request){
		Fpdf::AddPage();
		Fpdf::Image(storage_path('app/logo_kota_malang.png'),30,4.5,20,25);
		Fpdf::Cell(45);
		Fpdf::SetFont('Times','B','10');
		Fpdf::Cell(133,4.5,'PEMERINTAH KOTA MALANG',0,1,'C');
		Fpdf::Cell(45);
		Fpdf::SetFont('Times','B','14');
		Fpdf::Cell(133,4.5,'KECAMATAN SUKUN',0,1,'C');
		Fpdf::Cell(45);
		Fpdf::SetFont('Times','B','10');
		Fpdf::Cell(133,4.5,'Jl. Keben No. 1 Telepon (0341) 801268',0,1,'C');
		Fpdf::Cell(45);
		Fpdf::SetFont('Times','','10');
		Fpdf::Cell(133,4.5,'www.kec-sukun@malangkota.go.id',0,1,'C');
		Fpdf::Cell(45);
		Fpdf::Cell(120,4.5,'',0,0,'C');
		Fpdf::Cell(13,4.5,'Kode Pos 65148',0,1,'R');

		Fpdf::SetLineWidth(1);
		Fpdf::Line(21,33,190,33);
		Fpdf::SetLineWidth(0);
		Fpdf::Line(21,34,190,34);
		Fpdf::Cell(0,7,'',0,1,'R');
		Fpdf::SetFont('Times','B','10');
		Fpdf::Cell(0,4.5,'KEPUTUSAN CAMAT SUKUN KOTA MALANG',0,1,'C');
		Fpdf::Cell(0,4.5,'NOMOR : 188.451/1006/35.73.04/2017',0,1,'C');
		Fpdf::Cell(0,4.5,'TENTANG',0,1,'C');
		Fpdf::Cell(0,4.5,'IZIN PENGGUNAAN TANAH MAKAM/MAKAM TUMPANGAN',0,1,'C');
		Fpdf::Cell(0,4.5,'CAMAT SUKUN,',0,1,'C');
		Fpdf::Cell(0,3,'',0,1,'C');
		Fpdf::Cell(10);
		Fpdf::SetFont('Times','','10');
		Fpdf::Cell(25,4.5,'Menimbang',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::Cell(5,4.5,'a.',0,0,'L');
		Fpdf::MultiCell(140,4.5,'Bahwa PERMOHONAN lain Penggunaan Tanah Makam/Makam Tumpangan dari Sdr. Maria Tanggal 3 Juli 2017 Walikota Malang Nomor 12 Tahun 2015 tentang Tata Cara Pelayanan Perizinan di Kecamatan;',0,'J',false);
		Fpdf::Cell(10);
		Fpdf::Cell(25,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'b.',0,0,'L');
		Fpdf::MultiCell(140,4.5,'Bahwa sesuai rekomendasi Dinas Perumahan Dan Kawasan Permukiman No. 469/2740/35.73.304/2017 Tanggal 16 Juni 2017 perihal Perpanjangan Ijin Penggunaan Tanah Makam;',0,'J',false);
		Fpdf::Cell(10);
		Fpdf::Cell(25,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'c.',0,0,'L');
		Fpdf::MultiCell(140,4.5,'Bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan b perlu menetapkan Keputusan Camat Sukun tentang Izin Penggunaan Tanah Makam/Makam Tumpangan',0,'J',false);

		Fpdf::Cell(0,3,'',0,1,'C');
		Fpdf::Cell(10);
		Fpdf::SetFont('Times','','10');
		Fpdf::Cell(25,4.5,'Mengingat',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::Cell(5,4.5,'1.',0,0,'L');
		Fpdf::MultiCell(140,4.5,'Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah sebagaimana telah diubah dengan Undang-Undang Nomor 2 Tahun 2015;',0,'J',false);
		Fpdf::Cell(10);
		Fpdf::Cell(25,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'2.',0,0,'L');
		Fpdf::MultiCell(140,4.5,'Peraturan Daerah Kota Malang Nomor 3 Tahun 2006 tentang Penyelenggaraan Pemakaman;',0,'J',false);
		Fpdf::Cell(10);
		Fpdf::Cell(25,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'3.',0,0,'L');
		Fpdf::MultiCell(140,4.5,'Peraturan Daerah Kota Malang Nomor 8 Tahun 2008 tentang Organisasi dan Tata Kerja Kecamatan dan Kelurahan;',0,'J',false);
		Fpdf::Cell(10);
		Fpdf::Cell(25,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'4.',0,0,'L');
		Fpdf::MultiCell(140,4.5,'Peraturan Walikota Nomor 03 Tahun 2012 tentang Pelimpahan Sebagian Kewenangan Walikota kepada Camat;',0,'J',false);
		Fpdf::Cell(10);
		Fpdf::Cell(25,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'',0,0,'L');
		Fpdf::Cell(5,4.5,'5.',0,0,'L');
		Fpdf::MultiCell(140,4.5,'Peraturan Walikota Malang Nomor 12 Tahun 2015 tentang Tata Cara Pelayanan Perizinan di Kecamatan;',0,'J',false);

		Fpdf::Cell(0,3,'',0,1,'R');
		Fpdf::SetFont('Times','B','10');
		Fpdf::Cell(0,4.5,'Memutuskan : ',0,1,'C');

		Fpdf::Cell(10);
		Fpdf::SetFont('Times','','10');
		Fpdf::Cell(20,4.5,'Menetapkan',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::MultiCell(140,4.5,'KEPUTUSAN CAMAT SUKUN TENTANG IZIN PENGGUNAAN TANAH MAKAM/TANAH TUMPANGAN',0,'J',false);
		Fpdf::Cell(10);
		Fpdf::Cell(20,4.5,'KESATU',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::MultiCell(140,4.5,'Memberikan Rekomendasi Perpanjang Ijin Penggunaan Tanah Makam kepada :',0,'J',false);
		Fpdf::Cell(35);
		Fpdf::Cell(40,4.5,'Nama',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::Cell(5,4.5,'Maria',0,1,'L');
		Fpdf::Cell(35);
		Fpdf::Cell(40,4.5,'Alamat',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::Cell(5,4.5,'Jl. Klayatan 47 Kota Malang',0,1,'L');
		Fpdf::Cell(35);
		Fpdf::Cell(40,4.5,'Untuk Makam Jenazah : ',0,1,'L');
		Fpdf::Cell(35);
		Fpdf::Cell(40,4.5,'Nama',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::Cell(5,4.5,'Temu',0,1,'L');
		Fpdf::Cell(35);
		Fpdf::Cell(40,4.5,'Jenis Kelamin',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::Cell(5,4.5,'Perempuan',0,1,'L');
		Fpdf::Cell(35);
		Fpdf::Cell(40,4.5,'Tanggal Lahir',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::Cell(5,4.5,'Tahun 1901',0,1,'L');
		Fpdf::Cell(35);
		Fpdf::Cell(40,4.5,'Tanggal Pemakaman',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::Cell(5,4.5,'29-06-1987',0,1,'L');
		Fpdf::Cell(35);
		Fpdf::Cell(40,4.5,'Di Tempat Pemakaman',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::Cell(5,4.5,'TPU. SUKUN NASRANI',0,1,'L');
		Fpdf::Cell(35);
		Fpdf::Cell(40,4.5,'Blok',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::Cell(5,4.5,'XIII/11425',0,1,'L');
		Fpdf::Cell(10);
		Fpdf::Cell(20,4.5,'KEDUA',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::MultiCell(140,4.5,'Masa berlaku ijin 2 (DUA) tahun dan dapat dilaksanakan perpanjangan/daftar ulang.',0,'J',false);
		Fpdf::Cell(10);
		Fpdf::Cell(20,4.5,'KETIGA',0,0,'L');
		Fpdf::Cell(5,4.5,':',0,0,'L');
		Fpdf::MultiCell(140,4.5,'Keputusan Camat Sukun ini mulai berlaku pada tanggal ditetapkan.',0,'J',false);
		
		Fpdf::Cell(0,4.5,'',0,1,'L');
		Fpdf::Cell(115);
		Fpdf::Cell(70,4.5,'Ditetapkan di Malang,',0,1,'L');
		Fpdf::Cell(115);
		Fpdf::MultiCell(70,4.5,'Pada Tanggal, 16 Juli 2017',0,'L',false);
		Fpdf::Cell(115);
		Fpdf::MultiCell(70,4.5,'CAMAT SUKUN KOTA MALANG,',0,'L',false);
		Fpdf::Cell(115);
		Fpdf::Cell(70,25,'',0,1,'L');
		//Fpdf::Cell(107);
		Fpdf::Image( storage_path('app/ttd.png'),133,235,20,20);
		Fpdf::Cell(10);
		Fpdf::Cell(105,4.5,'Tembusan : ',0,0,'L');
		Fpdf::SetFont('Times','U','10');
		Fpdf::Cell(70,4.5,'SINARNI, SIP. MM.',0,1,'L');
		Fpdf::Cell(10);
		Fpdf::SetFont('Times','','10');
		Fpdf::Cell(17,4.5,'Yth. Bpk. :',0,0,'L');
		Fpdf::Cell(4,4.5,'1. ',0,0,'L');
		Fpdf::Cell(84,4.5,'Walikota Malang (sebagai laporan);',0,0,'L');
		Fpdf::Cell(70,4.5,'Pembina Tingkat I',0,1,'L');
		Fpdf::Cell(10);
		Fpdf::Cell(17,4.5,'',0,0,'L');
		Fpdf::Cell(4,4.5,'2. ',0,0,'L');
		Fpdf::Cell(84,4.5,'Kepala Dinas Dan Kawasan Pemukiman Kota Malang;',0,0,'L');
		Fpdf::Cell(70,4.5,'NIP.19640919 199003 2 005',0,1,'L');
		Fpdf::Cell(10);
		Fpdf::Cell(17,4.5,'',0,0,'L');
		Fpdf::Cell(4,4.5,'3. ',0,0,'L');
		Fpdf::Cell(84,4.5,'Kepala Satuan Polisi Pamong Praja Kota Malang.',0,1,'L');

		$nama_almarhum = $request->input('nama_almarhum');
		Fpdf::Output('D',"Surat_Izin_$nama_almarhum.pdf");
	}

}
