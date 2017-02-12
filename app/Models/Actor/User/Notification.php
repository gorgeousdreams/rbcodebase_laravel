<?php

namespace App\Models\Actor\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Actor\User\Traits\Relationship\NotificationRelationship;
use App\Models\Actor\User\Traits\Attribute\NotificationAttribute;
use App\Models\Actor\User\Traits\Scope\NotificationScope;

class Notification extends Model
{
	use SoftDeletes,
	NotificationRelationship,
	NotificationAttribute,
	NotificationScope;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table;

	/**
	 * The attributes that should be mutated to dates.
	 *
	 * @var array
	 */
	protected $dates = ['deleted_at'];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['type', 'post_id', 'timeline_id', 'user_id', 'notified_by', 'text', 'seen', 'link'];

	/**
	 * @param array $attributes
	 */
	public function __construct(array $attributes = [])
	{
		parent::__construct($attributes);
		$this->table = config('log-notifications.notifications_table');
	}

}
