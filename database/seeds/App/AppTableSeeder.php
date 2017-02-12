<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppTableSeeder extends Seeder
{
	public function run()
	{
		if (env('DB_CONNECTION') == 'mysql') {
			DB::statement('SET FOREIGN_KEY_CHECKS=0;');
		}

		/*
		 * Term
		 */

			// Terms
			$this->command->info('Seed Terms');
			$this->call(TermTableSeeder::class);


		/*
		 * Forum
		 */

			// ForumTypes
			$this->command->info('Seed Topic Types');
			$this->call(ForumTopicTypes::class);

			// ForumCategories
			$this->command->info('Seed Topics');
			$this->call(ForumTopics::class);

			// ForumThreads
			$this->command->info('Seed Threads');
			$this->call(ForumThreads::class);


		if (env('DB_CONNECTION') == 'mysql') {
			DB::statement('SET FOREIGN_KEY_CHECKS=1;');
		}
	}
}
