<?php

namespace App\Http\Controllers\Admin\Actor\User;

use App\Models\Actor\User\User;
use App\Http\Controllers\Controller;
use App\Repositories\Admin\Actor\User\UserRepository;
use App\Http\Requests\Admin\Actor\User\ManageUserRequest;
use App\Http\Requests\Admin\Actor\User\UpdateUserPasswordRequest;
use App\Repositories\Common\Breadcrumbs;

/**
 * Class UserPasswordController
 */
class UserPasswordController extends Controller
{
	/**
	 * @var UserRepository
	 */
	protected $users;

	/**
	 * @param UserRepository $users
	 */
	public function __construct(UserRepository $users)
	{
		// Get Users
		$this->users = $users;

		// Set Base Breadcrumb
		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
		Breadcrumbs::push('<i class="fa fa-unlock-alt"></i>', route('admin.dashboard'));
		Breadcrumbs::push(trans('labels.backend.access.users.management'), route('admin.actor.user.manage.index'));
	}

	/**
	 * @param User $user
	 * @param ManageUserRequest $request
	 * @return mixed
	 */
	public function edit(User $user, ManageUserRequest $request)
	{
		// Specify Title
		$title = trans('labels.backend.access.users.change_password_for', ['user' => $user->name_first]);

		// Set Breadcrumbs
		Breadcrumbs::push(trans('labels.backend.access.users.change_password'), route('actor.user.auth.password.change', $user->id));

		// Return View
		return view('admin.actor.user.manage.change-password', compact('title', 'user'));
	}

	/**
	 * @param User $user
	 * @param UpdateUserPasswordRequest $request
	 * @return mixed
	 */
	public function update(User $user, UpdateUserPasswordRequest $request)
	{
		$this->users->updatePassword($user, $request->all());
		return redirect()->route('admin.actor.user.manage.index')->withFlashSuccess(trans('alerts.backend.users.updated_password'));
	}
}
