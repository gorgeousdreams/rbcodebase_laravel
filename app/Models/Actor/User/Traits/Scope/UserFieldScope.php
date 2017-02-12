<?php

namespace App\Models\Actor\User\Traits\Scope;

/**
 * Class UserField
 * @package App\Models\Actor\User\Traits\Scope
 */
trait UserFieldScope
{

	public function scopeWithMeta($query, $userId)
	{
		return $query->with(['meta' => function ($q) use ($userId) {
			$q->where('user_id', $userId);
		}]);
	}

}
