<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tpu extends Model
{
    public $timestamps = false;
    public $table = 'tpu';
    protected $fillable = ['nama_tpu','kode_tpu','alamat_tpu'];
    protected $primaryKey = 'id_tpu';    
}
