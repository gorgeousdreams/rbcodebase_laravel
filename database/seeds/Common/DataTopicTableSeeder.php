<?php

use App\Models\Common\Data\DataTopic;
use App\Models\Common\Data\DataTopicTranslation;
use App\Models\Common\Data\DataTopicSub;
use App\Models\Common\Data\DataTopicSubTranslation;
use App\Models\Common\Data\DataSkill;
use App\Models\Common\Data\DataSkillTranslation;
use Illuminate\Database\Seeder;

class DataTopicTableSeeder extends Seeder
{

	public function run()
	{

		// Start Faker
		$faker = Faker\Factory::create('en_US');
		$fakerDE = Faker\Factory::create('de_DE');

		/*
		 * Topics
		 */

		// Start Fresh
		DB::table('data_topics')->delete();
		DB::table('data_topics_translations')->delete();

		$seed =
		[ // slug, title, text, icon, parent, order
			['example1', 'Example Topic 1', '', 'puzzle-piece', '', 1],
				['example1s1', 'Example Topic 1 Sub 1', '', 'pied-piper', 'example1', 1],
				['example1s2', 'Example Topic 1 Sub 2', '', 'pied-piper', 'example1', 1],
			['example2', 'Example Topic 1', '', 'puzzle-piece', '', 1],
				['example2s1', 'Example Topic 2 Sub 1', '', 'pied-piper', 'example2', 1],
				['example2s2', 'Example Topic 2 Sub 2', '', 'pied-piper', 'example2', 1],
		];

		foreach ($seed as $key => $value) {
			// Get Values from Array
			$slug = $value[0];
			$title = $value[1];
			$text = $value[2];
			$icon = $value[3];
			$parent = $value[4];
			// Get ID of Parent
			if (!empty($parent)) {
				$parent_id = DataTopic::select('id')->where('slug', '=', $parent)->first()->id;
			} else {
				$parent_id = 0;
			}
			$order = $value[5];

			$term = DataTopic::create(['slug' => $slug, 'active' => '1', 'icon' => $icon, 'parent_id' => $parent_id, 'order' => $order]);

			foreach (['en', 'de'] as $locale) {
				if ($locale <> 'en') {
					$term->translateOrNew($locale)->title = $locale . '_' . $title;
					$term->translateOrNew($locale)->text = $locale . '_' . $text;
				} else {
					$term->translateOrNew($locale)->title = $title;
					$term->translateOrNew($locale)->text = $text;
				}
			}

			$term->save();
		}

		/*
		 * Sub Topics
		 */


		DB::table('data_topicsubs')->delete();
		DB::table('data_topicsubs_translations')->delete();

		$seed =
		[ // topic, slug, title, text, icon, parent, order
/*			['strategy', 'Strategy', '', 'puzzle-piece', '', 1],
				['branding', 'Branding', '', 'pied-piper', 'strategy', 1],
			['marketing', 'Marketing', 'Marketing Related', 'bullseye', '', 2],
				['seo', 'Search Engine Optimization', '', 'search', 'marketing', 1],
				['social', 'Social Media Marketing', '', 'comments', 'marketing', 2],
				['paid', 'Pay Per Click / Advertising', '', 'credit-card-alt', 'marketing', 1],
				['affiliate', 'Affiliate Marketing', '', 'external-link-square', 'marketing', 2],
				['email', 'Email Marketing', '', 'envelope', 'marketing', 3],
				['analytics', 'Analytics & Conversion', '', 'area-chart', 'marketing', 4],
				['content', 'Content Marketing', '', 'file-text', 'marketing', 5],
				['growth', 'Growth Hacking', '', 'paper-plane', 'marketing', 6],
			['technology', 'Technology', 'Technology Related', 'terminal', '', 3],
				['internet', 'Internet', 'Technology Related', 'chrome', 'technology', 1],
				['webdesign', 'Web Design', '', 'paint-brush', 'technology', 2],
				['webdev', 'Web Development', '', 'code', 'technology', 3],
				['ecomm', 'eCommerce', '', 'shopping-cart', 'technology', 4],
			['sales', 'Sales', '', 'user-plus', '', 4],
*/
		];


		foreach ($seed as $key => $value) {
			// Get Values from Array
			$topic = $value[0];
				// Get ID of Parent
				$topic_id = DataTopic::select('id')->where('slug', '=', $topic)->first()->id;
			$slug = $value[1];
			$title = $value[2];
			$text = $value[3];
			$icon = $value[4];
			$parent = $value[5];
				// Get ID of Parent
				if (!empty($parent)) {
					$parent_id = DataTopicSub::select('id')->where('slug', '=', $parent)->first()->id;
				} else {
					$parent_id = 0;
				}
			$order = $value[6];

			$topicsub = DataTopicSub::create(['topic_id' => $topic_id, 'slug' => $slug, 'active' => '1', 'icon' => $icon, 'parent_id' => $parent_id, 'order' => $order]);

			foreach (['en', 'de'] as $locale) {
				if ($locale <> 'en') {
					$topicsub->translateOrNew($locale)->title = $locale . '_' . $title;
					$topicsub->translateOrNew($locale)->text = $locale . '_' . $text;
				} else {
					$topicsub->translateOrNew($locale)->title = $title;
					$topicsub->translateOrNew($locale)->text = $text;
				}
			}

			$topicsub->save();
		}


		/*
		 * Skills
		 */

		DB::table('data_skills')->delete();
		DB::table('data_skills_translations')->delete();

		$seed =
		[	// Slug, Text, Text_Services, Icon, Order
			['example','Example', 'Example Skill', 'puzzle-piece','', 1],
		];

		foreach ($seed as $key => $value) {
			// Get Values from Array
			$slug = $value[0];
			$title = $value[1];
			$title_service = $value[2];
			$icon = $value[3];
			$text = $value[4];
			$order = $value[5];

			$term = DataSkill::create(['slug' => $slug, 'icon' => $icon, 'order' => $order]);

			foreach (['en', 'de'] as $locale) {
				if ($locale <> 'en') {
					$term->translateOrNew($locale)->title = $locale . '_' . $title;
					$term->translateOrNew($locale)->title_service = $locale . '_' . $title_service;
					$term->translateOrNew($locale)->text = $locale . '_' . $text;
				} else {
					$term->translateOrNew($locale)->title = $title;
					$term->translateOrNew($locale)->title_service = $title_service;
					$term->translateOrNew($locale)->text = $text;
				}
			}

			$term->save();
		}






	}
}
