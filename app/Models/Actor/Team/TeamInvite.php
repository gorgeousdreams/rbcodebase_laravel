<?php

namespace App\Models\Actor\Team;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use App\Models\Actor\Team\Traits\Relationship\TeamInviteRelationship;


class TeamInvite extends Model
{
	use TeamInviteRelationship;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['user_id', 'team_id', 'type', 'email', 'accept_token', 'deny_token'];

	/**
	 * Creates a new instance of the model.
	 *
	 * @param array $attributes
	 */
	public function __construct( array $attributes = [ ] )
	{
		parent::__construct( $attributes );
		$this->table = config('actor.team.teams_invites_table');
	}
}
