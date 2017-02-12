<?php

namespace App\Http\Controllers\Actor\User\Manage;

use App\Http\Controllers\Controller;
use App\Models\Actor\User\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Storage;
use Image;
use App\Repositories\Common\Breadcrumbs;
use SEO;

/**
 * Class MediaController
 * @package App\Http\Controllers\Actor\User\Manage
 */
class MediaController extends Controller
{
	public function __construct()
	{
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

		// Get Other Images
		$images = '';

		// Specify Title
		$title_parent = 'Profile'; // @TODO: Translate
		$title = 'Media';

		// Set Breadcrumbs
		Breadcrumbs::push($title_parent, route('actor.user.profile'));
		Breadcrumbs::push($title, route('actor.user.profile.media'));

		// Set View
		return view('actor.user.profile.media.index', compact('title', 'user'));
	}

	// Set Avatar
	public function mediaSet(Request $request)
	{
		// Get Active User
		$user = access()->user();

		// Check Media Type
		if ($request->target == 'avatar') {
			// Set Message
			$text = $request->target .' set'; // @TODO: Translate

			// Set the avatar to the requested URL
			$user->img_avatar = $request->url;
			$user->save();

		} elseif ($request->target == 'background') {
			// Set Message
			$text = $request->target .' set'; // @TODO: Translate

			// Set the avatar to the requested URL
			$user->img_background = $request->url;
			$user->save();

		} else {
			// @TODO: Throw Error
			$text = 'Error';
		}

		// Return Redirect
		return redirect()->route('actor.user.profile.media')->withFlashSuccess($text);
	}


	public function uploadAvatar(Request $request)
	{
		// Generate a hash from timestamp
		$now = Carbon::now();
		$filename = md5($now->timestamp);

		// Get Avatar
		$file = request()->file('img_avatar');
		$ext = $file->guessClientExtension();

		// Save Avatar
		$path = $file->storeAs('/public/uploads/actor/user-'. auth()->id(), $filename.'.'.$ext);

		/*
		// Resize Avatar
		$image = Image::make($path)->encode('jpg')->resize(200, 200)->save($original_image);
		$image->crop(
				$request->cropped_area['size']['w'],
				$request->cropped_area['size']['h'],
				$request->cropped_area['coordinates']['x'],
				$request->cropped_area['coordinates']['y'])
			->save($crop_image);
		*/

		//
		$user = access()->user();
		$user->img_avatar = substr($path, 6);
		$user->save();

		return back();
	}

	public function uploadBanner(Request $request)
	{
		$now = Carbon::now();
		$upload_directory_dir = 'public/uploads/'. $now->year . '/' . $now->month . '/' . $now->day;
		$upload_directory_url = 'uploads/'. $now->year . '/' . $now->month . '/' . $now->day;
		Storage::makeDirectory($upload_directory_dir);
		$md5 = md5($now->timestamp);
		$full_path = storage_path('app/'. $upload_directory_dir . '/');
		$original_image = $full_path . $md5 . '.png';
		$crop_image_filename = $md5 . '_'. $request->cropped_area['size']['w'] . 'x'. $request->cropped_area['size']['h'] . '_' . $request->cropped_area['coordinates']['x'] . 'x' .  $request->cropped_area['coordinates']['y'] .'.png';
		$crop_image = $full_path . $crop_image_filename;
		$image = Image::make($request->base64_image)->encode('jpg')->resize(200, 200)->save($original_image);
		$image->crop(
				$request->cropped_area['size']['w'],
				$request->cropped_area['size']['h'],
				$request->cropped_area['coordinates']['x'],
				$request->cropped_area['coordinates']['y'])
			->save($crop_image);

		$user = access()->user();
		$user->img_background = $upload_directory_url . '/'. $crop_image_filename;
		$user->save();

		// Handle AJAX Requests
		if(\Request::ajax()) {
			return url( $upload_directory_url .'/'. $crop_image_filename);
		}

	}
}
