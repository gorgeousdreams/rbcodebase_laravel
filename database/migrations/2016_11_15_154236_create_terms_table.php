<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTermsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// Terms
		Schema::create('terms', function (Blueprint $table) {
			$table->increments('id');
			$table->string('slug');
			$table->string('similar');
			$table->boolean('active');
			$table->timestamps();
		});
		echo 'Created Table: terms; ' . PHP_EOL;

		// Terms Translations
		Schema::create('terms_translations', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('term_id')->unsigned();
			$table->string('locale')->index();
			$table->string('title');
			$table->text('text');
			$table->integer('stat_viewed')->default(0);
			$table->timestamps();
			// Add Foreign/Unique/Index
			$table->unique(['term_id','locale']);
			$table->foreign('term_id')->references('id')->on('terms')->onDelete('cascade');
		});
		echo 'Created Table: terms_translations; ' . PHP_EOL;

		// Topics Pivot Table for Terms
		Schema::create('terms_topics_mux', function (Blueprint $table) {
			$table->integer('topic_id')->unsigned()->index();
			$table->foreign('topic_id')->references('id')->on('data_topics')->onDelete('cascade');
			$table->integer('term_id')->unsigned()->index();
			// Add Foreign/Unique/Index
			$table->foreign('term_id')->references('id')->on('terms')->onDelete('cascade');
			$table->unique(['topic_id','term_id']);
		});
		echo 'Created Table: terms_topics_mux; ' . PHP_EOL;

		// Terms Child Examples
		Schema::create('terms_example', function (Blueprint $table) {
			$table->increments('id');
			$table->string('slug');
			$table->integer('term_id')->unsigned();
			$table->text('format', 10);
			$table->timestamps();
			// Add Foreign/Unique/Index
			$table->unique(['term_id','slug']);
		});
		echo 'Created Table: terms_example; ' . PHP_EOL;

		// Terms Child Translations
		Schema::create('terms_example_translations', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('term_example_id')->unsigned();
			$table->string('locale')->index();
			$table->string('title');
			$table->text('text');
			$table->text('code');
			$table->timestamps();
			// Add Foreign/Unique/Index
			$table->unique(['term_example_id','locale']);
			$table->foreign('term_example_id')->references('id')->on('terms_example')->onDelete('cascade');
		});
		echo 'Created Table: terms_example_translations; ' . PHP_EOL;
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('terms_example_translations');
		Schema::drop('terms_example');
		Schema::drop('terms_topics_mux');
		Schema::drop('terms_translations');
		Schema::drop('terms');
	}
}
