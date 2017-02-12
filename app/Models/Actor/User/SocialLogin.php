<?php

namespace App\Models\Actor\User;

use Illuminate\Database\Eloquent\Model;

/**
 * Class SocialLogin
 * @package App\Models\Actor\User
 */
class SocialLogin extends Model
{
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
	protected $fillable = ['user_id', 'provider', 'provider_id', 'token', 'avatar'];

	/**
	 * @param array $attributes
	 */
	public function __construct(array $attributes = [])
	{
		parent::__construct($attributes);
		$this->table = config('actor.users_logins_table');
	}

}
