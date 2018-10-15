<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dokumen extends Model
{
    public $timestamps=false;
    public $table='dokumen';
    protected $fillable = ['nama_almarhum','nama_pewaris','tgllhr_ahli_waris','pekerjaan_ahli_waris','id_penghuni_makam','id_tpu','id_kecamatan','email','file_ktp','file_kk','file_surat_izin','file_sk','file_sk_lama','status','kelengkapan_dokumen','no_surat_permohonan','tanggal_surat_permohonan','no_surat_perizinan','tanggal_surat_perizinin'];
    protected $primaryKey = 'id';
}
