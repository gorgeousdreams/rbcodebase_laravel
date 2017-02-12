<?php

namespace App\Http\Controllers\Actor\User\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Actor\User\Profile\ChangePasswordRequest;
use App\Repositories\Actor\User\UserRepository;
use App\Repositories\Common\Breadcrumbs;
use SEO;

/**
 * Class ChangePasswordController
 * @package App\Http\Controllers\Actor\User\Auth
 */
class ChangePasswordController extends Controller
{
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
	 * @param ChangePasswordRequest $request
	 * @return mixed
	 */
	public function changePassword(ChangePasswordRequest $request) {
		$this->user->changePassword($request->all());
		return redirect()->route('actor.user.profile')->withFlashSuccess(trans('strings.frontend.user.password_updated'));
	}
}
