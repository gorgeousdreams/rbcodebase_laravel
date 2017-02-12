<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create(config('actor.users_table'), function (Blueprint $table) {
			$table->increments('id');
			$table->string('name_first');
			$table->string('name_last');
			$table->string('name_slug')->unique();
			$table->string('email')->unique();
			$table->string('password')->nullable();
			$table->tinyInteger('status')->default(1)->unsigned();
			$table->string('confirmation_code')->nullable();
			$table->boolean('confirmed')->default(config('actor.users.confirm_email') ? false : true);
			$table->boolean('verified')->default(0); // Human Verified
			$table->string('language')->nullable();
			$table->string('timezone')->default('UTC');
			$table->string('img_avatar')->nullable();
			$table->string('img_background')->nullable();
			$table->integer('referring_user_id')->unsigned()->nullable(); // Who referred them?
			$table->rememberToken();
			$table->timestamps();
			$table->softDeletes();
			// Add Foreign/Unique/Index
			$table->foreign('referring_user_id')->references('id')->on(config('actor.users_table'))->onDelete('restrict')->onUpdate('restrict');
		});
		echo 'Created Table: '. config('actor.users_table') . PHP_EOL;
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists(config('actor.users_table'));
	}
}
