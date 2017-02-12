
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateHistoryTables
 */
class CreateNotificationsTables extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create(config('log-notifications.notifications_table'), function (Blueprint $table) {
			$table->increments('id');
			$table->enum('type', array_keys(config('log-notifications.types')));
			$table->integer('post_id')->unsigned()->nullable();
			$table->integer('timeline_id')->unsigned()->nullable();
			$table->integer('user_id')->unsigned();
			$table->integer('notified_by')->unsigned();
			$table->boolean('seen')->default(0);
			$table->text('text');
			$table->string('link', 250)->nullable();
			$table->timestamps();
			$table->softDeletes();
			// Add Foreign/Unique/Index
			// @TODO: Foreign on Timeline ID $table->foreign('timeline_id')->references('id')->on('timelines')->onDelete('cascade');
			//$table->foreign('user_id')->references('id')->on(config('actor.users_table'))->onDelete('cascade');
		});
		echo 'Created Table: '. config('log-notifications.notifications_table') .'; ' . PHP_EOL;
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists(config('log-notifications.notifications_table'));
	}
}
