<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Actor\User\User;

/**
 * Class UserTableSeeder
 */
class UserTableSeeder extends Seeder
{
	public function run()
	{
		// Reset Data
		DB::table(config('actor.users_table'))->delete();

		// Add Default Users
		$seed =
		[ // name_first, name_last, name_slug, email, password, verified
			['RB', 'Codebase', 'rbcodebase', 'info@rbcodebase.com', bcrypt(md5(uniqid(mt_rand(), true))), 1],
			['Rob', 'Bertholf', 'rob', 'rob@bertholf.com', bcrypt('asdfasdf'), 1],
			['Tester', 'Lester', 'tester', 'rob1@bertholf.com', bcrypt('asdfasdf'), 0],
			['General', 'User', 'user', 'rob2@bertholf.com', bcrypt('asdfasdf'), 0],
		];

		foreach ($seed as $key => $value) {
			// Get Values from Array
			$name_first = $value[0];
			$name_last = $value[1];
			$name_slug = $value[2];
			$email = $value[3];
			$password = $value[4];
			$confirmed = config('actor.users.confirm_email') ? 0 : 1;
			$confirmation_code = md5(uniqid(mt_rand(), true));
			$verified = $value[5];
			$language = config('app.locale');
			$timezone = config('app.timezone');

			// Create Record
			$record = User::create([
				'name_first' => $name_first,
				'name_last' => $name_last,
				'name_slug' => $name_slug,
				'email' => $email,
				'password' => $password,
				'confirmation_code' => $confirmation_code,
				'confirmed' => $confirmed,
				'verified' => $verified,
				'language' => $language,
				'timezone' => $timezone,
				'created_at' => Carbon::now(),
				'updated_at' => Carbon::now()
			]);
			echo 'Added User: '. $record->$name_first .' '. $record->$name_last . PHP_EOL;

		}

	}
}
