<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests;

class TestController extends Controller
{
	public function index()
	{
		return success(['this', 'is', 'test'], 'Test data retrieved successfully.');
	}
}
