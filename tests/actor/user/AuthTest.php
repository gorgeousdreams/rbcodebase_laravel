<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthTest extends TestCase
{
	use DatabaseTransactions;

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testNewUserRegistrationWithoutEmailConfirmation()
	{
		config(['actor.users.registration' => true]);
		config(['actor.users.confirm_email' => false]);
		$this->visit(route('actor.user.auth.register'))
			->type('John', 'name_first')
			->type('Doe', 'name_last')
			->type('john-doe', 'name_slug')
			->type('johndoe@gmail.com', 'email')
			->type('123456', 'password')
			->type('123456', 'password_confirmation')
			->check('agreement')
			->press('Register')
			->seePageIs(route('common.dashboard'));
	}


	public function testNewUserRegistrationWithEmailConfirmation()
	{
		config(['actor.users.registration' => true]);
		config(['actor.users.confirm_email' => true]);
		$this->visit(route('actor.user.auth.register'))
			->type('John', 'name_first')
			->type('Doe', 'name_last')
			->type('john-doe', 'name_slug')
			->type('johndoe@gmail.com', 'email')
			->type('123456', 'password')
			->type('123456', 'password_confirmation')
			->check('agreement')
			->press('Register')
			->seePageIs(route('actor.user.auth.login'));
	}
}
