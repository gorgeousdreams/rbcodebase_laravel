<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateForumTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		/*
		 * Config & Meta
		 */

			// Type of Topics (e.g. Vote on Features, Bug Tracking, or standard Forum)
			Schema::create('forum_config_topictypes', function (Blueprint $table) {
				$table->increments('id');
				$table->string('slug', 255)->unique();
				$table->text('title');
			});
			echo 'Created Table: forum_config_topictypes; ' . PHP_EOL;

			// Topics (Channel/Category Level)
			Schema::create('forum_topics', function (Blueprint $table) {
				$table->increments('id');
				$table->integer('parent_id')->nullable()->default(null);
				$table->string('slug', 255)->unique();
				$table->integer('priority')->default('0');
				$table->string('icon', 255);
				$table->integer('forum_type_id')->nullable()->unsigned()->index();
				$table->timestamps();
				// Add Foreign/Unique/Index
				$table->foreign('forum_type_id')->references('id')->on('forum_config_topictypes')->onDelete('set null')->onUpdate('cascade');
			});
			echo 'Created Table: forum_topics; ' . PHP_EOL;

				Schema::create('forum_topics_translations', function (Blueprint $table) {
					$table->increments('id');
					$table->integer('forum_topic_id')->unsigned();
					$table->string('locale')->index();
					$table->string('title');
					$table->text('text')->nullable();
					$table->string('calltoaction', 150);
					// Add Foreign/Unique/Index
					$table->unique(['forum_topic_id','locale']);
					$table->foreign('forum_topic_id')->references('id')->on('forum_topics')->onDelete('cascade');
				});
				echo 'Created Table: forum_topics_translations; ' . PHP_EOL;

			// Threads
			Schema::create('forum_threads', function (Blueprint $table) {
				$table->increments('id');
				$table->integer('forum_topic_id')->unsigned()->index();
				$table->integer('user_id')->unsigned()->index();
				$table->integer('brand_id')->nullable()->default(null); // Could be associated to a brand as well as a user
				$table->string('slug');
				$table->integer('featured')->default('0'); // Is it featured?
				$table->integer('reportable')->default('1'); // Can it be flagged for deletion by a user for spam, etc.
				$table->integer('is_pinned')->default('0'); // is it pinned at the top of the Topic?
				$table->timestamps();
				// Add Foreign/Unique/Index
				$table->unique(['forum_topic_id','slug']);
				$table->foreign('forum_topic_id')->references('id')->on('forum_topics')->onDelete('cascade')->onUpdate('cascade');
			});
			echo 'Created Table: forum_threads; ' . PHP_EOL;

				// Threads Translation
				Schema::create('forum_threads_translations', function (Blueprint $table) {
					$table->increments('id');
					$table->integer('forum_thread_id')->unsigned();
					$table->string('locale')->index();
					$table->string('title');
					$table->text('text');
					// Add Foreign/Unique/Index
					$table->unique(['forum_thread_id','locale']);
					$table->foreign('forum_thread_id')->references('id')->on('forum_threads')->onDelete('cascade');
				});
				echo 'Created Table: forum_threads_translations; ' . PHP_EOL;

			// Comments
			Schema::create('forum_thread_comment', function (Blueprint $table) {
				$table->increments('id');
				$table->integer('parent_id')->nullable()->default(null);
				$table->integer('forum_thread_id')->unsigned()->index();
				$table->integer('user_id')->nullable()->unsigned()->index();
				$table->integer('brand_id')->nullable()->default(null);
				$table->text('text');
				$table->string('locale')->index();
				$table->integer('reported')->default(0);
				$table->timestamps();
				// Add Foreign/Unique/Index
				$table->foreign('forum_thread_id')->references('id')->on('forum_threads')->onDelete('cascade')->onUpdate('cascade');
			});
			echo 'Created Table: forum_thread_comment; ' . PHP_EOL;

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('forum_thread_comment');
		Schema::drop('forum_threads_translations');
		Schema::drop('forum_threads');
		Schema::drop('forum_topics_translations');
		Schema::drop('forum_topics');
		Schema::drop('forum_config_topictypes');
	}
}
