<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blok_Makam extends Model
{
    public $timestamps=false;
    public $table='blok_makam';
    protected $fillable = ['kode_blok','id_tpu','area_peta_blok'];
    protected $primaryKey = 'id_blok';
}
