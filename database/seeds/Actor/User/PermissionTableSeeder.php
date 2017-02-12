<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Actor\User\Role;
use App\Models\Actor\User\Permission;

/**
 * Class PermissionTableSeeder
 */
class PermissionTableSeeder extends Seeder
{
	/**
	 * Run the database seed.
	 *
	 * @return void
	 */
	public function run()
	{
		// Clear Data
		DB::table(config('actor.permissions_table'))->delete();
		DB::table(config('actor.permission_role_table'))->delete();

		// Add Default Users
		$seed =
		[ // slug, title, role slug(s)
			['view-backend', 'View Backend', 'admin'],
			['manage-users', 'Manage Users', 'admin'],
			['manage-roles', 'Manage Roles', 'admin'],
		];

		// Set Sort
		$i = 1;

		foreach ($seed as $key => $value) {
			// Get Values from Array
			$slug = $value[0];
			$title = $value[1];
			$parent_role = $value[2];
			$sort = $i;

			// Create Record
			$record = Permission::create(['slug' => $slug, 'title' => $title, 'sort' => $sort, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()]);
			echo 'Added Permission: '. $title . PHP_EOL;

			// Loop through and attach topics
			if(!empty($parent_role)) {

				// Check if Multiple
				if (strpos($parent_role, '|')) {
					// Has multiple parent topics, explode to array
					$roleArray =  explode('|', $parent_role);
					// Loop through all topics
					for ($i = 0; $i < count($roleArray); $i++) {
						// Attach Topic to Term
						$role = Role::select('id')->where('slug', '=', $roleArray[$i])->first();
						// Associate Topic
						if(!empty($role->id)) {
							$role->permissions()->attach($record->id);
						}
						echo '('. $roleArray[$i] .'::'. $record->id .')';
					}
				} else {
					// Attach Single Topic to Term
					$role = Role::select('id')->where('slug', '=', $parent_role)->first();
					// Associate Topic
					if(!empty($role->id)) {
						$role->permissions()->attach($record->id);
						echo '('. $slug . '::'. $record->id .')';
					}
				}

			} else {
				echo ' (No Parent)';
			}
			echo PHP_EOL;

			$i++;
		}

	}
}
