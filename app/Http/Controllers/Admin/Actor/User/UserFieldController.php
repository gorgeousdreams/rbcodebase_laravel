<?php

namespace App\Http\Controllers\Admin\Actor\User;

use App\Http\Controllers\Controller;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Repositories\Common\Breadcrumbs;

use App\Models\Actor\User\UserField;

/**
 * Class UserFieldController
 * @package App\Http\Controllers\Admin\Actor\User
 */
class UserFieldController extends Controller
{
	public function __construct()
	{
		// Set Base Breadcrumb
		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
		Breadcrumbs::push('<i class="fa fa-unlock-alt"></i>', route('admin.dashboard'));
		Breadcrumbs::push(trans('labels.backend.access.users.management'), route('admin.actor.user.manage.index'));
	}

	/**
	 * Display a listing of the record
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		// Get Data
		$fields = UserField::with('role')->get();

		// Specify Title
		$title = 'Custom Fields';

		// Set Breadcrumbs
		Breadcrumbs::push($title, '#');

		// Return View
		return view('admin.actor.user.user-fields.index', compact('title', 'fields'));
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{

		// Specify Title
		$title = 'Create New Custom Field';

		// Set Breadcrumbs
		Breadcrumbs::push('Custom Fields', route('admin.actor.user.fields.index'));
		Breadcrumbs::push('Create New', route('admin.actor.user.fields.create'));

		// Return View
		return view('admin.actor.user.user-fields.create');
	}

	public function store(Request $request)
	{
		$input = $request->except('_token');

		/*
		@TODO: Refactor
		if (UserField::isDropdown($request->type)) {
			$value = $request->value;

			if (contain_duplicates($value)) {
				return back()->withInput($request->except('value'))->withFlashDanger('Duplicate values not allowed!');
			}

			$input['value'] = implode(UserField::DELIMITER, $value);
		}
		*/

		$field = UserField::create($input);

		/*
		if ($request->has('role')) {
			$field->role()->attach($request->role);
		}
		*/

		// Return Redirect
		return redirect()->route('admin.actor.user.fields.index')->withFlashSuccess('User field created successfully.');
	}

	public function edit($id)
	{
		// Get Field
		$field = UserField::findOrFail($id);

		// Specify Title
		$title = 'Edit Field';

		// Set Breadcrumbs
		Breadcrumbs::push('Custom Fields', route('admin.actor.user.fields.index'));
		Breadcrumbs::push('Edit', route('admin.actor.user.fields.edit', $field->id));

		// Return View
		return view('admin.actor.user.user-fields.edit', compact('title', 'field'));
	}

	public function update(Request $request, UserField $field)
	{
		$input = $request->all();

		/*
		if (UserField::isDropdown($request->type)) {
			$value = $request->value;

			if (contain_duplicates($value)) {
				return back()->withInput($request->except('value'))->withFlashDanger('Duplicate values not allowed!');
			}

			$input['value'] = implode(UserField::DELIMITER, $value);
		}
		*/

		$field->fill($input);
		$field->save();

		/*
		if ($request->has('user_types')) {
			$field->user_types()->sync($request->user_types);
		}
		*/

		// Return Redirect
		return redirect()->route('admin.actor.user.fields.index')->withFlashSuccess('User field updated successfully.');
	}

	public function destroy($id)
	{
		$field = UserField::findOrFail($id);
		//$field->role->detach();
		$field->delete();

		// Return Redirect
		return redirect()->route('admin.actor.user.fields.index')->withFlashSuccess('User field removed successfully.');
	}
}
