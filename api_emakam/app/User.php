<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    public $table = 'user';
    public $timestamps = false;
    public $primaryKey = 'id_user';

    protected $fillable = [
        'id_user','username', 'password', 'role',
    ];
}
