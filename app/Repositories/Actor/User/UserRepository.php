<?php

namespace App\Repositories\Actor\User;

use App\Repositories\Repository;
use Illuminate\Support\Facades\DB;
use App\Exceptions\GeneralException;
use Illuminate\Support\Facades\Hash;

use App\Models\Actor\User\User;
use App\Models\Actor\User\UserMeta;
use App\Models\Actor\User\SocialLogin;

use App\Events\Actor\User\UserConfirmed;
use App\Repositories\Admin\Actor\User\RoleRepository;
use App\Notifications\Actor\User\UserNeedsConfirmation;

/**
 * Class UserRepository
 * @package App\Repositories\Actor\User
 */
class UserRepository extends Repository
{
	/**
	 * Associated Repository Model
	 */
	const MODEL = User::class;

	/**
	 * @var RoleRepository
	 */
	protected $role;

	/**
	 * @param RoleRepository $role
	 */
	public function __construct(RoleRepository $role)
	{
		$this->role = $role;
	}

	/**
	 * @param $email
	 * @return bool
	 */
	public function findByEmail($email) {
		return $this->query()->where('email', $email)->first();
	}

	/**
	 * @param $token
	 * @return mixed
	 * @throws GeneralException
	 */
	public function findByToken($token) {
		return $this->query()->where('confirmation_code', $token)->first();
	}

	/**
	 * @param $token
	 * @return mixed
	 * @throws GeneralException
	 */
	public function getEmailForPasswordToken($token) {
		if ($row = DB::table('user_password_resets')->where('token', $token)->first())
			return $row->email;
		throw new GeneralException(trans('auth.unknown'));
	}

	/**
	 * @param array $data
	 * @param bool $provider
	 * @return static
	 */
	public function create(array $data, $provider = false)
	{
		$user = self::MODEL;
		$user = new $user;
		$user->name_first = $data['name_first'];
		$user->name_last = $data['name_last'];
		$user->name_slug = $data['name_slug'];
		$user->email = $data['email'];
		$user->confirmation_code = md5(uniqid(mt_rand(), true));
		$user->status = 1;
		$user->password = $provider ? null : bcrypt($data['password']);
		$user->confirmed = $provider ? 1 : (config('actor.users.confirm_email') ? 0 : 1);
		$user->timezone = isset($data['timezone']) ? $data['timezone'] : 'UTC';
		$user->language = isset($data['language']) ? $data['language'] : 'en';

		DB::transaction(function() use ($user) {
			if (parent::save($user)) {
				/**
				 * Add the default site role to the new user
				 */
				$user->attachRole($this->role->getDefaultUserRole());
			}
		});

		/**
		 * If users have to confirm their email and this is not a social account,
		 * send the confirmation email
		 *
		 * If this is a social account they are confirmed through the social provider by default
		 */
		if (config('actor.users.confirm_email') && $provider === false) {
			$user->notify(new UserNeedsConfirmation($user->confirmation_code));
		}

		/**
		 * Return the user object
		 */
		return $user;
	}

	/**
	 * @param $data
	 * @param $provider
	 * @return UserRepository|bool
	 */
	public function findOrCreateSocial($data, $provider)
	{
		/**
		 * User email may not provided.
		 */
		$user_email = $data->email ? : "{$data->id}@{$provider}.com";

		/**
		 * Check to see if there is a user with this email first
		 */
		$user = $this->findByEmail($user_email);

		/**
		 * If the user does not exist create them
		 * The true flag indicate that it is a social account
		 * Which triggers the script to use some default values in the create method
		 */
		if (! $user) {

			// @TODO: Refactor
			$name_array = explode(' ', $data->name);
				$name_first = $name_array[0];
				$name_last = $name_array[1];

			$user = $this->create([
				'name_first'  => $name_first,
				'name_last'  => $name_last,
				'name_slug'  => str_slug($data->name),
				'email' => $user_email,
			], true);
		}

		/*
		// Available Meta
		Facebook:
			- profileUrl / link
			- avatar_original
			- id
			- verified
		Twitter
			+id: "13044"
			  +nickname: "rob_bertholf"
			  +name: "Rob Bertholf"
			  +email: "rob@bertholf.com"
			  +avatar: "http://pbs.twimg.com/profile_images/776644659271438336/DbOx9py2_normal.jpg"
			  +user: array:40 [▼
				"id_str" => "13044"
				"entities" => array:2 [▶]
				"protected" => false
				"followers_count" => 3998
				"friends_count" => 2615
				"listed_count" => 547
				"created_at" => "Sun Nov 19 04:24:47 +0000 2006"
				"favourites_count" => 3863
				"utc_offset" => -36000
				"time_zone" => "Hawaii"
				"geo_enabled" => true
				"verified" => false
				"statuses_count" => 6867
				"lang" => "en"
				"status" => array:25 [▶]
				"contributors_enabled" => false
				"is_translator" => false
				"is_translation_enabled" => false
				"profile_background_color" => "5E605D"
				"profile_background_tile" => false
				"profile_link_color" => "F5ABB5"
				"profile_sidebar_border_color" => "000000"
				"profile_sidebar_fill_color" => "FFFFFF"
				"profile_text_color" => "333333"
				"profile_use_background_image" => true
				"has_extended_profile" => true
				"default_profile" => false
				"default_profile_image" => false
				"following" => false
				"follow_request_sent" => false
				"notifications" => false
				"translator_type" => "regular"
				"url" => "https://t.co/RqHgc9W6py"
				"profile_background_image_url" => "http://pbs.twimg.com/profile_background_images/378800000180750001/LBNIOv0A.jpeg"
				"profile_background_image_url_https" => "https://pbs.twimg.com/profile_background_images/378800000180750001/LBNIOv0A.jpeg"
				"profile_image_url" => "http://pbs.twimg.com/profile_images/776644659271438336/DbOx9py2_normal.jpg"
				"profile_image_url_https" => "https://pbs.twimg.com/profile_images/776644659271438336/DbOx9py2_normal.jpg"
				"profile_banner_url" => "https://pbs.twimg.com/profile_banners/13044/1477931642"
				"location" => "San Diego, CA"
				"description" => "contradicton: world traveler+homebody. cold pressed juice or mountain dew. productive TV watcher. marketer+technologist. #entj coherent thoughts found at : @Rob"
			  ]
			  +"avatar_original": "http://pbs.twimg.com/profile_images/776644659271438336/DbOx9py2.jpg"
		Google
			  "kind" => "plus#person"
			   "etag" => ""xw0en60W6-NurXn4VBU-CMjSPEw/pXoIz85aeFPbkdP8LXPzUSdWfm8""
			   "occupation" => "Entrepreneur, Social Strategist, Software Developer, Technology Marketer"
			   "skills" => "Conversion Marketing, Social Marketing, Software Development, Database Architecture, Search Engine Optimization"
			   "gender" => "male"
			   "emails" => array:1 [▶]
			   "urls" => array:40 [▶]
			   "objectType" => "person"
			   "id" => "103103659952665647180"
			   "displayName" => "Rob Bertholf"
			   "name" => array:2 [▶]
			   "tagline" => "Technology Marketer"
			   "braggingRights" => "First Twitter user in Hawaii; Member of the Klout Squad"
			   "aboutMe" => "<div><div>In the crowded marketplace of search &amp; social experts, <b>Rob Bertholf</b> is literally a cut above the rest. With a #1 Google ranking for &quot;<a href="http://rob.bertholf.com" rel="nofollow" target="_blank">Search Engine Optimization Expert</a>&quot; (SEO) Rob demonstrates how his effective techniques provide results in even the most saturated environments. A seasoned digital pioneer, @Rob sent the first &quot;tweet&quot; from Hawaii and was among the first to bring GeoSocial to Hawaii. A former Staff Sergeant in the US Air Force with 15 years programming experience Rob has written applications used at the Pentagon, has invented/patented a content management system, developed over a dozen WordPress plugins and launched nearly 1000 websites during his career. Rob regularly shares his knowledge as keynote speaker/lecturer for corporate and academic audiences. </div><div><br /></div><div>Rob is a professional member of the Social Media Club, board of directors of ClimbHI and consults for SaaS Ventures and StoryManager.</div></div>"
			   "url" => "https://plus.google.com/+RobBertholf"
			   "image" => array:2 [▶]
			   "organizations" => array:7 [▶]
			   "placesLived" => array:11 [▶]
			   "isPlusUser" => true
			   "language" => "en"
			   "circledByCount" => 968
			   "verified" => false
			   "cover" => array:3 [▶]
			   "domain" => "bertholf.com"
		LinkedIn
			+id: "nOYJzRFt3t"
			 +nickname: null
			 +name: "Rob Bertholf (@Rob)"
			 +email: "rob@bertholf.com"
			 +avatar: "https://media.licdn.com/mpr/mprx/0_7SUPhwZZ9uENQbpo_p_PIakZtZ9N651QQSDjQO0M9mEz6vDEiS_-wVjMzsBNQFhFipDgHVYJxdvvhT69_OY7Hx1zVdvqhTWQ_OYKiY64AH8ZoBtVf7HO_oHdsy7XWTOBogVxkhLvG4d"
			 +user: array:11 [▼
			   "emailAddress" => "rob@bertholf.com"
			   "firstName" => "Rob"
			   "formattedName" => "Rob Bertholf (@Rob)"
			   "headline" => "Marketing Technologist"
			   "id" => "nOYJzRFt3t"
			   "industry" => "Internet"
			   "lastName" => "Bertholf (@Rob)"
			   "location" => array:2 [▶]
			   "pictureUrl" => "https://media.licdn.com/mpr/mprx/0_7SUPhwZZ9uENQbpo_p_PIakZtZ9N651QQSDjQO0M9mEz6vDEiS_-wVjMzsBNQFhFipDgHVYJxdvvhT69_OY7Hx1zVdvqhTWQ_OYKiY64AH8ZoBtVf7HO_oHdsy7XWTOBogVxkhLvG4d"
			   "pictureUrls" => array:2 [▶]
			   "publicProfileUrl" => "https://www.linkedin.com/in/bertholf"
			 ]
			 +"avatar_original": "https://media.licdn.com/mpr/mprx/0_xYrMk7zUXXmd3daxUqDxqUJgzsCu3w7V7R2RAl5RbLmW3bCp4RD0qLkR6UGu3dTJOB2RPLLRvPi2ts-vgzT9PN5jGPiutsPxOzTU67MgBWt5tDG9Olls8hQY5-"
			 +id: 721496
		GitHub
			 +nickname: "robertholf"
			 +name: "Rob Bertholf"
			 +email: "rob@bertholf.com"
			 +avatar: "https://avatars.githubusercontent.com/u/721496?v=3"
			 +user: array:30 [▼
			   "login" => "robertholf"
			   "id" => 721496
			   "avatar_url" => "https://avatars.githubusercontent.com/u/721496?v=3"
			   "gravatar_id" => ""
			   "url" => "https://api.github.com/users/robertholf"
			   "html_url" => "https://github.com/robertholf"
			   "followers_url" => "https://api.github.com/users/robertholf/followers"
			   "following_url" => "https://api.github.com/users/robertholf/following{/other_user}"
			   "gists_url" => "https://api.github.com/users/robertholf/gists{/gist_id}"
			   "starred_url" => "https://api.github.com/users/robertholf/starred{/owner}{/repo}"
			   "subscriptions_url" => "https://api.github.com/users/robertholf/subscriptions"
			   "organizations_url" => "https://api.github.com/users/robertholf/orgs"
			   "repos_url" => "https://api.github.com/users/robertholf/repos"
			   "events_url" => "https://api.github.com/users/robertholf/events{/privacy}"
			   "received_events_url" => "https://api.github.com/users/robertholf/received_events"
			   "type" => "User"
			   "site_admin" => false
			   "name" => "Rob Bertholf"
			   "company" => "Bertholf Companies"
			   "blog" => "http://rob.bertholf.com"
			   "location" => "San Diego, CA"
			   "email" => "rob@bertholf.com"
			   "hireable" => true
			   "bio" => null
			   "public_repos" => 13
			   "public_gists" => 6
			   "followers" => 23
			   "following" => 15
			   "created_at" => "2011-04-11T03:09:47Z"
			   "updated_at" => "2016-10-24T15:36:06Z"
			 ]
		*/


		/**
		 * See if the user has logged in with this social account before
		 */
		if (! $user->hasProvider($provider)) {
			/**
			 * Gather the provider data for saving and associate it with the user
			 */
			$user->providers()->save(new SocialLogin([
				'provider'    => $provider,
				'provider_id' => $data->id,
				'token'       => $data->token,
				'avatar'      => $data->avatar,
			]));
		} else {
			/**
			 * Update the users information, token and avatar can be updated.
			 */
			$user->providers()->update([
				'token'       => $data->token,
				'avatar'      => $data->avatar,
			]);
		}

		/**
		 * Return the user object
		 */
		return $user;
	}

	/**
	 * @param $token
	 * @return bool
	 * @throws GeneralException
	 */
	public function confirmAccount($token)
	{
		$user = $this->findByToken($token);

		if ($user->confirmed == 1) {
			throw new GeneralException(trans('exceptions.frontend.auth.confirmation.already_confirmed'));
		}

		if ($user->confirmation_code == $token) {
			$user->confirmed = 1;

			event(new UserConfirmed($user));
			return parent::save($user);
		}

		throw new GeneralException(trans('exceptions.frontend.auth.confirmation.mismatch'));
	}

	/**
	 * @param $id
	 * @param $input
	 * @return mixed
	 * @throws GeneralException
	 */
	public function updateProfile($id, $input)
	{
		$user = parent::find($id);
		$user->name_first       = $input['name_first'];
		$user->name_last        = $input['name_last'];
		$user->name_slug        = $input['name_slug'];
		$user->language         = $input['language'];
		$user->timezone         = $input['timezone'];

		if ($user->canChangeEmail()) {
			//Address is not current address
			if ($user->email != $input['email']) {
				//Emails have to be unique
				if ($this->findByEmail($input['email'])) {
					throw new GeneralException(trans('exceptions.frontend.auth.email_taken'));
				}

				$user->email = $input['email'];
			}
		}

		return parent::save($user);
	}

	/**
	 * @param $id
	 * @param $input
	 * @return mixed
	 */
	public function updateMeta($id, $input)
	{
		$user = parent::find($id);

		foreach ($input as $key => $value) {
			$field = UserMeta::firstOrNew([
				'user_id'  => $id,
				'field_id' => $key,
			]);

			$field->value = is_array($value) ? implode(UserField::DELIMITER, $value) : $value;
			$field->save();
		}
	}

	/**
	 * @param $input
	 * @return mixed
	 * @throws GeneralException
	 */
	public function changePassword($input)
	{
		$user = parent::find(access()->id());

		if (Hash::check($input['old_password'], $user->password)) {
			$user->password = bcrypt($input['password']);
			return parent::save($user);
		}

		throw new GeneralException(trans('exceptions.frontend.auth.password.change_mismatch'));
	}
}
