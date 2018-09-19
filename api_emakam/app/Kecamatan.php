<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kecamatan extends Model
{
    public $timestamps=false;
    public $table='tpu';
    protected $fillable = ['nama'];
    protected $primaryKey = 'id_kecamatan';
}
