<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dokumen extends Model
{
    public $timestamps=false;
    public $table='dokumen';
    protected $fillable = ['nama_almarhum','nama_pewaris','tgllhr_ahli_waris','pekerjaan_ahli_waris','id_tpu','id_kecamatan','email','file_ktp','file_kk','file_surat_izin','status','kelengkapan_dokumen'];
    protected $primaryKey = 'id';
}
