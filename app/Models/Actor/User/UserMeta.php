<?php

namespace App\Models\Actor\User;

use App\Models\Actor\User\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\Actor\User\Traits\Scope\UserMetaScope;
use App\Models\Actor\User\Traits\Relationship\UserMetaRelationship;

class UserMeta extends Model
{
	use UserMetaScope,
		UserMetaRelationship;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'user_id', 'field_id', 'value',
	];

	/**
	 * @param array $attributes
	 */
	public function __construct(array $attributes = [])
	{
		parent::__construct($attributes);
		$this->table = config('actor.users_metas_table');
	}

}
