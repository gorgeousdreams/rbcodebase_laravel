<?php

namespace App\Models\Actor\User\Traits\Scope;

/**
 * Class RoleScope
 * @package App\Models\Actor\User\Traits\Scope
 */
trait RoleScope
{

	/**
	 * @param $query
	 * @param string $direction
	 * @return mixed
	 */
	public function scopeSort($query, $direction = "asc") {
		return $query->orderBy('order', $direction);
	}

	public function scopeActive($query)
	{
		return $query->whereActive(true);
	}

	public function scopeInActive($query)
	{
		return $query->whereActive(false);
	}

	public function scopeVisible($query)
	{
		return $query->whereVisibility(true);
	}

	public function scopeInvisible($query)
	{
		return $query->whereVisibility(false);
	}

	public function scopeShowOnRegistration($query)
	{
		return $query->whereShowOnRegistration(true);
	}

	public function scopeShowOnSettings($query)
	{
		return $query->whereShowOnSettings(true);
	}

}
