<?php

namespace App\Http\Controllers\Actor\User;

use App\Http\Controllers\Controller;
use App\Repositories\Actor\User\UserRepository;
use App\Models\Actor\User\User;
use App\Repositories\Common\Breadcrumbs;
use SEO;
use Illuminate\Http\Request;

/**
 * Class PublicController
 * @package App\Http\Controllers\Actor\User\Manage
 */
class ProfileController extends Controller
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

	public function index($name_slug)
	{
		// Get User Information
		$user = User::select('id', 'name_first', 'name_last', 'name_slug', 'email', 'confirmed', 'verified', 'status', 'timezone', 'language', 'created_at', 'updated_at')->where('name_slug', $name_slug)->firstorFail();

		$title = $user->getDisplayName();
		$description = $user->getDisplayName() .' is a member of '. config('app.name');

		// Meta
		SEO::setTitle($title);
		SEO::setDescription($description);
		SEO::opengraph()->addProperty('locale', app()->getLocale())
					->setTitle($title)
					->setDescription($description)
					->setType('profile')
					->setProfile([ //@TODO Consider Removing for Privacy Issues
						'first_name' => $user->name_first,
						'last_name' => $user->name_last,
						'username' => $user->name_slug,
					]);

		// Set Breadcrumbs
		Breadcrumbs::push($title, route('actor.user.profile.show', $user->id));

		// Return View
		return view('actor.user.public.index', compact('title', 'user'));
	}
}
