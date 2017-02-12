<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\Common\History\HistoryType;

/**
 * Class HistoryTypeTableSeeder
 */
class HistoryTypeTableSeeder extends Seeder {

	/**
	 * Run the database seed.
	 *
	 * @return void
	 */
	public function run() {

		// Start Fresh
		DB::table(config('log-viewer.logs_history_types_table'))->delete();

		// Specify Values
		$seed =
			[
				// Title, Text
				['User'],
				['Role'],
			];

		// Create Sample Terms
		foreach ($seed as $key => $value) {
			// Set Values
			$name = $value[0];

			// Seed Terms table
			$data = HistoryType::create(['name' => $name]);
			echo 'Added History Type: '. $data->name . PHP_EOL;
		}

	}
}
