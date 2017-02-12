<?php

/**
 * All route names are prefixed with 'admin.user'
 */
Route::group(['prefix' => 'user', 'namespace'  => 'User'], function() {

	/**
	 * User Management
	 */
	Route::group(['middleware' => 'access.routeNeedsPermission:manage-users'], function() {

		// User Management
		Route::group(['prefix' => 'manage'], function () {

			// View List
			Route::get('/', 'UserController@index')->name('user.manage.index');
			Route::get('deactivated', 'UserStatusController@getDeactivated')->name('user.manage.deactivated');
			Route::get('deleted', 'UserStatusController@getDeleted')->name('user.manage.deleted');

			// Create
			Route::get('create', 'UserController@create')->name('user.manage.create');
			Route::post('store', 'UserController@store')->name('user.manage.store');

			// Manage Specific User
			Route::group(['prefix' => '{user}', 'where' => ['id' => '[0-9]+']], function () {

				// Edit
				Route::get('edit', 'UserController@edit')->name('user.manage.edit');
				Route::post('update', 'UserController@update')->name('user.manage.update');

				// Show
				Route::get('show', 'UserController@show')->name('user.manage.show');

				// Password
				Route::get('password/change', 'UserPasswordController@edit')->name('user.manage.change-password');
				Route::post('password/change', 'UserPasswordController@update')->name('user.manage.change-password');

				// Status
				Route::get('mark/{status}', 'UserStatusController@mark')->name('user.manage.mark')->where(['status' => '[0,1]']);

				// Account
				Route::get('account/confirm/resend', 'UserConfirmationController@sendConfirmationEmail')->name('user.account.confirm.resend');

				// Access
				Route::get('login-as', 'UserAccessController@loginAs')->name('user.login-as');
			});

			Route::group(['prefix' => '{deletedUser}', 'where' => ['id' => '[0-9]+']], function () {

				// Remove
				Route::get('destroy', 'UserController@destroy')->name('user.manage.destroy');
				Route::get('delete', 'UserStatusController@delete')->name('user.manage.delete-permanently');
				Route::get('restore', 'UserStatusController@restore')->name('user.manage.restore');
			});

		});


	});
});
