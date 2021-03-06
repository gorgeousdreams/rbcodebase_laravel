<?php

namespace App\Http\Controllers\Admin\Common;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Common\Breadcrumbs;
use SEO;

/**
 * Class DashboardController
 * @package App\Http\Controllers\Admin\Search
 */
class DashboardController extends Controller
{

	public function __construct()
	{
		// Set Base Breadcrumb
		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
		Breadcrumbs::push('<i class="fa fa-unlock-alt"></i>', route('admin.dashboard'));
	}

	/**
	 * @return \Illuminate\View\View
	 */
	public function index()
	{
		// Specify Title
		$title = 'Dashboard';

		// Set Breadcrumbs
		Breadcrumbs::push($title, '#');

		return view('admin.dashboard', compact('title'));
	}

}
