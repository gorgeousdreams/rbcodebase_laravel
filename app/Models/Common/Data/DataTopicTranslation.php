<?php

namespace App\Models\Common\Data;

use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DataTopicTranslation
 * @package App\Models\Common\Data
 */
class DataTopicTranslation extends Model
{
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'data_topics_translations';

	protected $primaryKey = 'id';

	public $timestamps = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'title', 'text',
	];
}
