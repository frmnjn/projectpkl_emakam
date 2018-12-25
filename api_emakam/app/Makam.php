<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Makam extends Model
{
    public $timestamps=false;
    public $table='makam';
    protected $fillable = ['id_blok','nomor_makam','kode_makam','lat','lng','status_penghuni','status_terisi'];
    protected $primaryKey = 'id_makam';

    //
}
