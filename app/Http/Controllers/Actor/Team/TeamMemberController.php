<?php

namespace App\Http\Controllers\Actor\Team;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;
use App\Services\Actor\Team\Facades\Teams;
use App\Models\Actor\User\User;
use App\Models\Actor\User\Notification;
use App\Models\Actor\Team\Team;
use App\Models\Actor\Team\TeamInvite;

/**
 * Class TeamMemberController
 * @package App\Http\Controllers\Actor\Team
 */
class TeamMemberController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');
	}

	/**
	 * Show the members of the given team.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		// Get Team
		$team = Team::findOrFail($id);

		// Return View
		return view('actor.team.members.list', compact('team'));
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param int $team_id
	 * @param int $user_id
	 * @return \Illuminate\Http\Response
	 * @internal param int $id
	 */
	public function destroy($team_id, $user_id)
	{
		// Get Team
		$team = Team::findOrFail($team_id);
		if (!auth()->user()->isOwnerOfTeam($team)) {
			abort(403);
		}

		// Get User
		$user = User::findOrFail($user_id);
		if ($user->getKey() === auth()->user()->getKey()) {
			abort(403);
		}

		// Remove Team from User
		$user->detachTeam($team);

		// Return Redirect
		return redirect(route('actor.team.index'));
	}

	/**
	 * Assign ownership of the specified resource.
	 *
	 * @param int $team_id
	 * @param int $user_id
	 * @return \Illuminate\Http\Response
	 * @internal param int $id
	 */
	public function assignOwner($team_id, $user_id)
	{
		// Get Team
		$team = Team::findOrFail($team_id);
		if (!auth()->user()->isOwnerOfTeam($team)) {
			abort(403);
		}

		// Get the User account of new owner
		$user = User::findOrFail($user_id);
		if ($user->getKey() === auth()->user()->getKey()) {
			abort(403);
		}

		// Assign new owner
		$team->owner_id = $user_id;
		$team->save();

		// Notify New Owner
		Notification::create(['type' => 'team-invite', 'user_id' => $user_id, 'notified_by' => access()->user()->id, 'text' => 'You have been assigned the owner of '. $team->name .' by '. auth()->user()->getDisplayName()]);

		// Return Redirect
		return redirect(route('actor.team.index'));
	}

	/**
	 * @param Request $request
	 * @param int $team_id
	 * @return $this
	 */
	public function invite(Request $request, $team_id)
	{
		// Get Invitor
		$invitor = access()->user()->id;

		// Get Team
		$team = Team::findOrFail($team_id);

		// Figure out if we should send them an invite or not:
		$hasinvite = false;

		// Check if Invitee is a member already
		$user = User::where('email', $request->email)->first();

		// They are a user, check if already in team
		if($user) {
			// They are a user in the system, now check if they are in the team already
			$userinteam = Team::where('id', $team_id)->has('users')->with(['users' => function($q) use ($request) {
						$q->where('email', $request->email);
						$q->first();
					}])->first();
			if(count($userinteam->users)) {
				// Return Redirect
				return redirect()->back()->withErrors(['email' => 'The user is already a member of the team.']);
				$hasinvite = true;
			} else {
				$hasinvite = false;
			}
		}

		// If they are not in the team, check if they have an invite
		if ($hasinvite == false && !Teams::hasPendingInvite($request->email, $team)) {
			// Invite to Team
			Teams::inviteToTeam( $request->email, $team, function($invite) {
				// Trigger Event to Send Welcome Email
				Mail::send('emails.actor.team.invite', ['team' => $invite->team, 'invite' => $invite], function ($m) use ($invite) {
					$m->to($invite->email)->subject('Invitation to join team '.$invite->team->name);
				});
				// Send email to user
			});
		} else {
			// Return Redirect
			return redirect()->back()->withErrors(['email' => 'The email address is already invited to the team.']);
		}

		// Return Redirect
		return redirect(route('actor.team.members.show', $team->id))->withFlashSuccess('Invitation Sent.');
	}

	/**
	 * Resend an invitation mail.
	 *
	 * @param $invite_id
	 * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
	 */
	public function resendInvite($team_id, $invite_id)
	{
		$invite = TeamInvite::findOrFail($invite_id);
		Mail::send('emails.actor.team.invite', ['team' => $invite->team, 'invite' => $invite], function ($m) use ($invite) {
			$m->to($invite->email)->subject('Invitation to join team '.$invite->team->name);
		});

		return redirect(route('actor.team.members.show', $invite->team))->withFlashSuccess('Invitation Re-sent.');
	}

	/**
	 * Revoke an invitation mail.
	 *
	 * @param $invite_id
	 * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
	 */
	public function revokeInvite($team_id, $invite_id)
	{
		// Get Record
		$invite = TeamInvite::findOrFail($invite_id);
			$email = $invite->email;
			$team_id = $invite->team_id;

		// Remove Record
		$record = TeamInvite::where('email', $email)->where('team_id', $team_id)->delete();

		// Return Redirect
		return redirect(route('actor.team.members.show', $team_id));
	}
}
