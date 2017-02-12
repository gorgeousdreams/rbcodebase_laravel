<?php

use App\Models\App\Term\Term;
use App\Models\App\Term\TermExample;
use App\Models\Common\Data\DataTopic;
use Illuminate\Database\Seeder;

class TermTableSeeder extends Seeder
{

	public function run()
	{

		// Start Faker
		$faker = Faker\Factory::create('en_US');
		$fakerDE = Faker\Factory::create('de_DE');
		$fakerES = Faker\Factory::create('es_ES');

		// Start Fresh
		DB::table('terms')->delete();
		DB::table('terms_translations')->delete();

		$seed =
		[ // slug, title, similar, text, parent_topic
			['example1','Example 1', '', 'This is an example term', ''],
			['example2','Example 2', '', 'This is an example term', 'example1'],
			['example3','Example 3', '', 'This is an example term', ''],
			['example4','Example 4', '', 'This is an example term', 'example2'],
			['example5','Example 5', '', 'This is an example term', 'example1|example2'],
			// slug, title, similar, text, parent_topic
		];

		foreach ($seed as $key => $value) {
			$slug = $value[0];
			$title = $value[1];
			// Get Alias
			if (isset($value[2])) {
				$similar = $value[2];
			} else {
				$similar = '';
			}
			$text = $value[3];
			$parent_topic = $value[4];

			// Create Terms
			$term = Term::create(['slug' => $slug, 'active' => '1', 'similar' => $similar]);
			echo 'Added Term: '. $term->slug;

			// Loop through and attach topics
			if(!empty($parent_topic)) {

				// Check if Multiple
				if (strpos($parent_topic, '|')) {
					// Has multiple parent topics, explode to array
					$topicArray =  explode('|', $parent_topic);
					// Loop through all topics
					for ($i = 0; $i < count($topicArray); $i++) {
						// Attach Topic to Term
						$topic = DataTopic::select('id')->where('slug', '=', $topicArray[$i])->first();
						// Associate Topic
						if(!empty($topic->id)) {
							$term->topics()->attach($topic->id);
						}
						echo '('. $topicArray[$i] .'::'. $topic->id .')';
					}
				} else {
					// Attach Single Topic to Term
					$topic = DataTopic::select('id')->where('slug', '=', $parent_topic)->first();
					// Associate Topic
					if(!empty($topic->id)) {
						$term->topics()->attach($topic->id);
						echo '('. $slug . '::'. $topic->id .')';
					}
				}

			} else {
				echo ' (No Parent)';
			}
			echo PHP_EOL;

			// Loop through locales
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
		 * Examples
		 */

		DB::table('terms_example')->delete();
		DB::table('terms_example_translations')->delete();

		$seed =
			[
			// TERM_SLUG, slug, title, text, code (Shell, Python, Ruby, HTML, Generic, PHP, Javascript, CSS), format
			['example1', 'test1', 'Test 1', 'Some Test', ".highlight {\n\rpadding: 9px 14px;\n\rmargin-bottom: 14px;\n\rbackground-color: #f7f7f9;\n\rborder: 1px solid #e1e1e8;\n\rborder-radius: 4px;\n\rtext-align: left;\n\/* display: block; */\n\r}\n\r", 'css',''],
			['example2', 'test2', 'Test 1Sub', 'Some Test', '', 'php', ''],
			['example3', 'test3', 'Test 2', 'Some Test', '', 'php', ''],
			['example4', 'test4', 'Test 2Sub', 'Some Test', '', 'php', ''],
			['example5', 'test5', 'Test Multi', 'Some Test', '', 'php', ''],
			];

		// Create Sample Terms
		foreach ($seed as $key => $value) {
			// Set Values
			$parent = $value[0];
			$slug = $value[1];
			$title = $value[2];
			$text = $value[3];
			$code = $value[4];
			$format = $value[5];

			// Get Current Record
			$term = DB::table('terms')->where('slug', '=', $parent)->first();

			// Seed Terms table
			$termExample = TermExample::create(['term_id' => $term->id, 'slug' => $slug, 'format' => $format]);

			// Add Translations
			foreach (['en', 'de'] as $locale) {
				if ($locale <> 'en') {
					$termExample->translateOrNew($locale)->title = $locale . '_' . $title;
					$termExample->translateOrNew($locale)->text = $locale . '_' . $text;
					$termExample->translateOrNew($locale)->code = $locale . '_' . $code;
				} else {
					$termExample->translateOrNew($locale)->title = $title;
					$termExample->translateOrNew($locale)->text = $text;
					$termExample->translateOrNew($locale)->code = $code;
				}
			}
			$termExample->save();
		}
	}
}
