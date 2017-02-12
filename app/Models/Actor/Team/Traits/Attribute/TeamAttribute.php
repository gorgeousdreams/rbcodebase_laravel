<?php

namespace App\Models\Actor\Team\Traits\Attribute;

/**
 * Class TeamAttribute
 * @package App\Models\Actor\Team\Traits\Attribute
 */
trait TeamAttribute
{

	/**
	 * Helper function to determine if a user is part
	 * of this team
	 *
	 * @param Model $user
	 * @return bool
	 */
	public function hasUser(Model $user)
	{
		return $this->users()->where($user->getKeyName(), '=', $user->getKey() )->first() ? true : false;
	}

}
