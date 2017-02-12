<?php

namespace App\Listeners\Actor\User;

/**
 * Class NotificationEventListener
 * @package App\Listeners\Actor\User
 */
class NotificationEventListener
{
	/**
	 * @param $event
	 */
	public function onCreated($event) {
		// @TODO: Something
	}

	/**
	 * Register the listeners for the subscriber.
	 *
	 * @param  \Illuminate\Events\Dispatcher  $events
	 */
	public function subscribe($events)
	{
		$events->listen(
			\App\Events\Actor\User\NotificationPublished::class,
			'App\Listeners\Actor\User\NotificationEventListener@onCreated'
		);
	}
}
