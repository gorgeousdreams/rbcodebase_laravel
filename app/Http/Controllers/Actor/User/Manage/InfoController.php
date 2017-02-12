<?php

namespace App\Http\Controllers\Actor\User\Manage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Actor\User\Profile\UpdateProfileRequest;
use App\Repositories\Actor\User\UserRepository;
use App\Models\Actor\User\User;
use App\Models\Actor\User\UserField;
use App\Models\Actor\User\UserMeta;
use App\Models\Actor\User\Role;
use App\Models\Actor\User\SocialLogin;
use App\Repositories\Common\Breadcrumbs;
use SEO;
use Illuminate\Http\Request;

/**
 * Class ProfileController
 * @package App\Http\Controllers\Actor\User\Manage
 */
class InfoController extends Controller
{
	/**
	 * @var UserRepository
	 */
	protected $user;

	/**
	 * ProfileController constructor.
	 * @param UserRepository $user
	 */
	public function __construct(UserRepository $user)
	{
		$this->user = $user;

		// Set Base Breadcrumb
		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
	}

	/**
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function index()
	{
		// User
		$user = access()->user();
			$roles = $user->roles;
			// @TODO: Check if:  $fields = $roles->fields;
			$permissions = $user->permissions;

		// User Meta
		$usermeta = UserField::whereHas('role', function ($q) {
				$q->whereIn('id', access()->user()->roles->pluck('id'));
			})->withMeta(access()->user()->id)->get();

		// Specify Title
		$title = 'Profile';

		// Set Breadcrumbs
		Breadcrumbs::push($title, route('actor.user.profile'));

		// Return View
		return view('actor.user.profile.index', compact('title', 'user', 'roles', 'permissions', 'usermeta'));
	}

	/**
	 * @return mixed
	 */
	public function edit()
	{

		// Get User
		$user = access()->user();
		// Get User's Roles
		$userRoles = $user->roles->pluck('id')->toArray();

		// Get All Roles
		$roles = Role::get();

		// Specify Title
		$titleparent = 'Profile';
		$title = 'Edit'; // @TODO: Translate

		// Set Breadcrumbs
		Breadcrumbs::push($titleparent, route('actor.user.profile'));
		Breadcrumbs::push($title, route('actor.user.profile.edit'));

		// Return View
		return view('actor.user.profile.edit', compact('title', 'user', 'roles', 'userRoles'));
	}

	/**
	 * @param  UserRepositoryContract $user
	 * @param  UpdateProfileRequest $request
	 * @return mixed
	 */
	public function update(UpdateProfileRequest $request)
	{
		$user = access()->user();

		// Update Standard Information
		$this->user->updateProfile($user->id, $request->all());

		// Update Role Meta
		$this->user->updateMeta($user->id, $request->meta);

		// Return Redirect
		return redirect()->route('actor.user.profile')->withFlashSuccess(trans('strings.frontend.user.profile_updated'));
	}

	public function passwordResetForm($token = null)
	{
		$user = access()->user();

		// Specify Title
		$titleparent = 'Profile';
		$title = trans('labels.frontend.user.passwords.change');

		// Set Breadcrumbs
		Breadcrumbs::push($titleparent, route('actor.user.profile'));
		Breadcrumbs::push($title, route('actor.user.profile.edit'));

		// Return View
		return view('actor.user.profile.passwords.change', compact('title', 'user'));
	}

	public function socialConnect()
	{
		// User
		$user = access()->user();

		// Specify Title
		$titleparent = 'Profile';
		$title = 'Social Connect'; // @TODO: Translate

		// Set Breadcrumbs
		Breadcrumbs::push($titleparent, route('actor.user.profile'));
		Breadcrumbs::push($title, route('actor.user.social.connect'));

		// Intended redirect
		if(session()->has('_previous')){
			session()->put('url.intended', route('actor.user.social.connect'));
		}

		// Return View
		return view('actor.user.profile.connect.index', compact('title', 'user'));
	}

	// Disconnect
	public function socialDisconnect($provider)
	{
		// Remove Socialite Record
		$socialiteUser = SocialLogin::where('provider', $provider)->delete();

		// Return Redirect
		return redirect()->route('actor.user.social.connect')->withFlashSuccess($provider .' disconnected successfully'); // @TODO: Translate   trans('auth.socialite.disconnect', ['provider' => $provider])
	}

	// Opt-In to Role
	public function roleOptIn($id)
	{
		// Get Authenticated User
		$user = access()->user();

		// Double Check Role validity & permissions
		$role = Role::where('id', $id)->firstOrFail();

		// Can you self-serve this role?
		if($role->self_opt_in) {
			// Update Standard Information
			$user->attachRole($id);

			// Return Redirect
			return redirect()->route('actor.user.profile.edit')->withFlashSuccess($role->title .' added successfully'); // @TODO: Translate
		} else {
			// Do NOTHING & Return Redirect
			return redirect()->route('actor.user.profile.edit')->withFlashSuccess('ERROR: '. $role->title .' does not allow self opt-in.  Please contact administrator'); // @TODO: Translate
		}

	}

	// Opt-Out of Role
	public function roleOptOut($id)
	{
		// Get Authenticated User
		$user = access()->user();

		// Double Check Role validity & permissions
		$role = Role::where('id', $id)->firstOrFail();

		// Can you self-serve this role?
		if($role->self_opt_out) {
			// Update Standard Information
			$user->detachRole($id);

			// Return Redirect
			return redirect()->route('actor.user.profile.edit')->withFlashSuccess($role->title .' removed successfully'); // @TODO: Translate
		} else {
			// Do NOTHING & Return Redirect
			return redirect()->route('actor.user.profile.edit')->withFlashSuccess('ERROR: '. $role->title .' does not allow self opt-out.  Please contact administrator'); // @TODO: Translate
		}

	}
}
