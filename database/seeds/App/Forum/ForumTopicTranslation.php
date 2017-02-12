<?php

namespace App\Models\App\Forum;

use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class ForumTopicTranslation extends Model
{
	protected $table = 'forum_topics_translations';

	public $timestamps = false;

	protected $fillable = [
		'title', 'text', 'calltoaction',
	];
}
