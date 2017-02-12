<?php

namespace App\Http\Controllers\Actor\User\Auth;

use App\Http\Controllers\Controller;
use App\Events\Actor\User\UserRegistered;
use Illuminate\Foundation\Auth\RegistersUsers;
use App\Http\Requests\Actor\User\Auth\RegisterRequest;
use App\Repositories\Actor\User\UserRepository;
use App\Helpers\Actor\User\Socialite;
use App\Repositories\Common\Breadcrumbs;
use SEO;

/**
 * Class RegisterController
 * @package App\Http\Controllers\Actor\User\Auth
 */
class RegisterController extends Controller
{
	use RegistersUsers;

	/**
	 * @var UserRepository
	 */
	protected $user;

	/**
	 * RegisterController constructor.
	 * @param UserRepository $user
	 */
	public function __construct(UserRepository $user)
	{
		// Where to redirect users after registering
		if (config('actor.users.confirm_email')) {
			$this->redirectTo = route('actor.user.auth.login');
		} else {
			$this->redirectTo = route('common.dashboard');
		}

		$this->user = $user;
	}

	/**
	 * Show the application registration form.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function showRegistrationForm()
	{

		// Get Social Links
		$socialite = new Socialite;
		$socialite_links = $socialite->getSocialLinks();

		// Specify Title
		$title = trans('labels.frontend.auth.register_box_title');

		// Set Breadcrumbs
		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
		Breadcrumbs::push($title, '#');

		return view('actor.user.auth.register', compact('title', 'token', 'socialite_links'));
	}

	/**
	 * @param RegisterRequest $request
	 * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
	 */
	public function register(RegisterRequest $request)
	{
		if (config('actor.users.confirm_email')) {
			$user = $this->user->create($request->all());

			// Add User Types
			if (isset($data['types'])) {
				$user->updateTypes($data['types']);
			}

			// Trigger Event
			event(new UserRegistered($user));

			// Return Redirect
			return redirect($this->redirectPath())->withFlashSuccess(trans('exceptions.frontend.auth.confirmation.created_confirm'));
		} else {
			auth()->login($this->user->create($request->all()));

			// Add User Types
			if (isset($data['types'])) {
				$user->updateTypes($data['types']);
			}

			// Trigger Event
			event(new UserRegistered(access()->user()));

			// Return Redirect
			return redirect($this->redirectPath());
		}
	}

}
