<?php

namespace App\Providers\Common;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Admin\Common\History\HistoryContract;
use App\Repositories\Admin\Common\History\EloquentHistoryRepository;
use App\Repositories\Admin\Common\History\Facades\History as HistoryFacade;

/**
 * Class HistoryServiceProvider
 * @package App\Providers
 */
class HistoryServiceProvider extends ServiceProvider {

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->bind(HistoryContract::class, EloquentHistoryRepository::class);
		$this->app->bind('history', HistoryContract::class);
		$this->registerFacade();
	}

	/**
	 *
	 */
	public function registerFacade() {
		$this->app->booting(function()
		{
			$loader = \Illuminate\Foundation\AliasLoader::getInstance();
			$loader->alias('History', HistoryFacade::class);
		});
	}
}
