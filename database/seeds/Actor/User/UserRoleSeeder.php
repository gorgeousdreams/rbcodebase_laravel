<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Actor\User\User;
use App\Models\Actor\User\Role;

/**
 * Class UserRoleSeeder
 */
class UserRoleSeeder extends Seeder
{
	/**
	 * Run the database seed.
	 *
	 * @return void
	 */
	public function run()
	{
		// Clear Data
		DB::table(config('actor.assigned_roles_table'))->delete();

		// Explicitly add user as "Super Admin"
		$superadmin = User::where('email', 'info@rbcodebase.com')->first();
			$superadmin_role = Role::where('slug', 'super-admin')->firstOrFail();
			$superadmin->attachRole($superadmin_role->id);
			echo 'Attached '. $superadmin_role->title .' role to '. $superadmin->getDisplayName() . PHP_EOL;

		// Explicitly add user as "Super Admin"
		$superadmin = User::where('email', 'rob@bertholf.com')->first();
			$superadmin_role = Role::where('slug', 'super-admin')->firstOrFail();
			$superadmin->attachRole($superadmin_role->id);
			echo 'Attached '. $superadmin_role->title .' role to '. $superadmin->getDisplayName() . PHP_EOL;

		/*
		 * Add All Users any Auto Assigned Roles
		 */

			// Get AutoAssigned Roles
			$roles = Role::where('autoassign', true)->get();

			// Loop through all AutoAssigned Roles
			foreach ($roles as $role) {
				$users = User::get();
				// Loop through all
				foreach ($users as $user) {
					$user->attachRole($role->id);
					echo 'Attached '. $role->title .' role to '. $user->getDisplayName() . PHP_EOL;
				}
			}
	}
}
