<?php

namespace App\Http\Controllers\Actor\User\Auth;

use App\Models\Actor\User\User;
use App\Http\Controllers\Controller;
use App\Repositories\Actor\User\UserRepository;
use App\Notifications\Actor\User\UserNeedsConfirmation;
use App\Repositories\Common\Breadcrumbs;
use SEO;

/**
 * Class ConfirmAccountController
 * @package App\Http\Controllers\Actor\User\Auth
 */
class ConfirmAccountController extends Controller
{
	/**
	 * @var UserRepository
	 */
	protected $user;

	/**
	 * ConfirmAccountController constructor.
	 * @param UserRepository $user
	 */
	public function __construct(UserRepository $user)
	{
		$this->user = $user;
	}

	/**
	 * @param $token
	 * @return mixed
	 */
	public function confirm($token)
	{
		$this->user->confirmAccount($token);

		if (access()->user()) {
			// If logged in already just send to profile
			return redirect()->route('actor.user.profile')->withFlashSuccess(trans('exceptions.frontend.auth.confirmation.success'));
		} else {
			// If not logged in, send to login screen
			return redirect()->route('actor.user.auth.login')->withFlashSuccess(trans('exceptions.frontend.auth.confirmation.success'));
		}
	}

	/**
	 * @param $user
	 * @return mixed
	 */
	public function sendConfirmationEmail(User $user)
	{
		$user->notify(new UserNeedsConfirmation($user->confirmation_code));

		if (access()->user()) {
			// If logged in already just send to profile
			return redirect()->route('actor.user.profile')->withFlashSuccess(trans('exceptions.frontend.auth.confirmation.resent'));
		} else {
			// If not logged in, send to login screen
			return redirect()->route('actor.user.auth.login')->withFlashSuccess(trans('exceptions.frontend.auth.confirmation.resent'));
		}
	}
}
