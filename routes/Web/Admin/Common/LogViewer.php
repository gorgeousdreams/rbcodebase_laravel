<?php

/**
 * This overwrites the Log Viewer Package routes so we can use middleware to protect it the way we want
 * You shouldn't have to change anything
 * All route names are prefixed with 'admin.'
 */
Route::group([
	'prefix'     => 'log-viewer',
], function() {
	Route::get('/', [
		'as'   => 'admin.common.logs.dashboard',
		'uses' => '\Arcanedev\LogViewer\Http\Controllers\LogViewerController@index',
	]);

	Route::group([
		'prefix' => 'logs',
	], function() {
		Route::get('/', [
			'as'   => 'admin.common.logs.list',
			'uses' => '\Arcanedev\LogViewer\Http\Controllers\LogViewerController@listLogs',
		]);

		Route::delete('delete', [
			'as'   => 'admin.common.logs.delete',
			'uses' => '\Arcanedev\LogViewer\Http\Controllers\LogViewerController@delete',
		]);
	});

	Route::group([
		'prefix' => '{date}',
	], function() {
		Route::get('/', [
			'as'   => 'admin.common.logs.show',
			'uses' => '\Arcanedev\LogViewer\Http\Controllers\LogViewerController@show',
		]);

		//TODO: Figure out why the default link isn't working
		Route::get('/all', function ($date){
			return redirect()->route('admin.common.logs.show', [$date]);
		});

		Route::get('download', [
			'as'   => 'admin.common.logs.download',
			'uses' => '\Arcanedev\LogViewer\Http\Controllers\LogViewerController@download',
		]);

		Route::get('{level}', [
			'as'   => 'admin.common.logs.filter',
			'uses' => '\Arcanedev\LogViewer\Http\Controllers\LogViewerController@showByLevel',
		]);
	});
});
