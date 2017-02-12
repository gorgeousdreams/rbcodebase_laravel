<?php

namespace App\Services\Actor\Team;

use Illuminate\Support\Facades\Config;
use App\Events\Actor\Team\UserInvitedToTeam;
use App\Models\Actor\Team\TeamInvite;
use App\Models\Actor\User\User;
use App\Models\Actor\User\Notification;

/**
 * Class Teams
 * @package App\Services\Actor\Team
 */
class Teams
{
	/**
	 * Laravel application
	 *
	 * @var \Illuminate\Foundation\Application
	 */
	public $app;

	/**
	 * Create a new Team instance.
	 *
	 * @param \Illuminate\Foundation\Application $app
	 */
	public function __construct( $app )
	{
		$this->app = $app;
	}

	/**
	 * Get the currently authenticated user or null.
	 */
	public function user()
	{
		return $this->app->auth->user();
	}

	/**
	 * Invite an email adress to a team.
	 * Either provide a email address or an object with an email property.
	 *
	 * If no team is given, the current_team_id will be used instead.
	 *
	 * @param string|User $user
	 * @param null|Team $team
	 * @param callable $success
	 * @throws \Exception
	 */
	public function inviteToTeam($user, $team = null, callable $success = null)
	{
		// Get Team
		if (is_null($team)) {
			$team = User::where('id', $this->user()->current_team_id)->first();
		} elseif(is_object($team)) {
			//$team = User::where('id', $team->id)->first();
		} elseif(is_array($team)) {
			$team = User::where('id', $team["id"])->first();
		}

		// Get Email Address
		if (is_object($user) && isset($user->email)) {
			$email = $user->email;
		} elseif(is_string($user)) {
			$email = $user;
		} else {
			throw new \Exception('The provided object has no "email" attribute and is not a string.');
		}

		// Create Invite
		$invite = TeamInvite::create(['user_id' => $this->user()->id, 'team_id' => $team->id, 'type' => 'invite', 'email' => $email, 'accept_token' => md5(uniqid(microtime())), 'deny_token' => md5(uniqid(microtime()))]);

		// Check if Invitee is a member already
		$user = User::where('email', $email)->first();
		if($user) {
			// Notify Invitee via App
			Notification::create(['type' => 'team-invite', 'user_id' => $user->id, 'notified_by' => $this->user()->id, 'text' => 'You have been invited by '. $this->user()->getDisplayName() .' to join '. $team->name .'!', 'link' => route('actor.team.invite_accept', $invite->accept_token)]);
		}

		// Trigger Event
		if(!is_null($success)){
			event(new UserInvitedToTeam($invite));
			return $success( $invite );
		}
	}

	/**
	 * Checks if the given email address has a pending invite for the
	 * provided Team
	 * @param $email
	 * @param Team|array|integer $team
	 * @return bool
	 */
	public function hasPendingInvite($email, $team)
	{
		if(is_object($team)) {
			$team = $team->id;
		}
		if(is_array($team)){
			$team = $team['id'];
		}

		return $this->app->make(TeamInvite::class)->where('email', $email)->where('team_id', $team)->first() ? true : false;
	}

	/**
	 * @param $token
	 * @return mixed
	 */
	public function getInviteFromAcceptToken($token)
	{
		return $this->app->make(TeamInvite::class)->where('accept_token', $token)->first();
	}

	/**
	 * @param TeamInvite $invite
	 */
	public function acceptInvite(TeamInvite $invite)
	{
		// Add User to Team
		$this->user()->attachTeam($invite->team);

		// Delete Invite
		$invite->delete();

		// Switch Teams
		$this->user()->switchTeam($invite->team);

		// Notify inviter of acceptance
		Notification::create(['type' => 'team-invite', 'user_id' => $invite->user_id, 'timeline_id' => null, 'notified_by' => $this->user()->id, 'text' => 'Your invitation for '. $this->user()->getDisplayName() .' to '. $invite->team->name .' was accepted!']);
	}

	/**
	 * @param $token
	 * @return mixed
	 */
	public function getInviteFromDenyToken($token)
	{
		return $this->app->make(TeamInvite::class)->where('deny_token', '=', $token)->first();
	}

	/**
	 * @param TeamInvite $invite
	 */
	public function denyInvite(TeamInvite $invite)
	{
		// Delete Invitation
		$invite->delete();

		// Notify invitee of decline
		Notification::create(['type' => 'team-invite', 'user_id' => $invite->user_id, 'timeline_id' => null, 'notified_by' => 0, 'text' => 'Your invitation to '. $invite->email .' was declined']);
	}
}
