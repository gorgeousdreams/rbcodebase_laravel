<?php

namespace App\Http\Controllers\Actor\Team;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;
use App\Exceptions\Actor\Team\UserNotInTeamException;
use App\Services\Actor\Team\Facades\Teams;
use App\Models\Actor\User\User;
use App\Models\Actor\Team\Team;
use App\Models\Actor\Team\TeamInvite;
use App\Repositories\Common\Breadcrumbs;

/**
 * Class TeamAuthController
 * @package App\Http\Controllers\Actor\Team
 */
class TeamAuthController extends Controller
{
	/**
	 * Accept the given invite
	 * @param $token
	 * @return \Illuminate\Http\RedirectResponse
	 */
	public function acceptInvite($token)
	{
		// Get Invite Details
		$invite = Teams::getInviteFromAcceptToken($token);
		if(!$invite) {
			abort(404);
			// @TODO: Refactor to give nice message if invite is removed or taken.
		}

		// Check if they are a user already or not
		$user = User::where('email', $invite->email)->first();

		if(!$user) {
			// Redirect to Registration

				// Set Session with Invite Token
				session(['invite_token' => $token]);

				// Trigger Event
				//event(new onRegistered($user);

				// Return Redirect
				return redirect()->route('actor.user.auth.register');
		} else {
			// They are a User

			if(auth()->check()) {
				Teams::acceptInvite($invite);

				// Return Redirect
				return redirect()->route('actor.team.index');
			} else {
				session(['invite_token' => $token]);

				// Return Redirect
				return redirect()->route('actor.user.auth.login');
			}
		}
	}

	/**
	 * Decline the given invite
	 * @param $token
	 * @return \Illuminate\Http\RedirectResponse
	 */
	public function declineInvite($token)
	{
		// Get Invite Details
		$invite = Teams::getInviteFromDenyToken($token);
		if(!$invite) {
			abort(404);
		}

		// Deny Invite
		Teams::denyInvite($invite);

		// Determine Appropriate Redirect
		if(auth()->check()) {
			// Return Redirect Back
			return redirect()->route('actor.team.index')->withFlashSuccess('Invitation Declined.');
		} else {
			// Return Redirect
			return redirect()->route('actor.user.auth.register')->withFlashSuccess('Invitation Declined.');
		}

	}
}
