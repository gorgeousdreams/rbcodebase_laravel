<?php

namespace App\Http\Controllers\Actor\User\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use App\Repositories\Actor\User\UserRepository;
use App\Helpers\Actor\User\Socialite;
use App\Repositories\Common\Breadcrumbs;
use SEO;

/**
 * Class ResetPasswordController
 * @package App\Http\Controllers\Actor\User\Auth
 */
class ResetPasswordController extends Controller
{
	use ResetsPasswords;

	/**
	 * @var UserRepository
	 */
	protected $user;

	/**
	 * ChangePasswordController constructor.
	 * @param UserRepository $user
	 */
	public function __construct(UserRepository $user)
	{
		$this->user = $user;
	}

	/**
	 * Where to redirect users after resetting password
	 *
	 * @return string
	 */
	public function redirectPath() {
		return route('actor.user.profile');
	}


	/**
	 * Get the response for a successful password reset.
	 *
	 * @param  string  $response
	 * @return \Illuminate\Http\Response
	 */
	protected function sendResetResponse($response)
	{
		return redirect($this->redirectPath())
			->withFlashSuccess(trans('strings.frontend.user.password_updated'));
	}

	/**
	 * Display the password reset view for the given token.
	 *
	 * If no token is present, display the link request form.
	 *
	 * @param  string|null  $token
	 * @return \Illuminate\Http\Response
	 */
	public function showResetForm($token = null)
	{
		// Values
		$token = $token;
		$email = $this->user->getEmailForPasswordToken($token);

		// Specify Title
		$titleparent = 'Login';
		$title = 'Reset Password'; // @TODO: Translate

		// Set Breadcrumbs
		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
		Breadcrumbs::push($titleparent, route('actor.user.auth.login'));
		Breadcrumbs::push($title, '#');

		return view('actor.user.auth.passwords.reset', compact('title', 'token', 'email'));
	}

}
