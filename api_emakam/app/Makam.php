<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Makam extends Model
{
    public $timestamps=false;
    public $table='makam';
    protected $fillable = ['id_blok','nomor_makam','kode_makam'];
    protected $primaryKey = 'id_makam';

    //
}
