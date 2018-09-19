<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role_kecamatan extends Model
{
    public $table = 'role_kecamatan';
    public $timestamps = false;
    public $primaryKey = 'id_role';

    protected $fillable = [
		  'id_role','id_kecamatan', 'id_user',
    ];
}
