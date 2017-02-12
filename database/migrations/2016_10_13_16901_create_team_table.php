<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class SetupAccessTables
 */
class CreateTeamTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// Does the app use a team?
		if(config('actor.team.enable')) {

			Schema::table(config('actor.users_table'), function (Blueprint $table) {
				$table->integer('current_team_id')->unsigned()->nullable();
			});
			echo 'Added team field to users table;'. PHP_EOL;

			Schema::create(config('actor.team.teams_table'), function (Blueprint $table) {
				$table->increments('id')->unsigned();
				$table->integer('owner_id')->unsigned()->nullable();
				$table->string('name');
				$table->timestamps();
			});
			echo 'Created Table: '. config('actor.team.teams_table') .';'. PHP_EOL;

			Schema::create(config('actor.team.users_teams_table'), function (Blueprint $table) {
				$table->integer('user_id')->unsigned();
				$table->integer('team_id')->unsigned();
				$table->timestamps();
				// Add Foreign/Unique/Index
				$table->foreign('user_id')->references('id')->on(config('actor.users_table'))->onUpdate('cascade')->onDelete('cascade');
				$table->foreign('team_id')->references('id')->on(config('actor.team.teams_table'))->onDelete('cascade');
			});
			echo 'Created Table: '. config('actor.team.users_teams_table') .';'. PHP_EOL;

			Schema::create(config('actor.team.teams_invites_table'), function (Blueprint $table) {
				$table->increments('id');
				$table->integer('user_id')->unsigned();
				$table->integer('team_id')->unsigned();
				$table->enum('type', ['invite', 'request', 'owner']);
				$table->string('email');
				$table->string('accept_token');
				$table->string('deny_token');
				$table->timestamps();
				// Add Foreign/Unique/Index
				$table->foreign('team_id')->references('id')->on(config('actor.team.teams_table'))->onDelete('cascade');
			});
			echo 'Created Table: '. config('actor.team.teams_invites_table') .';'. PHP_EOL;

		} // End Check if Teams are used
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		/**
		 * Remove team field from users table
		 */
		Schema::table(config('actor.users_table'), function(Blueprint $table) {
			$table->dropColumn('current_team_id');
		});

		/**
		 * Remove Foreign/Unique/Index
		 */
		Schema::table(config('actor.team.users_teams_table'), function (Blueprint $table) {
			$table->dropForeign(config('actor.team.teams_table').'_user_id_foreign');
			$table->dropForeign(config('actor.team.teams_table').'_team_id_foreign');
		});

		/**
		 * Drop tables
		 */
		Schema::dropIfExists(config('actor.team.teams_invites_table'));
		Schema::dropIfExists(config('actor.team.users_teams_table'));
		Schema::dropIfExists(config('actor.team.teams_table'));
	}
}
