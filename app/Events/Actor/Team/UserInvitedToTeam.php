<?php

namespace App\Events\Actor\Team;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;

/**
 * Class UserInvitedToTeam
 * @package App\Events\Actor\Team
 */
class UserInvitedToTeam extends Event
{
	use SerializesModels;

	/**
	 * @type Model
	 */
	protected $invite;

	public function __construct($invite)
	{
		$this->invite = $invite;
	}

	/**
	 * @return Model
	 */
	public function getInvite()
	{
		return $this->invite;
	}

	/**
	 * @return int
	 */
	public function getTeamId()
	{
		return $this->invite->team_id;
	}
}
