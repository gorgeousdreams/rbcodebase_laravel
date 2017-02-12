<?php

namespace App\Models\Common\Data;

use App\Models\App\Audit\AuditFactor;

use Dimsav\Translatable\Translatable;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DataTopicSub
 * @package App\Models\Common\Data
 */
class DataTopicSub extends Model
{
	use Translatable;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'data_topicsubs';

	public $translationForeignKey = 'topicsub_id';

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
		'slug', 'active', 'order', 'title', 'text',
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
		return $this->hasMany(self::class, 'parent_id');
	}

	/**
	 * A Sub Topic belongs to a Topic
	 *
	 * @return \Illuminate\Database\Eloquent\Relationships\BelongsTo
	 */
	public function topic()
	{
		return $this->belongsTo(DataTopic::class);
	}


	/**
	 * A Sub Topic has Audit Factors
	 *
	 * @return \Illuminate\Database\Eloquent\Relationships\HasMany
	 */
	public function auditFactors()
	{
		return $this->hasMany(AuditFactor::class, 'topicsub_id', 'id')->where('parent_id', 0)->with('children');
	}

}
