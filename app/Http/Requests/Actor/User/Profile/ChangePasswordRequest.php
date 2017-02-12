<?php

namespace App\Http\Requests\Actor\User\Profile;

use App\Http\Requests\Request;

/**
 * Class ChangePasswordRequest
 * @package App\Http\Requests\Actor\User\Profile
 */
class ChangePasswordRequest extends Request
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
		return access()->user()->canChangePassword();
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'old_password' => 'required',
			'password'     => 'required|min:6|confirmed',
		];
	}
}
