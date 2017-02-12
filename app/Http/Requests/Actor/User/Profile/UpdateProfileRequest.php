<?php

namespace App\Http\Requests\Actor\User\Profile;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class UpdateProfileRequest
 * @package App\Http\Requests\Actor\User
 */
class UpdateProfileRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return true;
	}

	public static $rules = [
		'create' => [
			'name_first' => 'required|min:1|max:255',
			'name_last' => 'required|min:1|max:255',
			'name_slug' => 'required|min:3|max:20|unique:users',
			'email' => 'required|email|max:128|unique:users',
		],
		'update' => [
			'name_first' => 'required|min:1|max:255',
			'name_last' => 'required|min:1|max:255',
			'name_slug' => 'required|min:3|max:20', // |unique:users,name_slug,:id
			'email' => 'required|email|max:128', // |unique:users,email,:id
		]
	];

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public static function rules($action = 'update', $merge = [], $id = false)
	{
		$rules = SELF::$rules[$action];

		if ($id) {
			foreach ($rules as &$rule) {
				$rule = str_replace(':id', $id, $rule);
			}
		}

		return array_merge( $rules, $merge );
	}


}
