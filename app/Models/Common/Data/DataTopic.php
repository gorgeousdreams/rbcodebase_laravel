<?php

namespace App\Models\Common\Data;

use App\Models\App\Course\Course;
use App\Models\App\Service\Service;
use App\Models\App\Term\Term;

use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DataTopic
 * @package App\Models\Common\Data
 */
class DataTopic extends Model
{
	use Translatable;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'data_topics';

	public $translationForeignKey = 'topic_id';

	protected $primaryKey = 'id';

	public $translatedAttributes = [
		'title', 'text',
	];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'slug', 'active', 'title', 'text', 'parent_id', 'order',
	];

	public function getRouteKeyName()
	{
		return 'slug';
	}

	public function parent()
	{
		return $this->belongsTo(self::class, 'parent_id');
	}

	public function children()
	{
		return $this->hasMany(self::class, 'parent_id')->withCount('terms');
	}

	// SUB TOPICS

	/**
	 * A term has many sub topics
	 *
	 * @return \Illuminate\Database\Eloquent\Relationships\HasMany
	 */
	public function topicsubs()
	{
		return $this->hasMany(DataTopicSub::class, 'topic_id', 'id');
	}


	// TERMS

	/**
	 * A topic has many terms
	 *
	 * @return \Illuminate\Database\Eloquent\Relationships\BelongsToMany
	 */
	public function terms()
	{
		return $this->belongsToMany(Term::class, 'terms_topics_mux', 'term_id', 'topic_id');
	}


	// COURSES

	/**
	 * A topic has many terms
	 *
	 * @return \Illuminate\Database\Eloquent\Relationships\BelongsToMany
	 */
	public function courses()
	{
		return $this->belongsToMany(Course::class, 'courses_topics_mux', 'course_id', 'topic_id');
	}

	// SERVICES

	/**
	 * A topic has many terms
	 *
	 * @return \Illuminate\Database\Eloquent\Relationships\BelongsToMany
	 */
	public function services()
	{
		return $this->belongsToMany(Service::class, 'services_topics_mux', 'topic_id');
	}

}
