<?php

use Faker\Generator;
use App\Models\Actor\User\User;
use App\Models\Actor\User\Notification;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

// User
$factory->define(User::class, function (Generator $faker) {
	static $password;
	return [
		'name_first' => $faker->name_first,
		'name_last' => $faker->name_last,
		'name_slug' => $faker->user_name,
		'email' => $faker->unique()->safeEmail,
		'password' => $password ?: $password = bcrypt(str_random(10)),
		'remember_token' => str_random(10),
	];
});

// Notifiction
$factory->define(Notification::class, function (Generator $faker) {
	return [
		'post_id' => $faker->numberBetween($min = 1, $max = 60),
		'user_id' => $faker->numberBetween($min = 1, $max = 2),
		'notified_by' => $faker->numberBetween($min = 1, $max = 38),
		'seen' => $faker->boolean,
		'text' => $faker->text,
		'type' => $faker->randomElement($array = ['follower', 'message', 'following', 'referral', 'post', 'comment', 'like', 'share', 'report']),
	];
});
