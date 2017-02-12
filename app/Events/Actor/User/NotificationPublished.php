<?php

namespace App\Events\Actor\User;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;

/**
 * Class NotificationPublished
 * @package App\Events\Actor\User
 */
class NotificationPublished extends Event
{
	use SerializesModels;

	/**
	* @var $notification
	* @var $user_id
	* @var $notified_from
	 */
	public $notification;
	public $user_id;
	public $notified_from;

	/**
	 * Create a new Notification instance.
	 *
	 * @var $notification
	 * @var $user_id
	 * @var $notified_from
	 * @return void
	 */
	public function __construct(Notification $notification, $notified_from, $username)
	{
		$this->notification = $notification;
		$this->user_id = $username->id;
		$this->notified_from = $notified_from;
	}

	/**
	 * Get the channels the event should be broadcast on.
	 *
	 * @return Channel|array
	 */
	public function broadcastOn()
	{
		return new PrivateChannel('notifications-'.$this->user_id);
	}
}
