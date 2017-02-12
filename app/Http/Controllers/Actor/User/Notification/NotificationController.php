<?php

namespace App\Http\Controllers\Actor\User\Notification;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use App\Models\Actor\User\User;
use App\Models\Actor\User\Notification;

use App\Repositories\Common\Breadcrumbs;
use SEO;

/**
 * Class NotificationController
 * @package App\Models\Actor\User\Notification
 */
class NotificationController extends Controller
{

	public function __construct()
	{
		// Set Base Breadcrumb

		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
	}

	/**
	 * Get Notifications
	 *
	 * @param $username
	 * @param $id
	 * @return redirect
	 */
	public function getNotifications(Request $request)
	{
		$post = Post::findOrFail($request->post_id);

		if (!$post->notifications_user->contains(Auth::user()->id)) {
			$post->notifications_user()->attach(Auth::user()->id);

			return response()->json(['status' => '200', 'notified' => true, 'message' => 'Successfull']);
		} else {
			$post->notifications_user()->detach([Auth::user()->id]);

			return response()->json(['status' => '200', 'unnotify' => false, 'message' => 'UnSuccessfull']);
		}
	}


	public function index()
	{
		$mode = 'notifications';
		$notifications = Notification::where('user_id', Auth::user()->id)->with('notified_from')->ordered()->paginate(20);

		$defaultuser = User::where('email', config('log-notifications.default_notifier'))->first();

		// @TODO: Expand
		//$trending_tags = trendingTags();
		//$suggested_users = suggestedUsers();
		//$suggested_groups = suggestedGroups();
		//$suggested_pages = suggestedPages();

		// Redirect if no notifications
		//if ($notifications == null) {
		//	return redirect('/');
		//}

		// Specify Title
		$title = 'Notifications'; // @TODO: Translate

		// Set Breadcrumbs
		Breadcrumbs::push($title, route('marketing.index'));

		// Return View
		return view('actor.user.notifications.index', compact('title', 'notifications', 'defaultuser'));


		// @TODO: Cleanup return $theme->scope('timeline/single-post', compact('notifications', 'suggested_users', 'trending_tags', 'suggested_groups', 'suggested_pages', 'mode'))->render();
	}

	/**
	 * Set Notification as seen and redirect
	 *
	 * @param $username
	 * @param $id
	 * @return redirect
	 */
	public function redirectNotification($username, $id)
	{
		// Run Middleware
		$this->middleware('editOwn');

		// Get Notification by ID
		$notification = Notification::findOrFail($id);

		// Mark as Seen
		$notification->seen = 1;
		$notification->save();

		// Return redirect to specified URL
		if ($notification->link != null) {
			return redirect(url($notification->link));
		}

		// Return Redirect
		return redirect(url('/'));
	}

	/**
	 * Mark all notifications as read
	 *
	 * @return redirect
	 */
	public function markAllRead()
	{
		$notifications = Notification::where('user_id', Auth::user()->id)->with('notified_from')->update(['seen' => 1]);
	}

	public function deleteNotification(Request $request)
	{
		$notification = Notification::find($request->notification_id);
		if ($notification->delete()) {
			Flash::success(trans('messages.notification_deleted_success'));

			return response()->json(['status' => '200', 'notify' => true, 'message' => 'Notification deleted successfully']);
		}
	}
}
