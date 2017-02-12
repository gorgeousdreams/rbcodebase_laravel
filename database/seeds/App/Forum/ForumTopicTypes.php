<?php

use App\Models\App\Forum\ForumTopicType;
use Illuminate\Database\Seeder;

class ForumTopicTypes extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		// Start Fresh
		DB::table('forum_config_topictypes')->delete();

		// Specify Values
		$seed =
			[
			// Title, Text
			['default', 'Standard Forum'],
			['bug', 'A bug tracking feature.'],
			['feature', 'A feature voting feature.'],
			['vote', 'A standard voting feature.'],
			];

		// Create Sample Terms
		foreach ($seed as $key => $value) {
			// Set Values
			$slug = $value[0];
			$title = $value[1];

			// Seed Terms table
			$topicType = ForumTopicType::create(['slug' => $slug, 'title' => $title]);
		}
	}
}
