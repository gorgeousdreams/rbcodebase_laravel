<?php

namespace App\Models\App\Term;

use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class TermExample extends Model
{
	use Translatable;

	protected $table = 'terms_example';

	public $translatedAttributes = [
		'title', 'text', 'code',
	];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'slug', 'title', 'text', 'format',
	];

	/**
	 * An example belongs to a term
	 *
	 * @return \Illuminate\Database\Eloquent\Relationships\BelongsTo
	 */
	public function term()
	{
		return $this->belongsTo(Term::class);
	}
}
