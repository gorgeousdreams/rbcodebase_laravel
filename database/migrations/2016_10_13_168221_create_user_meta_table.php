<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserMetaTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		Schema::create(config('actor.data_users_fields_table'), function (Blueprint $table) {
			$table->increments('id');
			$table->integer('role_id')->unsigned();
			$table->integer('type')->unsigned();
			$table->string('title');
			$table->text('value')->nullable();
			$table->tinyInteger('visibility');
			$table->integer('order')->default(0);
			$table->timestamps();
		});
		echo 'Created Table: ' . config('actor.data_users_fields_table') .';'. PHP_EOL;

		Schema::create(config('actor.users_metas_table'), function (Blueprint $table) {
			$table->increments('id');
			$table->integer('field_id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->text('value');
			$table->timestamps();
		});
		echo 'Created Table: ' . config('actor.users_metas_table') .';'. PHP_EOL;

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists(config('actor.users_metas_table'));
		Schema::dropIfExists(config('data_users_fields_table'));
	}
}
