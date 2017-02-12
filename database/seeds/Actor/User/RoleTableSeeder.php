<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Actor\User\Role;
use App\Models\Actor\User\UserField;

/**
 * Class RoleTableSeeder
 */
class RoleTableSeeder extends Seeder
{
	/**
	 * Run the database seed.
	 *
	 * @return void
	 */
	public function run()
	{
		// Clear Data
		DB::table(config('actor.roles_table'))->delete();
		DB::table(config('actor.data_users_fields_table'))->delete();

		// Add Default Users
		$seed =
		[ // slug, title, text, icon, all, autoassign, visibility, self_opt_in, self_opt_out, show_on_registration, show_on_settings
			['super-admin', 'Super Admin', '', 'universal-access', true, false, false, false, false, false, false],
			['admin', 'Administrator', '', 'user-secret', false, false, false, true, false, false, false],
			['user', 'User', '', 'users', false, true, true, false, true, false, true],
		];

		// Set Order
		$i = 1;

		// Seed it!
		foreach ($seed as $key => $value) {
			// Get Values from Array
			$slug = $value[0];
			$title = $value[1];
			$text = $value[2];
			$icon = $value[3];
			$all = $value[4];
			$autoassign = $value[5];
			$visibility = $value[6];
			$self_opt_in = $value[7];
			$self_opt_out = $value[8];
			$show_on_registration = $value[9];
			$show_on_settings = $value[10];
			$active = true;

			// Create Record
			$record = Role::create([
				'slug' => $slug,
				'title' => $title,
				'text' => $text,
				'icon' => $icon,
				'all' => $all,
				'autoassign' => $autoassign,
				'visibility' => $visibility,
				'self_opt_in' => $self_opt_in,
				'self_opt_out' => $self_opt_out,
				'show_on_registration' => $show_on_registration,
				'show_on_settings' => $show_on_settings,
				'active' => $active,
				'order' => $i,
				'created_at' => Carbon::now(),
				'updated_at' => Carbon::now()
			]);
			echo 'Added Type: '. $title . PHP_EOL;

			// Add Fields
			$record->fields()->create(['role_id' => $record->id, 'type' => UserField::TEXT_BOX, 'type' => UserField::TEXT_BOX, 'title' => 'Sub ('. $title .')', 'value' => '', 'visibility' => UserField::VISIBILITY_PUBLIC,]);

			$i++;
		}

	}
}
