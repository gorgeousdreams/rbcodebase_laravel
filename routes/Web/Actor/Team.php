<?php

/**
 * Team Controllers
 */
Route::group(['namespace' => 'Team'], function () {

	Route::group(['prefix' => 'teams'], function() { // @TODO: Change "teams" to custom route name

		// View List
		Route::get('/', 'TeamController@index')->name('actor.team.index');

		// Create Team
		Route::get('create', 'TeamController@create')->name('actor.team.create');
		Route::post('teams', 'TeamController@store')->name('actor.team.store');

		// Manage Specific Role
		Route::group(['prefix' => '{team}', 'where' => ['id' => '[0-9]+']], function () {

			// Edit
			Route::get('edit', 'TeamController@edit')->name('actor.team.edit');
			Route::put('edit', 'TeamController@update')->name('actor.team.update');

			// Delete
			Route::delete('destroy', 'TeamController@destroy')->name('actor.team.destroy');

			// Switch
			Route::get('switch', 'TeamController@switchTeam')->name('actor.team.switch');

			// Manage Members
			Route::group(['prefix' => 'members'], function () {
				// Show All
				Route::get('/', 'TeamMemberController@show')->name('actor.team.members.show');

				// Invite
				Route::post('/', 'TeamMemberController@invite')->name('actor.team.members.invite');


				// Resend Invite
				Route::get('resend/{invite_id}', 'TeamMemberController@resendInvite')->name('actor.team.members.resend_invite');

				// Revoke Invite
				Route::get('revoke/{invite_id}', 'TeamMemberController@revokeInvite')->name('actor.team.members.revoke_invite');

				// Change Owner
				Route::get('owner/{user_id}', 'TeamMemberController@assignOwner')->name('actor.team.members.change_owner');

				// Remove from Team
				Route::delete('{user_id}', 'TeamMemberController@destroy')->name('actor.team.members.destroy');

			});

		});

		Route::get('accept/{token}', 'TeamAuthController@acceptInvite')->name('actor.team.invite_accept');
		Route::get('decline/{token}', 'TeamAuthController@declineInvite')->name('actor.team.invite_decline');

	});

});
