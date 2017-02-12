<?php

namespace App\Models\App\Forum;

use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class ForumTopic extends Model
{
	use Translatable;

	protected $table = 'forum_topics';

	public $translatedAttributes = [
		'title', 'text', 'calltoaction',
	];

	protected $fillable = [
		'slug', 'title', 'text', 'priority', 'forum_type_id', 'slug', 'icon', 'parent_id',
	];

	public function threads()
	{
		return $this->hasMany(ForumThread::class);
	}

	public function sub_topics()
	{
		return $this->hasMany(self::class, 'parent_id')->with('sub_topics.threads', 'threads');
	}
}
