<?php

namespace App\Models\App\Forum;

use Illuminate\Database\Eloquent\Model;

class ForumTopicType extends Model
{
	protected $table = 'forum_config_topictypes';

	public $timestamps = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'slug', 'title',
	];
}
