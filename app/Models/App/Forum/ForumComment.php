<?php

namespace App\Models\App\Forum;

use App\Models\Actor\User\User;
use Illuminate\Database\Eloquent\Model;

class ForumComment extends Model
{
	protected $table = 'forum_thread_comment';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'parent_id', 'forum_thread_id', 'user_id', 'brand_id', 'text', 'locale', 'reported',
	];

	public function thread()
	{
		return $this->belongsTo(ForumThread::class);
	}

	public function comments()
	{
		return $this->hasMany(self::class, 'parent_id')->with('comments');
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
