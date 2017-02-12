<?php

/**
 * All route names are prefixed with 'admin.user'
 */
Route::group(['prefix' => 'user', 'namespace'  => 'User'], function() {

	/**
	 * Role Management
	 */
	Route::group(['middleware' => 'access.routeNeedsPermission:manage-roles'], function() {

		// Roles
		Route::group(['prefix' => 'role'], function () {
			// View List
			Route::get('/', 'RoleController@index')->name('user.role.index');

			// Create
			Route::get('create', 'RoleController@create')->name('user.role.create');
			Route::post('store', 'RoleController@store')->name('user.role.store');

			// Manage Specific Role
			Route::group(['prefix' => '{role}', 'where' => ['id' => '[0-9]+']], function () {

				// Edit
				Route::get('edit', 'RoleController@edit')->name('user.role.edit');
				Route::post('update', 'RoleController@update')->name('user.role.update');

				// Delete
				Route::get('destroy', 'RoleController@destroy')->name('user.role.delete');
			});
		});

		// Custom Fields
		Route::group(['prefix' => 'fields'], function () {
			// All
			Route::get('/', 'UserFieldController@index')->name('user.fields.index');
			// Create
			Route::get('create', 'UserFieldController@create')->name('user.fields.create');
			Route::post('store', 'UserFieldController@store')->name('user.fields.store');
			// Single
			Route::group(['prefix' => '{field}', 'where' => ['id' => '[0-9]+']], function () {
				// Edit
				Route::get('edit', 'UserFieldController@edit')->name('user.fields.edit');
				Route::post('update', 'UserFieldController@update')->name('user.fields.update');
				// Destroy
				Route::get('destroy', 'UserFieldController@destroy')->name('user.fields.delete');
			});
		});

	});

});
