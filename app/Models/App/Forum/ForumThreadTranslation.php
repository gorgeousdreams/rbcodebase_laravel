<?php

namespace App\Models\App\Forum;

use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class ForumThreadTranslation extends Model
{
	protected $table = 'forum_threads_translations';

	public $timestamps = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'locale', 'title', 'text',
	];
}
