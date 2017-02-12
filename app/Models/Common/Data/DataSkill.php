<?php

namespace App\Models\Common\Data;

use App\Models\App\Service\Service;

use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DataSkill
 * @package App\Models\Common\Data
 */
class DataSkill extends Model
{
	use Translatable;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'data_skills';

	public $translationForeignKey = 'skill_id';

	protected $primaryKey = 'id';

	public $translatedAttributes = [
		'title', 'text', 'title_service',
	];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'slug', 'active', 'title', 'text', 'title_service',
	];

	public function getRouteKeyName()
	{
		return 'slug';
	}

	public function services()
	{
		return $this->hasMany(Service::class, 'skill_id');
	}

}
