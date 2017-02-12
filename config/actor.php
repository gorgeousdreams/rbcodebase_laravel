<?php

use App\Models\Actor\User\Role;
use App\Models\Actor\User\Permission;

return [

	/*
	 |--------------------------------------------------------------------------
	 | Users
	 |--------------------------------------------------------------------------
	 |
	 | Users table used to store users
	 |
	 */
	'users_table' => 'users',

	/*
	 |--------------------------------------------------------------------------
	 | Teams / Projects / Companies
	 |--------------------------------------------------------------------------
	 */
	'team' => [

		/*
		 * Whether or not the app uses teams
		 */
		'enable' => true,

		/*
		 * Table used to hold teams... or whatever we call them.
		 */
		'teams_table' => 'teams',

		/*
		 * Holds invite codes to join teams
		 */
		'teams_invites_table' => 'teams_invites',

		/*
		 * Users assigned to Teams
		 */
		'users_teams_table' => 'users_teams',


	],

	/*
	 * Configurations for the user
	 */
	'users' => [

		/*
		 * Whether or not public registration is on
		 */
		'registration' => env('ENABLE_REGISTRATION', 'true'),

		/*
		 * The role the user is assigned to when they sign up from the frontend, not namespaced
		 */
		'default_role' => 'User',
		//'default_role' => 2,

		/*
		 * Whether or not the user has to confirm their email when signing up
		 */
		'confirm_email' => false,

		/*
		 * Wheather or not ot propmpt the user if authenticated but email address is not confirmed
		 */
		'confirm_email_alert' => true,

		/*
		 * Whether or not the users email can be changed on the edit profile screen
		 */
		'change_email' => true,

		/*
		 * Whether or not we should prompt the user to create a password if registered via social
		 */
		'change_password_if_null' => true,

	],

	/*
	 * Configuration for roles
	 */
	'roles' => [
		/*
		 * Whether a role must contain a permission or can be used standalone as a label
		 */
		'role_must_contain_permission' => true
	],

		/*
		 * Role model used by Access to create correct relations. Update the role if it is in a different namespace.
		 */
		'role' => Role::class,

		/*
		 * Roles table used by Access to save roles to the database.
		 */
		'roles_table' => 'data_users_roles',

		/*
		 * Permission model used by Access to create correct relations.
		 * Update the permission if it is in a different namespace.
		 */
		'permission' => Permission::class,

		/*
		 * Permissions table used by Access to save permissions to the database.
		 */
		'permissions_table' => 'data_users_permissions',

		/*
		 * permission_role table used by Access to save relationship between permissions and roles to the database.
		 */
		'permission_role_table' => 'data_users_permission_role',

		/*
		 * assigned_roles table used by Access to save assigned roles to the database.
		 */
		'assigned_roles_table' => 'users_roles',


	/*
	 * Meta
	 */

		/*
		 * Names of custom fields
		 */
		'data_users_fields_table' => 'data_users_fields',

		/*
		 * Values of Custom Fields by User
		 */
		'users_metas_table' => 'users_metas',


	/*
	 * SSO
	 */

		/*
		 * Socialite session variable name
		 * Contains the name of the currently logged in provider in the users session
		 * Makes it so social logins can not change passwords, etc.
		 */
		'socialite_session_name' => 'socialite_provider',

		/*
		 * Users table used to store users
		 */
		'users_logins_table' => 'users_logins',


	/*
	 * Application captcha specific settings
	 */
	'captcha' => [
		/*
		 * Whether the registration captcha is on or off
		 */
		'registration' => env('REGISTRATION_CAPTCHA_STATUS', false),
	],
];
