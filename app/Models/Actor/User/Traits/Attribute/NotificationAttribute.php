<?php

namespace App\Models\Actor\User\Traits\Attribute;

/**
 * Class NotificationAttribute
 * @package App\Models\Actor\User\Traits\Attribute
 */
trait NotificationAttribute
{

	/**
	 * Get the status of the notification.
	 *
	 * @param string $value
	 *
	 * @return string
	 */
	public function getSeenAttribute($value)
	{
		return ($value == 0) ? false : true;
	}

}
