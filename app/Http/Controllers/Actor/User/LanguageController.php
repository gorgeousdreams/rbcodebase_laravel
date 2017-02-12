<?php

namespace App\Http\Controllers\Actor\User;

use App\Http\Controllers\Controller;

/**
 * Class LanguageController
 * @package App\Http\Controllers\Actor\User
 */
class LanguageController extends Controller
{
	/**
	 * @param $lang
	 * @return \Illuminate\Http\RedirectResponse
	 */
	public function swap($lang)
	{
		session()->put('locale', $lang);

		// Duplicate
		\App::setLocale($lang);

		// If user is logged set current language to match dropdown.
		if ($user = auth()->user()) {
			$user->language = $lang;
			$user->save();
		}

		return redirect()->back();
	}
}
