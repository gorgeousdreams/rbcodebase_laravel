<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class SetupAccessTables
 */
class CreateUserAccessTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		Schema::create(config('actor.roles_table'), function (Blueprint $table) {
			$table->increments('id')->unsigned();
			$table->string('slug');
			$table->string('title');
			$table->text('text')->nullable();
			$table->string('icon')->default('users');
			$table->boolean('all')->default(false);
			$table->boolean('autoassign')->default(false);
			$table->boolean('visibility')->default(0);
			$table->boolean('self_opt_in')->default(false);
			$table->boolean('self_opt_out')->default(true);
			$table->boolean('show_on_registration')->default(false);
			$table->boolean('show_on_settings')->default(false);
			$table->boolean('active')->default(0);
			$table->smallInteger('order')->default(0)->unsigned();
			$table->timestamps();
			// Add Foreign/Unique/Index
			$table->unique('title');
		});
		echo 'Created Table: '. config('actor.roles_table') . PHP_EOL;

		Schema::create(config('actor.assigned_roles_table'), function (Blueprint $table) {
			$table->increments('id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->integer('role_id')->unsigned();
			// Add Foreign/Unique/Index
			$table->foreign('user_id')->references('id')->on(config('actor.users_table'))->onDelete('cascade');
			$table->foreign('role_id')	->references('id')->on(config('actor.roles_table'))->onDelete('cascade');
		});
		echo 'Created Table: '. config('actor.assigned_roles_table') . PHP_EOL;

		Schema::create(config('actor.permissions_table'), function (Blueprint $table) {
			$table->increments('id')->unsigned();
			$table->string('slug');
			$table->string('title');
			$table->smallInteger('sort')->default(0)->unsigned();
			$table->timestamps();
			// Add Foreign/Unique/Index
			$table->unique('slug');
		});
		echo 'Created Table: '. config('actor.permissions_table') . PHP_EOL;

		Schema::create(config('actor.permission_role_table'), function (Blueprint $table) {
			$table->increments('id')->unsigned();
			$table->integer('permission_id')->unsigned();
			$table->integer('role_id')->unsigned();
			// Add Foreign/Unique/Index
			$table->foreign('permission_id')->references('id')->on(config('actor.permissions_table'))->onDelete('cascade');
			$table->foreign('role_id')->references('id')->on(config('actor.roles_table'))->onDelete('cascade');
		});
		echo 'Created Table: '. config('actor.permission_role_table') . PHP_EOL;
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table(config('actor.users_table'), function (Blueprint $table) {
			$table->dropColumn('status');
		});

		/**
		 * Remove Foreign/Unique/Index
		 */
		Schema::table(config('actor.roles_table'), function (Blueprint $table) {
			$table->dropUnique(config('actor.roles_table') . '_name_unique');
		});

		Schema::table(config('actor.assigned_roles_table'), function (Blueprint $table) {
			$table->dropForeign(config('actor.assigned_roles_table') . '_user_id_foreign');
			$table->dropForeign(config('actor.assigned_roles_table') . '_role_id_foreign');
		});

		Schema::table(config('actor.permissions_table'), function (Blueprint $table) {
			$table->dropUnique(config('actor.permissions_table') . '_name_unique');
		});

		Schema::table(config('actor.permission_role_table'), function (Blueprint $table) {
			$table->dropForeign(config('actor.permission_role_table') . '_permission_id_foreign');
			$table->dropForeign(config('actor.permission_role_table') . '_role_id_foreign');
		});

		/**
		 * Drop tables
		 */
		Schema::dropIfExists(config('actor.assigned_roles_table'));
		Schema::dropIfExists(config('actor.permission_role_table'));
		Schema::dropIfExists(config('actor.roles_table'));
		Schema::dropIfExists(config('actor.permissions_table'));
	}
}
