<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Polygon extends Model
{
    public $timestamps=false;
    public $table='polygon';
    protected $fillable = ['id_blok','lat','lng'];
    protected $primaryKey = 'id_polygon';

    //
}
