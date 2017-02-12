<?php namespace App\Models\Common\History;

use Illuminate\Database\Eloquent\Model;

/**
 * Class HistoryType
 * @package App\Models\Common\History
 */
class HistoryType extends Model {

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
	protected $fillable = ['name'];

	/**
	 * @param array $attributes
	 */
	public function __construct(array $attributes = [])
	{
		parent::__construct($attributes);
		$this->table = config('log-viewer.logs_history_types_table');
	}
}
