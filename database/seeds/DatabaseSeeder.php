<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * Class DatabaseSeeder
 */
class DatabaseSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		// Actors
		$this->command->info('SEEDER GROUP: Actors');
		$this->call(ActorTableSeeder::class);

		// Common
		$this->command->info('SEEDER GROUP: Common');
			$this->command->info('Seed Topics');
			$this->call(DataTopicTableSeeder::class);
			$this->command->info('Seed History Types');
			$this->call(HistoryTypeTableSeeder::class);
			$this->command->info('Seed Notifications');
			$this->call(NotificationsTableSeeder::class);

		// App Group
		$this->command->info('SEEDER GROUP: Apps');
		$this->call(AppTableSeeder::class);

		// Completed
		$this->command->info('ALL DONE!');

		Model::reguard();

	}
}
