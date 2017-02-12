<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class TestMailer extends Mailable
{
	use Queueable, SerializesModels;

	public $name = 'Rob';

	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->view('emails.common.test.test.blade.php');
	}
}
