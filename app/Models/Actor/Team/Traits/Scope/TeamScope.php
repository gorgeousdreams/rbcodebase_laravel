<?php

namespace App\Models\Actor\Team\Traits\Scope;

/**
 * Class TeamScope
 * @package App\Models\Actor\Team\Traits\Scope
 */
trait TeamScope
{

	/**
	 * @param Builder $query
	 * @return mixed
	 */
	public function scopeAllTeams(Builder $query)
	{
		return $query->withoutGlobalScope('teams');
	}

}
