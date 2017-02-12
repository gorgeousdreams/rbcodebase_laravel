<?php

namespace App\Http\Controllers\Actor\User\Auth;

use App\Helpers\Actor\User\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Exceptions\GeneralException;
use App\Helpers\Actor\User\Socialite;
use App\Events\Actor\User\UserLoggedIn;
use App\Events\Actor\User\UserLoggedOut;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Repositories\Common\Breadcrumbs;
use SEO;

/**
 * Class LoginController
 * @package App\Http\Controllers\Actor\User\Auth
 */
class LoginController extends Controller
{
	use AuthenticatesUsers;

	/**
	 * Where to redirect users after login
	 * @return string
	 */
	public function redirectPath()
	{
		if (access()->allow('view-backend')) {
			return route('admin.dashboard');
		}

		return route('actor.user.profile');
	}

	/**
	 * Show the application's login form.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function showLoginForm()
	{
		// Intended redirect after login
		if(session()->has('_previous')){
			session()->put('url.intended', url()->previous());
		}

		// Get Social Links
		$socialite = new Socialite;
		$socialite_links = $socialite->getSocialLinks();

		// Specify Title
		$title = trans('labels.frontend.auth.login_box_title');

		// Set Breadcrumbs
		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
		Breadcrumbs::push($title, '#');

		return view('actor.user.auth.login', compact('title', 'token', 'socialite_links'));
	}

	/**
	 * @param Request $request
	 * @param \App\Models\Actor\User\User  $user
	 * @return \Illuminate\Http\RedirectResponse
	 * @throws GeneralException
	 */
	protected function authenticated(Request $request, $user)
	{
		/**
		 * Check to see if the users account is confirmed and active
		 */

		// check config for user confirmation
		if(config('actor.users.confirm_email')) {
			if (! $user->isConfirmed()) {
				access()->logout();
				throw new GeneralException(trans('exceptions.frontend.auth.confirmation.resend', ['user_id' => $user->id]));
			} elseif (! $user->isActive()) {
				access()->logout();
				throw new GeneralException(trans('exceptions.frontend.auth.deactivated'));
			}
		} elseif (! $user->isActive()) {
			access()->logout();
			throw new GeneralException(trans('exceptions.frontend.auth.deactivated'));
		}

		// Trigger Event
		event(new UserLoggedIn($user));

		// Return Redirect
		return redirect()->intended($this->redirectPath());
	}

	/**
	 * Log the user out of the application.
	 *
	 * @param  Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function logout(Request $request)
	{
		/**
		 * Boilerplate needed logic
		 */

		/**
		 * Remove the socialite session variable if exists
		 */
		if (app('session')->has(config('actor.socialite_session_name'))) {
			app('session')->forget(config('actor.socialite_session_name'));
		}

		/**
		 * Remove any session data from backend
		 */
		app()->make(Auth::class)->flushTempSession();

		// Trigger Event
		event(new UserLoggedOut($this->guard()->user()));

		/**
		 * Laravel specific logic
		 */
		$this->guard()->logout();
		$request->session()->flush();
		$request->session()->regenerate();

		return redirect('/');
	}

	/**
	 * @return \Illuminate\Http\RedirectResponse
	 */
	public function logoutAs() {
		//If for some reason route is getting hit without someone already logged in
		if (! access()->user()) {
			return redirect()->route('actor.user.auth.login');
		}

		//If admin id is set, relogin
		if (session()->has('admin_user_id') && session()->has('temp_user_id')) {
			//Save admin id
			$admin_id = session()->get('admin_user_id');

			app()->make(Auth::class)->flushTempSession();

			//Re-login admin
			access()->loginUsingId((int)$admin_id);

			//Redirect to backend user page
			return redirect()->route('admin.actor.user.manage.index');
		} else {
			app()->make(Auth::class)->flushTempSession();

			//Otherwise logout and redirect to login
			access()->logout();
			return redirect()->route('actor.user.auth.login');
		}
	}
}
