<?php

namespace App\Models\Actor\User\Traits\Relationship;

use App\Models\Actor\User\User;
use App\Models\Actor\User\Role;
use App\Models\Actor\User\UserMeta;

/**
 * Class UserFieldRelationship
 * @package App\Models\Actor\User\Traits\Relationship
 */
trait UserFieldRelationship
{
	/**
	 * A User Custom Field type belongs to a Role
	 *
	 * @return mixed
	 */
	public function role()
	{
		return $this->belongsTo(Role::class);
	}

	/**
	 * Has one meta value for current user
	 * @return mixed
	 */
	public function meta()
	{
		return $this->hasOne(UserMeta::class, 'field_id');
	}

}
