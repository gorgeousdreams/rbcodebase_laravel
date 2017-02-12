<?php

/**
 * User Controllers
 */
Route::group(['namespace' => 'User'], function () {

	/**
	 * Public Profile
	 */
	Route::group(['middleware' => 'web'], function () {

		// Profiles
		Route::get('@{username}', 'ProfileController@index')->name('actor.user.profile.show');
	});


	/**
	 * Logged In
	 */
	Route::group(['middleware' => 'auth'], function () {

		// Notification
		Route::group(['namespace' => 'Notification'], function () {
			Route::get('notifications', 'NotificationController@index')->name('actor.user.notifications');
		});

		// Profile
		Route::group(['prefix' => 'profile'], function () {

			// Locale: Sets the specified locale to the session
			Route::get('lang/{lang}', 'LanguageController@swap')->name('actor.user.language.switcher');

			// Profile
			Route::group(['namespace' => 'Manage'], function () {
				Route::get('/', 'InfoController@index')->name('actor.user.profile');
				Route::get('edit', 'InfoController@edit')->name('actor.user.profile.edit');
				Route::patch('update', 'InfoController@update')->name('actor.user.profile.update');
				Route::get('password', 'InfoController@passwordResetForm')->name('actor.user.profile.password');

				// Opt-In/Out of Roles
				Route::get('opt-in/{id}', 'InfoController@roleOptIn')->name('actor.user.profile.role.optin');
				Route::get('opt-out/{id}', 'InfoController@roleOptOut')->name('actor.user.profile.role.optout');

				// Social Connections
				Route::get('social', 'InfoController@socialConnect')->name('actor.user.social.connect');
				Route::get('social/{provider}/disconnect', 'ProfileController@socialDisconnect')->name('actor.user.social.disconnect');

				// Media
				Route::group(['prefix' => 'media'], function () {
					Route::get('/', 'MediaController@index')->name('actor.user.profile.media');
					Route::post('upload/avatar', 'MediaController@uploadAvatar')->name('actor.user.profile.upload.avatar');
					Route::post('upload/banner', 'MediaController@uploadBanner')->name('actor.user.profile.upload.banner');
					Route::post('set', 'MediaController@mediaSet')->name('actor.user.profile.media.set');
				});
			});

			// Auth
			Route::group(['namespace' => 'Auth'], function () {
				// Logout
				Route::get('logout', 'LoginController@logout')->name('actor.user.auth.logout');

				// For when admin is logged in as user from backend
				Route::get('logout-as', 'LoginController@logoutAs')->name('actor.user.auth.logout-as');

				// Change Password Routes
				Route::patch('password/change', 'ChangePasswordController@changePassword')->name('actor.user.auth.password.change');
			});

			// Wallet
			Route::group(['prefix' => 'wallet'], function () {
				Route::get('/', 'Profile\WalletController@index')->name('actor.user.wallet.index');
				Route::get('/history', 'Profile\WalletController@history')->name('actor.user.wallet.history');
			});

		});

	});

	/**
	 * Logged or NOT
	 */
	Route::group(['namespace' => 'Auth'], function () {

		// Socialite Routes
		Route::get('login/{provider}', 'SocialLoginController@login')->name('actor.user.auth.social.login');

		// Confirm Account Routes
		Route::get('account/confirm/{token}', 'ConfirmAccountController@confirm')->name('actor.user.auth.confirm');
		Route::get('account/confirm/resend/{user}', 'ConfirmAccountController@sendConfirmationEmail')->name('actor.user.auth.confirm.resend');
	});

	/**
	 * NOT Logged In
	 */
	Route::group(['middleware' => 'guest', 'namespace' => 'Auth'], function () {

		// Authentication Routes
		Route::get('login', 'LoginController@showLoginForm')->name('actor.user.auth.login');
		Route::post('login', 'LoginController@login')->name('actor.user.auth.login');

		// Registration Routes
		if (config('actor.users.registration')) {
		Route::get('register', 'RegisterController@showRegistrationForm')->name('actor.user.auth.register');
		Route::post('register', 'RegisterController@register')->name('actor.user.auth.register');
		}

		// Password Reset Routes
		Route::get('password/reset', 'ForgotPasswordController@showLinkRequestForm')->name('actor.user.auth.password.email');
		Route::post('password/email', 'ForgotPasswordController@sendResetLinkEmail')->name('actor.user.auth.password.email');

		Route::get('password/reset/{token}', 'ResetPasswordController@showResetForm')->name('actor.user.auth.password.reset.form');
		Route::post('password/reset', 'ResetPasswordController@reset')->name('actor.user.auth.password.reset');

	});

});
