<?php

namespace App\Models\Actor\User;

use Illuminate\Database\Eloquent\Model;
use App\Models\Actor\User\Traits\Relationship\PermissionRelationship;

/**
 * Class Permission
 * @package App\Models\Actor\User
 */
class Permission extends Model
{
	use PermissionRelationship;

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
	protected $fillable = ['slug', 'title', 'sort'];

	/**
	 * @param array $attributes
	 */
	public function __construct(array $attributes = [])
	{
		parent::__construct($attributes);
		$this->table = config('actor.permissions_table');
	}
}
