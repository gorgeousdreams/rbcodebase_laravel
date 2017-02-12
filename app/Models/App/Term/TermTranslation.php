<?php

namespace App\Models\App\Term;

use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

class TermTranslation extends Model
{
	protected $table = 'terms_translations';

	public $timestamps = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'title', 'text', 'stat_viewed',
	];
}
