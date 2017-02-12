<?php

namespace App\Models\Actor\User\Traits\Relationship;

use Illuminate\Support\Facades\Config;
use App\Models\Actor\User\User;

/**
 * Class NotificationRelationship
 * @package App\Models\Actor\User\Traits\Relationship
 */
trait NotificationRelationship
{
	/**
	 * Has-One relations with the user model.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function notified_from()
	{
		return $this->belongsTo(User::class, 'notified_by', 'id');
	}

}
