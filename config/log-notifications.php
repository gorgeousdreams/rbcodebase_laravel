<?php

return [

	// Notifications Table
	'notifications_table' => 'logs_notifications',

	// Email of Default Notified_By
	'default_notifier' => 'info@rbcodebase.com',

	// Types of Notifications
	'types' => [ // Class, Icon, Color
		'team' => [
			'model' => 'App\Models\Actor\Team\Team::class', 'icon' => 'users', 'color' => 'info'
		],
		'team-invite' => [
			'model' => 'App\Models\Actor\Team\TeamInvite::class', 'icon' => 'users', 'color' => 'info'
		],
		'user-role' => [
			'model' => 'App\Models\Actor\User\Role::class', 'icon' => 'lock', 'color' => 'info'
		],
		'user-sso' => [
			'model' => 'App\Models\Actor\User\SocialLogin::class', 'icon' => 'share-alt', 'color' => 'info'
		],
		'referral' => [
			'model' => '', 'icon' => 'hand-spock-o', 'color' => 'info'
		],
		'post' => [
			'model' => '', 'icon' => 'pencil-square', 'color' => 'info'
		],
		'message' => [
			'model' => '', 'icon' => 'commenting', 'color' => 'info'
		],
		'follower' => [
			'model' => '', 'icon' => 'user-plus', 'color' => 'info'
		],
		'following' => [
			'model' => '', 'icon' => 'user-plus', 'color' => 'info'
		],
		'comment' => [
			'model' => '', 'icon' => 'comment', 'color' => 'info'
		],
		'like' => [
			'model' => '', 'icon' => 'thumbs-up', 'color' => 'info'
		],
		'share' => [
			'model' => '', 'icon' => 'share', 'color' => 'info'
		],
		'report' => [
			'model' => '', 'icon' => 'flag', 'color' => 'info'
		],
		'badge' => [
			'model' => '', 'icon' => 'trophy', 'color' => 'info'
		],
	],

];
