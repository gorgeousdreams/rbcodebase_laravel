<?php

namespace App\Models\Actor\Team\Traits\Relationship;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;

use App\Models\Actor\User\User;
use App\Models\Actor\Team\TeamInvite;

/**
 * Class TeamRelationship
 * @package App\Models\Actor\Team\Traits\Relationship
 */
trait TeamRelationship
{

	/**
	 * One-to-Many relation with the invite model
	 *
	 * @return mixed
	 */
	public function invites()
	{
		return $this->hasMany(TeamInvite::class, 'team_id', 'id');
	}

	/**
	 * Many-to-Many relations with the user model.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function users()
	{
		return $this->belongsToMany(User::class, config('actor.team.users_teams_table'), 'team_id','user_id')->withTimestamps();
	}

	/**
	 * Has-One relation with the user model.
	 * This indicates the owner of the team
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function owner()
	{
		return $this->hasOne(User::class, 'id', 'owner_id');
	}

}
