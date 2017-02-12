<?php

namespace App\Models\App\Term;

use App\Models\App\Course\CourseModuleLesson;
use App\Models\Common\Data\DataTopic;

use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class Term extends Model
{
	use Translatable;

	protected $table = 'terms';

	public $translatedAttributes = [
		'title', 'text', 'stat_viewed',
	];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'slug', 'title', 'text', 'stat_viewed',
	];

	public function getRouteKeyName()
	{
		return 'slug';
	}

	/**
	 * Get the the examples
	 *
	 * @return \Illuminate\Database\Eloquent\Relationships\HasMany
	 */
	public function examples()
	{
		return $this->hasMany(TermExample::class);
	}

	/**
	 * A term has many topics
	 *
	 * @return \Illuminate\Database\Eloquent\Relationships\BelongsToMany
	 */
	public function topics()
	{
		return $this->belongsToMany(DataTopic::class, 'terms_topics_mux', 'topic_id', 'term_id');
	}

	/**
	 * A term has many lessons
	 *
	 * @return \Illuminate\Database\Eloquent\Relationships\BelongsToMany
	 */
	public function lessons()
	{
		return $this->belongsToMany(CourseModuleLesson::class, 'terms_lessons_mux', 'term_id', 'lesson_id')->with('module');
	}

	/*
	 * Dictionary Card
	 */
	public function getText()
	{
		$pattern = '/\[{2}(.*?)\]{2}/is';

		preg_match_all($pattern, $this->text, $matches);

		$keywords = $matches[1];

		$text = $this->text;

		foreach ($keywords as $keyword) {
			$term = self::where('slug', $keyword)->first();

			if ($term) {
				$termText = str_replace('[[', '', $term->text);
				$termText = str_replace(']]', '', $termText);

				$text = str_replace("[[$keyword]]", "<a href='". route('app.term.show', $term->slug) ."' class='definition' data-toggle='popover' data-trigger='hover' title='$term->title' data-placement='bottom' data-content='$termText'>$keyword</a>", $text);
			} else {
				$text = str_replace("[[$keyword]]", $keyword, $text);
			}
		}

		return $text;
	}
}
