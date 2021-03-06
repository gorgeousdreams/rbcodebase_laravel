<?php

/**
 * Global helpers file with misc functions
 */

if (! function_exists('app_name')) {
	/**
	 * Helper to grab the application name
	 *
	 * @return mixed
	 */
	function app_name()
	{
		return config('app.name');
	}
}

if (! function_exists('access')) {
	/**
	 * Access (lol) the Access:: facade as a simple function
	 */
	function access()
	{
		return app('access');
	}
}

if ( ! function_exists('history'))
{
	/**
	 * Access the history facade anywhere
	 */
	function history()
	{
		return app('history');
	}
}

if (! function_exists('gravatar')) {
	/**
	 * Access the gravatar helper
	 */
	function gravatar()
	{
		return app('gravatar');
	}
}

if (! function_exists('getFallbackLocale')) {
	/**
	 * Get the fallback locale
	 *
	 * @return \Illuminate\Foundation\Application|mixed
	 */
	function getFallbackLocale()
	{
		return config('app.fallback_locale');
	}
}

/**
 * Check duplicate values in array
 *
 * @param $array
 * @return bool
 */
function contain_duplicates($array)
{
	return (count(array_unique($array)) < count($array));
}

/**
 * Get the language block with a fallback
 *
 * @param $view
 * @param array $data
 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
 */
if (! function_exists('getLanguageBlock')) {
	function getLanguageBlock($view, $data = [])
	{
		$components = explode("lang", $view);
		$current  = $components[0]."lang.".app()->getLocale().".".$components[1];
		$fallback  = $components[0]."lang.".getFallbackLocale().".".$components[1];

		if (view()->exists($current)) {
			return view($current, $data);
		} else {
			return view($fallback, $data);
		}
	}
}

/**
 * Get language list
 *
 * @return array
 */
function get_language_list()
{
	$languages = config('locale.languages');

	$result = [];

	foreach ($languages as $key => $value) {
		$result[$key] = trans('menus.language-picker.langs.'.$value[0]);
	}

	return $result;
}

/**
 * Get timezone list
 * @return array
 */
function get_timezone_list()
{
	static $regions = [
		DateTimeZone::AFRICA,
		DateTimeZone::AMERICA,
		DateTimeZone::ANTARCTICA,
		DateTimeZone::ASIA,
		DateTimeZone::ATLANTIC,
		DateTimeZone::AUSTRALIA,
		DateTimeZone::EUROPE,
		DateTimeZone::INDIAN,
		DateTimeZone::PACIFIC,
	];

	$timezones = [];

	foreach ($regions as $region) {
		$timezones = array_merge($timezones, DateTimeZone::listIdentifiers($region));
	}

	$timezone_offsets = [];

	foreach ($timezones as $timezone) {
		$tz = new DateTimeZone($timezone);
		$timezone_offsets[$timezone] = $tz->getOffset(new DateTime);
	}

	// sort timezone by offset
	asort($timezone_offsets);

	$timezone_list = [];

	foreach ($timezone_offsets as $timezone => $offset) {
		$offset_prefix = $offset < 0 ? '-' : '+';
		$offset_formatted = gmdate('H:i', abs($offset));

		$pretty_offset = "UTC${offset_prefix}${offset_formatted}";

		$timezone_list[$timezone] = "(${pretty_offset}) $timezone";
	}

	return $timezone_list;
}

if (!function_exists('checkActiveRoute')) {
	function checkActiveRoute($path, $parent_check = false, $active = 'active', $else = '')
	{
		// Clean up path to check against... and refactor later
		$path = ltrim($path, '/');

		if ($parent_check && Request::is($path ."/*")) {
			return $active;
		} elseif (Request::is($path)) {
			return $active;
		} else {
			return $else;
		}

	}
}

if (!function_exists('rating_stars')) {
	function rating_stars($rating)
	{
		$starcount = 0;
		if ($rating > 0) {
			for ($i = 0; $i < $rating; $i++) {
				$starcount++;
				echo "<i class=\"fa fa-star\"></i>";
			}
			$half = round($rating) - round($rating / 0.5) * 0.5;
			if ($half == 0.5) {
				echo "<i class=\"fa fa-star-half-o\"></i>";
				$starcount++;
			}
			$blank = 5 - $starcount;
			for ($i = 0; $i < $blank; $i++) {
				echo "<i class=\"fa fa-star-o\"></i>";
				$starcount++;
			}
		}
	}
}
