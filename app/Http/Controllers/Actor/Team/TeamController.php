<?php

namespace App\Http\Controllers\Actor\Team;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Exceptions\Actor\Team\UserNotInTeamException;
use App\Services\Actor\Team\Facades\Teams;
use App\Models\Actor\User\User;
use App\Models\Actor\Team\Team;
use App\Models\Actor\Team\TeamInvite;
use App\Repositories\Common\Breadcrumbs;

/**
 * Class TeamController
 * @package App\Http\Controllers\Actor\Team
 */
class TeamController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth');

		// Set Base Breadcrumb
		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		// Get Data
		$teams = auth()->user()->teams;

		// Any pending invites for logged user?
		$invites = TeamInvite::where('email', auth()->user()->email)->get();

		// Specify Title
		$title = 'Teams'; // @TODO: Translate

		// Set Breadcrumbs
		Breadcrumbs::push($title, route('actor.team.index'));

		// Return View
		return view('actor.team.index', compact('title', 'teams', 'invites'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		// Specify Title
		$title = 'Create a Team'; // @TODO: Translate

		// Set Breadcrumbs
		Breadcrumbs::push('Teams', route('actor.team.index'));
		Breadcrumbs::push($title, route('actor.team.create'));

		// Return View
		return view('actor.team.create', compact('title'));
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		// Get Record
		$team = Team::create([
			'name' => $request->name,
			'owner_id' => $request->user()->getKey()
		]);

		// Attach
		$request->user()->attachTeam($team);

		// Return Redirect
		return redirect(route('actor.team.index'));
	}

	/**
	 * Switch to the given team.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function switchTeam($id)
	{
		// Get Record
		$team = Team::findOrFail($id);
		try {
			auth()->user()->switchTeam($team);
		} catch ( UserNotInTeamException $e ) {
			abort(403);
		}

		// Return Redirect
		return redirect(route('actor.team.index'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id)
	{
		// Get Record
		$team = Team::findOrFail($id);

		// Do Not Let them edit if not the owner
		if (!auth()->user()->isOwnerOfTeam($team)) {
			abort(403);
		}

		// Specify Title
		$title = 'Edit '. $team->name; // @TODO: Translate

		// Set Breadcrumbs
		Breadcrumbs::push('Teams', route('actor.team.index'));
		Breadcrumbs::push($title, route('actor.team.create'));

		// Return View
		return view('actor.team.edit', compact('title', 'team'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		// Save Record
		$team = Team::findOrFail($id);
		$team->name = $request->name;
		$team->save();

		// Return Redirect
		return redirect(route('actor.team.index'));
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		// Get Data
		$team = Team::findOrFail($id);

		// Do NOT delete team if they are not the owner
		if (!auth()->user()->isOwnerOfTeam($team)) {
			abort(403);
		}

		// Else... Delete
		$team->delete();

		// Remove Team from User's Current
		User::where('current_team_id', $id)
					->update(['current_team_id' => null]);

		// Return Redirect
		return redirect(route('actor.team.index'));
	}

}
