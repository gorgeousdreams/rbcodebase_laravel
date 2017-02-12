<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Contracts\Events\Dispatcher as DispatcherContract;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

// @TODO: Cleanup
//use App\Models\Actor\User\Notification;
//use App\Observers\Common\NotificationObserver;
// @TODO: Message use App\Observers\Common\MessageObserver;
//        use Cmgmyr\Messenger\Models\Message;

class EventServiceProvider extends ServiceProvider
{
	/**
	 * The event listener mappings for the application.
	 *
	 * @var array
	 */
	protected $listen = [
		//
	];

	/**
	 * Class event subscribers
	 * @var array
	 */
	protected $subscribe = [
		/**
		 * Marketing Front-End Subscribers
		 */

		/**
		 * Actors
		 */
		\App\Listeners\Actor\User\UserEventListener::class,
		\App\Listeners\Actor\User\NotificationEventListener::class,

		/**
		 * Admin Subscriber
		 */
		\App\Listeners\Admin\Actor\User\UserEventListener::class,
		\App\Listeners\Admin\Actor\User\RoleEventListener::class,
	];

	/**
	 * Register any other events for your application.
	 *
	 * @param \Illuminate\Contracts\Events\Dispatcher $events
	 *
	 * @return void
	 */
	public function boot()
	{
		parent::boot();

		// Notification::observe(new NotificationObserver());
		// Message::observe(new MessageObserver());
	}
}
