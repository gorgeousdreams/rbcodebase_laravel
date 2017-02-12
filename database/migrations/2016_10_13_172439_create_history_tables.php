
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateHistoryTables
 */
class CreateHistoryTables extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create(config('log-viewer.logs_history_types_table'), function (Blueprint $table) {
			$table->increments('id')->unsigned();
			$table->string('name');
			$table->timestamps();
			echo 'Created Table: '. config('log-viewer.logs_history_types_table') .';' . PHP_EOL;
		});

		Schema::create(config('log-viewer.logs_history_table'), function (Blueprint $table) {
			$table->increments('id')->unsigned();
			$table->integer('type_id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->integer('entity_id')->unsigned()->nullable();
			$table->string('icon')->nullable();
			$table->string('class')->nullable();
			$table->string('text');
			$table->string('assets')->nullable();
			$table->timestamps();
			// Add Foreign/Unique/Index
			$table->foreign('type_id')->references('id')->on(config('log-viewer.logs_history_types_table'))->onDelete('cascade');
			$table->foreign('user_id')->references('id')->on(config('actor.users_table'))->onDelete('cascade');
		});
		echo 'Created Table: '. config('log-viewer.logs_history_table') .';' . PHP_EOL;
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table(config('log-viewer.logs_history_table'), function (Blueprint $table) {
			$table->dropForeign(config('log-viewer.logs_history_table') .'_type_id_foreign');
			$table->dropForeign(config('log-viewer.logs_history_table') .'_user_id_foreign');
		});

		Schema::dropIfExists(config('log-viewer.logs_history_types_table'));
		Schema::dropIfExists(config('log-viewer.logs_history_table'));
	}
}
