<?php

namespace App\Providers\Actor\Team;

use App\Services\Actor\Team\Teams;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

/**
 * Class AccessServiceProvider
 * @package App\Providers
 */
class TeamsServiceProvider extends ServiceProvider
{
	/**
	 * Indicates if loading of the provider is deferred.
	 *
	 * @var bool
	 */
	protected $defer = false;

	/**
	 * Bootstrap the application events.
	 *
	 * @return void
	 */
	public function boot()
	{
		//
	}

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->registerTeam();
		$this->registerFacade();
	}

	/**
	 * Register the application bindings.
	 *
	 * @return void
	 */
	protected function registerTeam()
	{
		$this->app->bind('teams', function($app) {
			return new Teams($app);
		});
	}

	/**
	 * Register the vault facade without the user having to add it to the app.php file.
	 *
	 * @return void
	 */
	public function registerFacade() {
		$this->app->booting(function()
		{
			$loader = \Illuminate\Foundation\AliasLoader::getInstance();
			$loader->alias('Teams', \App\Services\Actor\Team\Facades\Teams::class);
		});
	}

}
