<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Penghuni_makam extends Model
{
    public $timestamps = false;
    public $table = 'penghuni_makam';
    // protected $timestamp = false;
    protected $guarded = [];
    protected $fillable = ['nama','alamat_terakhir','tanggal_wafat','status','id_makam','nama_ahli_waris','alamat_ahli_waris','nik_ahli_waris','kontak_ahli_waris'];
    protected $primaryKey = 'id_penghuni_makam';
}
