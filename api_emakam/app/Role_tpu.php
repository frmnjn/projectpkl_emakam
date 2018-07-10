<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role_tpu extends Model
{
    public $table = 'role_tpu';
    public $timestamps = false;
    public $primaryKey = 'id_user';

    protected $fillable = [
		'id_role_tpu','id_tpu', 'id_user',
    ];
}
