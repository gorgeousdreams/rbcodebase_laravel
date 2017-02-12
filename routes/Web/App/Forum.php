<?php

/**
 * Forum Controllers
 */

Route::group(['middleware' => 'web'], function () {
	Route::group(['prefix' => 'forum', 'namespace' => 'Forum'], function () {
		Route::get('/', 'ForumController@index')->name('app.forum.index');
		Route::get('{topic}', 'ForumController@topic')->name('app.forum.topic');

		Route::group(['middleware' => 'auth'], function () {
			Route::get('{topic}/create', 'ForumController@threadCreate')->name('app.forum.thread.create');
			Route::post('thread', 'ForumController@threadStore')->name('app.forum.thread.store');
		});

		Route::get('{topic}/{thread}', 'ForumController@threadShow')->name('app.forum.thread');

		Route::group(['middleware' => 'auth'], function () {
			Route::post('thread/comment', 'ForumController@threadCommentStore')->name('app.forum.thread.comment');
		});
	});
});
