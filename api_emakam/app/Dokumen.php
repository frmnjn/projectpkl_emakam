<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dokumen extends Model
{
    public $timestamps=false;
    public $table='dokumen';
    protected $fillable = ['nama_almarhum','nama_pewaris','file_ktp','file_kk'];
    protected $primaryKey = 'id';
}
