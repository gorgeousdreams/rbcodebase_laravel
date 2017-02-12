<?php namespace App\Models\Common\History;

use Illuminate\Database\Eloquent\Model;
use App\Models\Common\History\Traits\Relationship\HistoryRelationship;

/**
 * Class History
 * @package App\Models\Common\History
 */
class History extends Model {

	use HistoryRelationship;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['type_id', 'user_id', 'entity_id', 'icon', 'class', 'text', 'assets'];

	/**
	 * @param array $attributes
	 */
	public function __construct(array $attributes = [])
	{
		parent::__construct($attributes);
		$this->table = config('log-viewer.logs_history_table');
	}
}
