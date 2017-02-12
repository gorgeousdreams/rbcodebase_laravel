<?php

namespace App\Listeners\Actor\Team;

use App\Http\Controllers\Actor\Team;

/**
 * Class TeamEventListener
 * @package App\Listeners\ActorTeam
 */
class TeamEventListener
{

	/**
	 * @param $event
	 */
	public function onUserInvitedToTeam($event) {
		// Add to Log File
		//@TODO: Add Log     \Log::info('User Inivted to ' . $event->user->getDisplayName() );
	}

	/**
	 * Register the listeners for the subscriber.
	 *
	 * @param  \Illuminate\Events\Dispatcher  $events
	 */
	public function subscribe($events)
	{
		$events->listen(
			\App\Events\Actor\Team\UserInvitedToTeam::class,
			'App\Listeners\Actor\Team\TeamEventListener@onUserInvitedToTeam'
		);

	}

	/**
	 * See if the session contains an invite token on login and try to accept it.
	 * @param mixed $event
	 */
	public function handle($event)
	{
		/*
		// If Referring Invitation was not yet registered.
		if (session('invite_token')) {
			if ($invite = Teams::getInviteFromAcceptToken(session('invite_token'))) {
				Teams::acceptInvite($invite);

				// Notify of Accept
				//Notification::create(['type' => 'team-invite', 'user_id' => $user->id, 'timeline_id' => null, 'notified_by' => Auth::user()->id, 'text' => Auth::user()->name.' accepted your invite to ']);
			}
			session()->forget('invite_token');
		}
		*/
	}

}
