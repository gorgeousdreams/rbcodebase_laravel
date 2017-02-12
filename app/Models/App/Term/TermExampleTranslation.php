<?php

namespace App\Models\App\Term;

use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class TermExampleTranslation extends Model
{
	protected $table = 'terms_example_translations';

	public $timestamps = true;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'title', 'text', 'code',
	];
}
