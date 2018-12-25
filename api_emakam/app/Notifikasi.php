<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    public $timestamps=false;
    public $table='notifikasi';
    protected $fillable = ['content','status'];
    protected $primaryKey = 'id_notifikasi';
}
