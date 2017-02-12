<?php

namespace App\Http\Controllers\Admin\Actor\User;

use App\Models\Actor\User\Role;
use App\Models\Actor\User\Permission;
use App\Http\Controllers\Controller;
use App\Repositories\Admin\Actor\User\RoleRepository;
use App\Http\Requests\Admin\Actor\User\StoreRoleRequest;
use App\Http\Requests\Admin\Actor\User\ManageRoleRequest;
use App\Http\Requests\Admin\Actor\User\UpdateRoleRequest;
use App\Repositories\Admin\Actor\User\PermissionRepository;
use App\Repositories\Common\Breadcrumbs;

/**
 * Class RoleController
 * @package App\Http\Controllers\Admin\Actor\User
 */
class RoleController extends Controller
{
	/**
	 * @var RoleRepository
	 */
	protected $roles;

	/**
	 * @var PermissionRepository
	 */
	protected $permissions;

	/**
	 * @param RoleRepository       $roles
	 * @param PermissionRepository $permissions
	 */
	public function __construct(RoleRepository $roles, PermissionRepository $permissions)
	{
		// Set Roles
		$this->roles = $roles;
		$this->permissions = $permissions;

		// Set Base Breadcrumb
		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
		Breadcrumbs::push('<i class="fa fa-unlock-alt"></i>', route('admin.dashboard'));
		Breadcrumbs::push(trans('labels.backend.access.roles.management'), route('admin.actor.user.role.index'));
	}

	/**
	 * @param ManageRoleRequest $request
	 * @return mixed
	 */
	public function index(ManageRoleRequest $request)
	{
		// Get Data
		$roles = $this->roles->getAll();
		$permissions = $this->permissions->getAll();

		// Specify Title
		$title = trans('menus.backend.access.roles.all');

		// Set Breadcrumbs
		Breadcrumbs::push($title, '#');

		// Return View
		return view('admin.actor.user.role.index', compact('title', 'roles', 'permissions'));
	}

	/**
	 * @param ManageRoleRequest $request
	 * @return mixed
	 */
	public function create(ManageRoleRequest $request)
	{
		// Get Data
		$roles = $this->roles->getAll();
		$role_count = $this->roles->getCount();
		$permissions = $this->permissions->getAll();

		// Specify Title
		$title = trans('menus.backend.access.roles.create');

		// Set Breadcrumbs
		Breadcrumbs::push($title, '#');

		// Return View
		return view('admin.actor.user.role.create', compact('title', 'roles', 'role_count', 'permissions'));
	}

	/**
	 * @param  StoreRoleRequest $request
	 * @return mixed
	 */
	public function store(StoreRoleRequest $request)
	{
		$this->roles->create($request->all());
		return redirect()->route('admin.actor.user.role.index')->withFlashSuccess(trans('alerts.backend.roles.created'));
	}

	/**
	 * @param  Role $role
	 * @param  ManageRoleRequest $requesta
	 * @return mixed
	 */
	public function edit($id)
	{
		// Get Data
		$role = Role::findOrFail($id);
		$role_permissions = $role->permissions->pluck('id')->all();
		$permissions = Permission::get();

		// Specify Title
		$title = 'Edit Role';

		// Set Breadcrumbs
		Breadcrumbs::push('Roles', route('admin.actor.user.role.index'));
		Breadcrumbs::push('Edit', route('admin.actor.user.role.edit', $role->id));

		// Return View
		return view('admin.actor.user.role.edit', compact('title', 'role', 'role_permissions', 'permissions'));
	}

	/**
	 * @param  Role $role
	 * @param  UpdateRoleRequest $request
	 * @return mixed
	 */
	public function update(Role $role, UpdateRoleRequest $request)
	{
		$this->roles->update($role, $request->all());
		return redirect()->route('admin.actor.user.role.index')->withFlashSuccess(trans('alerts.backend.roles.updated'));
	}

	/**
	 * @param  Role $role
	 * @param  ManageRoleRequest $request
	 * @return mixed
	 */
	public function destroy(Role $role, ManageRoleRequest $request)
	{
		$this->roles->delete($role);
		return redirect()->route('admin.actor.user.role.index')
			->withFlashSuccess(trans('alerts.backend.roles.deleted'));
	}
}
