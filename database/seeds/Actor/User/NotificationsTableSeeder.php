<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\Actor\User\User;
use App\Models\Actor\User\Notification;

class NotificationsTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		// Get Faker
		$faker = Faker\Factory::create();

		// Reset Data
		DB::table(config('log-notifications.notifications_table'))->delete();

		// Get All Users
		$users = User::select('id', 'name_first', 'name_last')->get();

		// Loop through all Users
		foreach ($users as $user) {

			// Get All Users
			$user_ids = User::where('id', '!=', $user->id)->get()->pluck('id')->toArray();

			// Generate 10 Notifications
			for ($i = 0; $i < 10; $i++) {
				// Create Record
				$record = Notification::create([
					'type' => $faker->randomElement(array_keys(config('log-notifications.types'))),
					'post_id' => null,
					'timeline_id' => null,
					'user_id' => $user->id,
					'notified_by' => $faker->randomElement($user_ids),
					'seen' => $faker->boolean,
					'text' => $faker->text,
					'link' => null,
					'created_at' => Carbon::now(),
					'updated_at' => Carbon::now()
				]);
			}

			echo 'Added User Notification: '. $user->getDisplayName() . PHP_EOL;
		}
	}
}
