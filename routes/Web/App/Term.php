<?php

/**
 * Term Controllers
 */

Route::group(['middleware' => 'web'], function () {
	Route::group(['prefix' => 'glossary', 'namespace' => 'Term'], function () {
		Route::get('/', 'TermController@index')->name('app.term.index');
		Route::post('suggest', 'TermController@searchSuggest')->name('app.term.suggest');
		Route::get('term/{slug}', 'TermController@show')->name('app.term.show');
		Route::get('/{slug}', 'TermController@index')->name('app.term.topic');
	});
});
