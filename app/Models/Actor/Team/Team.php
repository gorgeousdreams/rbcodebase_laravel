<?php

namespace App\Models\Actor\Team;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;
use App\Models\Actor\Team\Traits\Relationship\TeamRelationship;
use App\Models\Actor\Team\Traits\Attribute\TeamAttribute;
use App\Models\Actor\Team\Traits\Scope\TeamScope;


class Team extends Model
{
	use TeamRelationship,
		TeamAttribute,
		TeamScope;

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
	protected $fillable = ['name', 'owner_id'];

	/**
	 * @param array $attributes
	 */
	public function __construct(array $attributes = [])
	{
		parent::__construct($attributes);
		$this->table = config('actor.team.teams_table');
	}

}
