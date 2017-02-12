<?php

use App\Models\App\Forum\ForumTopic;
use App\Models\App\Forum\ForumTopicType;
use Illuminate\Database\Seeder;

class ForumTopics extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		// Start Fresh
		DB::table('forum_topics')->delete();
		DB::table('forum_topics_translations')->delete();

		// Create Sample Cuisines
		foreach ($this->getTopics() as $value) {
			$category = ForumTopic::create($value);

			foreach (['en', 'de'] as $locale) {
				if ($locale <> 'en') {
					$category->translateOrNew($locale)->title = $locale . '_' . $value['title'];
					$category->translateOrNew($locale)->text = $locale . '_' . $value['text'];
					$category->translateOrNew($locale)->calltoaction = $locale . '_' . $value['calltoaction'];
				} else {
					$category->translateOrNew($locale)->title = $value['title'];
					$category->translateOrNew($locale)->text = $value['text'];
					$category->translateOrNew($locale)->calltoaction = $value['calltoaction'];
				}
			}

			$category->save();
		}

		// Update Parents
		$parent_id = ForumTopic::where('slug', 'faq')->first()->id;
		$update = ForumTopic::where('slug', 'faq-sub1')->update(['parent_id' => $parent_id]);
		$update = ForumTopic::where('slug', 'faq-sub2')->update(['parent_id' => $parent_id]);

		// Log Progress
		$this->command->info('... Topics Added.');
	}

	private function getTopics()
	{
		return [
			[
				'title'         => 'Frequently Asked Questions',
				'text'          => 'Have a general question about the site?  Find your answer here (or ask the question).',
				'priority'      => 1,
				'calltoaction'  => 'Ask a Question',
				'forum_type_id' => ForumTopicType::where('slug', 'default')->first()->id,
				'slug'          => str_slug('faq'),
				'icon'          => 'fa-question-circle-o',
				'parent_id'     => null,
			],
				// Sub Topic of FAQ
				[
					'title'         => 'Sub Topic 1',
					'text'          => 'Example Sub Topic 1',
					'priority'      => 1,
					'calltoaction'  => 'Ask a Question',
					'forum_type_id' => ForumTopicType::where('slug', 'default')->first()->id,
					'slug'          => str_slug('faq-sub1'),
					'icon'          => 'fa-question-circle-o',
					'parent_id'     => null,
				],
				// Sub Topic of FAQ
				[
					'title'         => 'Sub Topic 2',
					'text'          => 'Example Sub Topic 2',
					'priority'      => 2,
					'calltoaction'  => 'Ask a Question',
					'forum_type_id' => ForumTopicType::where('slug', 'default')->first()->id,
					'slug'          => str_slug('faq-sub2'),
					'icon'          => 'fa-question-circle-o',
					'parent_id'     => null,
				],
			[
				'title'         => 'Feature Request',
				'text'          => 'Have a feature you would like to see? Request it!',
				'priority'      => 2,
				'calltoaction'  => 'Request a Feature',
				'forum_type_id' => ForumTopicType::where('slug', 'feature')->first()->id,
				'slug'          => str_slug('features'),
				'icon'          => 'fa-lightbulb-o',
				'parent_id'     => null,
			],
			[
				'title'         => 'Share Your Success',
				'text'          => 'If you are happy and you know it, clap your hands, then submit a testimonial.',
				'priority'      => 3,
				'calltoaction'  => 'Share Your Story',
				'forum_type_id' => ForumTopicType::where('slug', 'default')->first()->id,
				'slug'          => str_slug('success'),
				'icon'          => 'fa-heart',
				'parent_id'     => null,
			],
			[
				'title'         => 'Report a Bug',
				'text'          => 'Help us make the best product possible by reporting bugs.',
				'priority'      => 4,
				'calltoaction'  => 'Report a Bug',
				'forum_type_id' => ForumTopicType::where('slug', 'bug')->first()->id,
				'slug'          => str_slug('bugs'),
				'icon'          => 'fa-bug',
				'parent_id'     => null,
			],
		];
	}
}
