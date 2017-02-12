<?php

namespace App\Models\Actor\User\Traits\Scope;

/**
 * Class NotificationScope
 * @package App\Models\Actor\User\Traits\Scope
 */
trait NotificationScope
{

	/**
	 * @param Builder $query
	 * @return mixed
	 */
	public function unread()
	{
		return $this->where('seen', 0);
	}

	/**
	 * @param $query
	 * @param string $direction
	 * @return mixed
	 */
	public function scopeOrdered($query, $direction = 'desc') {
		return $query->orderBy('created_at', $direction);
	}

}
