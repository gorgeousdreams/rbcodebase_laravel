<?php

namespace App\Events\Actor\Team;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;

/**
 * Class UserJoinedTeam
 * @package App\Events\Actor\Team
 */
class UserJoinedTeam extends Event
{
	use SerializesModels;

	/**
	 * @type Model
	 */
	protected $user;

	/**
	 * @type int
	 */
	protected $team_id;

	public function __construct($user, $team_id)
	{
		$this->user = $user;
		$this->team_id = $team_id;
	}

	/**
	 * @return Model
	 */
	public function getUser()
	{
		return $this->user;
	}

	/**
	 * @return int
	 */
	public function getTeamId()
	{
		return $this->team_id;
	}
}
