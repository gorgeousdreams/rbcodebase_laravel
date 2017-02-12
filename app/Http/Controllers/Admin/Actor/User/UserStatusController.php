<?php

namespace App\Http\Controllers\Admin\Actor\User;

use DB;
use App\Models\Actor\User\User;
use App\Http\Controllers\Controller;
use App\Repositories\Admin\Actor\User\UserRepository;
use App\Http\Requests\Admin\Actor\User\ManageUserRequest;
use App\Repositories\Common\Breadcrumbs;

/**
 * Class UserStatusController
 */
class UserStatusController extends Controller
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
	 * @param ManageUserRequest $request
	 * @return mixed
	 */
	public function getDeactivated(ManageUserRequest $request)
	{
		// Get users
		$users = User::where('status', 0)->get();

		// Specify Title
		$title = trans('labels.backend.access.users.deactivated');

		// Set Breadcrumbs
		Breadcrumbs::push($title, '#');

		// Return View
		return view('admin.actor.user.manage.deactivated', compact('title', 'users'));
	}

	/**
	 * @param ManageUserRequest $request
	 * @return mixed
	 */
	public function getDeleted(ManageUserRequest $request)
	{
		// Get users
		$users = User::onlyTrashed()->get();

		// Specify Title
		$title = trans('labels.backend.access.users.deleted');

		// Set Breadcrumbs
		Breadcrumbs::push($title, '#');

		// Return View
		return view('admin.actor.user.manage.deleted', compact('title', 'users'));
	}

	/**
	 * @param User $user
	 * @param $status
	 * @param ManageUserRequest $request
	 * @return mixed
	 */
	public function mark(User $user, $status, ManageUserRequest $request)
	{
		$this->users->mark($user, $status);
		return redirect()->route($status == 1 ? "admin.actor.user.manage.index" : "admin.actor.user.manage.deactivated")->withFlashSuccess(trans('alerts.backend.users.updated'));
	}

	/**
	 * @param User $deletedUser
	 * @param ManageUserRequest $request
	 * @return mixed
	 */
	public function delete(User $deletedUser, ManageUserRequest $request)
	{
		$this->users->forceDelete($deletedUser);
		return redirect()->route('admin.actor.user.manage.deleted')->withFlashSuccess(trans('alerts.backend.users.deleted_permanently'));
	}

	/**
	 * @param User $deletedUser
	 * @param ManageUserRequest $request
	 * @return mixed
	 */
	public function restore(User $deletedUser, ManageUserRequest $request)
	{
		$this->users->restore($deletedUser);
		return redirect()->route('admin.actor.user.manage.index')->withFlashSuccess(trans('alerts.backend.users.restored'));
	}
}
