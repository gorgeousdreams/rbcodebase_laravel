<?php

namespace App\Http\Middleware\Actor\User;

use Closure;

/**
 * Class RouteNeedsRole
 * @package App\Http\Middleware
 */
class RouteNeedsPermission
{

	/**
	 * @param $request
	 * @param Closure $next
	 * @param $permission
	 * @param bool $needsAll
	 * @return mixed
	 */
	public function handle($request, Closure $next, $permission, $needsAll = false)
	{
		/**
		 * Permission array
		 */
		if (strpos($permission, ";") !== false) {
			$permissions = explode(";", $permission);
			$access = access()->allowMultiple($permissions, ($needsAll === "true" ? true : false));
		} else {
			/**
			 * Single permission
			 */
			$access = access()->allow($permission);
		}


		if (! $access) {
			return redirect()
				->route('common.dashboard')
				->withFlashDanger(trans('auth.general_error'));
		}

		return $next($request);
	}
}
