<?php

namespace App\Models\Actor\User\Traits\Relationship;

use App\Models\Actor\User\SocialLogin;
use App\Models\Actor\User\Role;
use App\Models\Actor\User\UserMeta;

/**
 * Class UserRelationship
 * @package App\Models\Actor\User\Traits\Relationship
 */
trait UserRelationship
{

	/**
	 * Many-to-Many relations with Role.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function roles()
	{
		return $this->belongsToMany(Role::class, config('actor.assigned_roles_table'), 'user_id', 'role_id');
	}

	/**
	 * @return mixed
	 */
	public function providers()
	{
		return $this->hasMany(SocialLogin::class);
	}


	/**
	 * User has many meta fields
	 *
	 * @return mixed
	 */
	public function meta()
	{
		return $this->hasMany(UserMeta::class);
	}


	/**
	 * User has many social logins
	 *
	 * @return mixed
	 */
	public function social()
	{
		return $this->hasMany(UserSocial::class);
	}

	public function hasSocialLinked($service)
	{
		return (bool) $this->social->where('service', $service)->count();
	}

}
