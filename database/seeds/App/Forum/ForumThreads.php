<?php

use App\Models\Actor\User\User;
use App\Models\App\Forum\ForumTopic;
use App\Models\App\Forum\ForumThread;
use Illuminate\Database\Seeder;

class ForumThreads extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		// Start Fresh
		DB::table('forum_threads')->delete();
		DB::table('forum_threads_translations')->delete();

		// Specify Values
		$seed = [
			// Title, Text
			['faq', 'Sample Post', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dapibus purus vel nibh pharetra, vitae volutpat elit ultrices. Duis pulvinar volutpat odio, sodales imperdiet lectus tincidunt et. Mauris cursus sem eget nisl ornare, non porta orci molestie. Nullam ullamcorper nibh non dolor ornare dictum. Pellentesque tempus gravida erat, quis pharetra nunc mattis in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus at nisi non dolor dignissim vehicula eu et tortor. Nulla posuere facilisis imperdiet. Nam quis enim congue, ullamcorper nunc non, suscipit odio. Phasellus posuere sit amet mauris quis semper. Sed a condimentum enim. Interdum et malesuada fames ac ante ipsum primis in faucibus.'],
			['faq-sub1', 'Sample Post (Sub 1)', 'Duis pulvinar volutpat odio, sodales imperdiet lectus tincidunt et. Mauris cursus sem eget nisl ornare, non porta orci molestie. Nullam ullamcorper nibh non dolor ornare dictum. Pellentesque tempus gravida erat, quis pharetra nunc mattis in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus at nisi non dolor dignissim vehicula eu et tortor. Nulla posuere facilisis imperdiet. Nam quis enim congue, ullamcorper nunc non, suscipit odio. Phasellus posuere sit amet mauris quis semper. Sed a condimentum enim. Interdum et malesuada fames ac ante ipsum primis in faucibus.'],
			['faq-sub2', 'Sample Post (Sub 2)', 'Quisque dapibus purus vel nibh pharetra, vitae volutpat elit ultrices. Duis pulvinar volutpat odio, sodales imperdiet lectus tincidunt et. Mauris cursus sem eget nisl ornare, non porta orci molestie. Nullam ullamcorper nibh non dolor ornare dictum. Pellentesque tempus gravida erat, quis pharetra nunc mattis in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus at nisi non dolor dignissim vehicula eu et tortor. Nulla posuere facilisis imperdiet. Nam quis enim congue, ullamcorper nunc non, suscipit odio. Phasellus posuere sit amet mauris quis semper. Sed a condimentum enim. Interdum et malesuada fames ac ante ipsum primis in faucibus.'],
			['bugs', 'Bug!', 'Quisque dapibus purus vel nibh pharetra, vitae volutpat elit ultrices. Duis pulvinar volutpat odio, sodales imperdiet lectus tincidunt et. Mauris cursus sem eget nisl ornare, non porta orci molestie. Nullam ullamcorper nibh non dolor ornare dictum. Pellentesque tempus gravida erat, quis pharetra nunc mattis in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus at nisi non dolor dignissim vehicula eu et tortor. Nulla posuere facilisis imperdiet. Nam quis enim congue, ullamcorper nunc non, suscipit odio. Phasellus posuere sit amet mauris quis semper. Sed a condimentum enim. Interdum et malesuada fames ac ante ipsum primis in faucibus.'],
		];

		// Create Sample Terms
		foreach ($seed as $value) {
			// Create Thread
			$trail = ForumThread::create([
				'forum_topic_id' => ForumTopic::where('slug', $value[0])->first()->id,
				'slug' => str_slug($value[1]),
				'user_id' => User::where('name_slug', 'rob')->first()->id,
			]);
			// Create Translation
			$trail->translations()->create([
				'locale' => 'en',
				'title'  => $value[1],
				'text'   => $value[2],
			]);
		}
	}
}
