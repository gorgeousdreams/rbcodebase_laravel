<?php

	// Macros
	Route::get('macros', function () {
		return view('common.macros');
	})->name('dev.macros');

	// Force Errors
	Route::get('error403', function () { abort(403); })->middleware('web')->name('dev.error403');
	Route::get('error404', function () { abort(404); })->middleware('web')->name('dev.error404');
	Route::get('error408', function () { abort(408); })->middleware('web')->name('dev.error408');
	Route::get('error500', function () { abort(500); })->middleware('web')->name('dev.error500');
	Route::get('error503', function () { abort(503); })->middleware('web')->name('dev.error503');

	// Show Routes
	Route::get('routes', function () {
		$routeCollection = Route::getRoutes();

		echo "<table style='width:100%'>";
		echo "<tr>";
			echo "<td width='10%'><h4>HTTP Method</h4></td>";
			echo "<td width='20%'><h4>Route</h4></td>";
			echo "<td width='20%'><h4>Path</h4></td>";
			echo "<td width='50%'><h4>Corresponding Action</h4></td>";
		echo "</tr>";
		foreach ($routeCollection as $value) {
			echo "<tr>";
				echo "<td>" . $value->getMethods()[0] . "</td>";
				echo "<td>" . $value->getName() . "</td>";
			if ($value->getMethods()[0] == 'GET') {
				echo "<td><a href='/". $value->getPath() ."'>" . $value->getPath() . "</a></td>";
			} else {
				echo "<td>" . $value->getPath() . "</td>";
			}
				echo "<td>" . $value->getActionName() . "</td>";
			echo "</tr>";
		}
		echo "</table>";
	})->name('dev.routes');
