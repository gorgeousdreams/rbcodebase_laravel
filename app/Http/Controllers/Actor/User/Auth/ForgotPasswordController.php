<?php

namespace App\Http\Controllers\Actor\User\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use App\Repositories\Common\Breadcrumbs;
use SEO;

/**
 * Class ForgotPasswordController
 * @package App\Http\Controllers\Actor\User\Auth
 */
class ForgotPasswordController extends Controller
{
	use SendsPasswordResetEmails;

	/**
	 * Display the form to request a password reset link.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function showLinkRequestForm()
	{
		return view('actor.user.auth.passwords.email');
	}
}
