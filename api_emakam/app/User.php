<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public $table = 'user';
    public $timestamps = false;
    public $primaryKey = 'id_user';

    protected $fillable = [
        'id_user','username', 'password', 'role',
    ];
}
