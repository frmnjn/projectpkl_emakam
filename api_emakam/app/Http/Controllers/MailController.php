<?php

namespace App\Http\Controllers;
use Mail;
use App\Mail\EmailNotification;
use Illuminate\Http\Request;

class MailController extends Controller
{
    function send(){
        Mail::send(new EmailNotification());
    }
}
