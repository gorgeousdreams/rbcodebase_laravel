<?php

namespace App\Models\App\Forum;

use App\Models\Actor\User\User;
use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class ForumThread extends Model
{
	use Translatable;

	protected $table = 'forum_threads';

	public $translatedAttributes = [
		'title', 'text',
	];

	public $useTranslationFallback = true;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'user_id', 'brand_id', 'slug', 'featured', 'reportable', 'is_pinned',
	];

	public function getRouteKeyName()
	{
		return 'slug';
	}

	public function topic()
	{
		return $this->belongsTo(ForumTopic::class, 'forum_topic_id');
	}

	public function comments()
	{
		return $this->hasMany(ForumComment::class)->whereNull('parent_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
