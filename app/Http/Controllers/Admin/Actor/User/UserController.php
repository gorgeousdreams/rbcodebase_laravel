<?php

namespace App\Http\Controllers\Admin\Actor\User;

use App\Models\Actor\User\Permission;
use App\Models\Actor\User\User;
use App\Http\Controllers\Controller;
use App\Models\Actor\User\Role;
use App\Repositories\Admin\Actor\User\UserRepository;
use App\Repositories\Admin\Actor\User\RoleRepository;
use App\Http\Requests\Admin\Actor\User\StoreUserRequest;
use App\Http\Requests\Admin\Actor\User\ManageUserRequest;
use App\Http\Requests\Admin\Actor\User\UpdateUserRequest;
use App\Repositories\Common\Breadcrumbs;

/**
 * Class UserController
 */
class UserController extends Controller
{
	/**
	 * @var UserRepository
	 */
	protected $users;

	/**
	 * @var RoleRepository
	 */
	protected $roles;

	/**
	 * @param UserRepository $users
	 * @param RoleRepository $roles
	 */
	public function __construct(UserRepository $users, RoleRepository $roles)
	{
		// Set Users & Roles
		$this->users = $users;
		$this->roles = $roles;

		// Set Base Breadcrumb
		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
		Breadcrumbs::push('<i class="fa fa-unlock-alt"></i>', route('admin.dashboard'));
		Breadcrumbs::push(trans('labels.backend.access.users.management'), route('admin.actor.user.manage.index'));
	}

	/**
	 * @param ManageUserRequest $request
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function index(ManageUserRequest $request)
	{
		$users = User::where('status', true)->get();

		// Specify Title
		$title = trans('labels.backend.access.users.active');

		// Set Breadcrumbs
		Breadcrumbs::push($title, '#');

		// Return View
		return view('admin.actor.user.manage.index', compact('title', 'users'));
	}

	/**
	 * @param ManageUserRequest $request
	 * @return mixed
	 */
	public function create(ManageUserRequest $request)
	{
		// Roles
		$roles = $this->roles->getAll();

		// Specify Title
		$title = trans('labels.backend.access.users.create');

		// Set Breadcrumbs
		Breadcrumbs::push($title, route('admin.actor.user.manage.create'));

		// Return View
		return view('admin.actor.user.manage.create', compact('title', 'roles'));
	}

	/**
	 * @param StoreUserRequest $request
	 * @return mixed
	 */
	public function store(StoreUserRequest $request)
	{
		$this->users->create(['data' => $request->except('assignees_roles'), 'roles' => $request->only('assignees_roles')]);
		return redirect()->route('admin.actor.user.manage.index')->withFlashSuccess(trans('alerts.backend.users.created'));
	}

	/**
	 * @param User $user
	 * @param ManageUserRequest $request
	 * @return mixed
	 */
	public function show(User $user, ManageUserRequest $request) {

		// Specify Title
		$title = trans('labels.backend.access.users.view');

		// Set Breadcrumbs
		Breadcrumbs::push($title, route('admin.actor.user.manage.show', $user->id));

		// Return View
		return view('admin.actor.user.manage.show', compact('title', 'user'));
	}

	/**
	 * @param User $user
	 * @param ManageUserRequest $request
	 * @return mixed
	 */
	public function edit(User $user, Permission $permissions, ManageUserRequest $request)
	{
		return view('admin.actor.user.manage.edit')
			->withUser($user)
			->withPermissions($permissions->get())
			->withUserRoles($user->roles->pluck('id')->all())
			->withRoles($this->roles->getAll());
	}

	/**
	 * @param User $user
	 * @param UpdateUserRequest $request
	 * @return mixed
	 */
	public function update(User $user, UpdateUserRequest $request)
	{
		$this->users->update($user, ['data' => $request->except('assignees_roles'), 'roles' => $request->only('assignees_roles')]);
		return redirect()->route('admin.actor.user.manage.index')->withFlashSuccess(trans('alerts.backend.users.updated'));
	}

	/**
	 * @param User $user
	 * @param ManageUserRequest $request
	 * @return mixed
	 */
	public function destroy(User $deletedUser, ManageUserRequest $request)
	{
		$this->users->delete($deletedUser);
		return redirect()->route('admin.actor.user.manage.deleted')
			->withFlashSuccess(trans('alerts.backend.users.deleted'));
	}
}
