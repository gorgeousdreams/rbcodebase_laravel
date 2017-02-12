<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDataTopicTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// Topics
		Schema::create('data_topics', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('parent_id')->default(0);
			$table->string('slug');
			$table->string('icon');
			$table->integer('order');
			$table->boolean('active')->default(1);
			$table->timestamps();
		});
		echo 'Created Table: data_topics; ' . PHP_EOL;

			Schema::create('data_topics_translations', function (Blueprint $table) {
				$table->increments('id');
				$table->integer('topic_id')->unsigned();
				$table->string('locale')->index();
				$table->string('title');
				$table->text('text');
				$table->timestamps();
				// Add Foreign/Unique/Index
				$table->unique(['topic_id','locale']);
				$table->foreign('topic_id')->references('id')->on('data_topics')->onDelete('cascade');
			});
			echo 'Created Table: data_topics_translations; ' . PHP_EOL;

		// Sub Topics (Channel Specific)
		Schema::create('data_topicsubs', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('topic_id')->default(0);
			$table->integer('parent_id')->default(0);
			$table->string('slug');
			$table->string('icon');
			$table->integer('order');
			$table->boolean('active')->default(1);
			$table->timestamps();
		});
		echo 'Created Table: data_topicsubs; ' . PHP_EOL;

			Schema::create('data_topicsubs_translations', function (Blueprint $table) {
				$table->increments('id');
				$table->integer('topicsub_id')->unsigned();
				$table->string('locale')->index();
				$table->string('title');
				$table->text('text');
				$table->timestamps();
				// Add Foreign/Unique/Index
				$table->unique(['topicsub_id','locale']);
				$table->foreign('topicsub_id')->references('id')->on('data_topicsubs')->onDelete('cascade');
			});
			echo 'Created Table: data_topicsubs_translations; ' . PHP_EOL;

		// Skills
		Schema::create('data_skills', function (Blueprint $table) {
			$table->increments('id');
			$table->string('slug');
			$table->string('icon');
			$table->integer('order');
			$table->boolean('active')->default(1);
			$table->timestamps();
		});
		echo 'Created Table: data_skills; ' . PHP_EOL;

			Schema::create('data_skills_translations', function (Blueprint $table) {
				$table->increments('id');
				$table->integer('skill_id')->unsigned();
				$table->string('locale')->index();
				$table->string('title');
				$table->string('title_service');
				$table->text('text');
				$table->timestamps();
				// Add Foreign/Unique/Index
				$table->unique(['skill_id','locale']);
				$table->foreign('skill_id')->references('id')->on('data_skills')->onDelete('cascade');
			});
			echo 'Created Table: data_skills_translations; ' . PHP_EOL;
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('data_skills_translations');
		Schema::drop('data_skills');
		Schema::drop('data_topicsubs_translations');
		Schema::drop('data_topicsubs');
		Schema::drop('data_topics_translations');
		Schema::drop('data_topics');
	}
}
