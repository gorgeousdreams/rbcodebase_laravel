<?php

namespace App\Models\Actor\User\Traits\Relationship;

use App\Models\Actor\User\User;
use App\Models\Actor\User\Permission;
use App\Models\Actor\User\UserField;

/**
 * Class RoleRelationship
 * @package App\Models\Actor\User\Traits\Relationship
 */
trait RoleRelationship
{
	/**
	 * A role may be assigned to multiple users
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function users()
	{
		return $this->belongsToMany(User::class, config('actor.assigned_roles_table'), 'role_id', 'user_id');
	}

	/**
	 * A role may have multiple custom input fields assigned
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function fields()
	{
		return $this->hasMany(UserField::class, 'role_id');
	}

	/**
	 * A role may have multiple permissions assigned
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function permissions()
	{
		return $this->belongsToMany(Permission::class, config('actor.permission_role_table'), 'role_id', 'permission_id')
			->orderBy('title', 'asc');
	}
}
