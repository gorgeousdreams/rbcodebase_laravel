<?php

namespace App\Http\Controllers\App\Term;

use Illuminate\Http\Request;

use App;
use App\Models\App\Course\Course;
use App\Models\App\Term\Term;
use App\Models\App\Term\TermExample;
use App\Models\Common\Data\DataTopic;
use App\Http\Controllers\Controller;
use App\Repositories\Common\Breadcrumbs;
use SEO;

/**
 * Class TermController
 * @package App\Http\Controllers
 */
class TermController extends Controller
{

	public function __construct()
	{
		// Set Base Breadcrumb

		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
	}

	public function index($slug = null)
	{

		// Filter by category?
		if (!empty($slug)) {
			// Get Topic
			$topic = DataTopic::where('slug', $slug)->first();

			// Specify Title
			$titleparent = trans('term.overview');

			// Get All Related Terms
			$terms = $topic->terms()
				->join('terms_translations as t', 't.term_id', '=', 'terms.id')
				->where('locale', App::getLocale())
				->groupBy('terms.id')
				->orderBy('t.title')
				->get();

			// Set Breadcrumbs
			Breadcrumbs::push($titleparent, route('app.term.index'));
			Breadcrumbs::push($topic->title, route('app.term.topic', $topic->slug));
		} else {

			// Get All Terms
			$terms = Term::join('terms_translations as t', 't.term_id', '=', 'terms.id')
						->where('locale', App::getLocale())
						->groupBy('terms.id')
						->orderBy('t.title')
						->select('t.title', 'terms.*')
						->get();

			// Specify Title
			$title = trans('term.overview');

			// Set Breadcrumbs
			Breadcrumbs::push($title, route('app.term.index'));
		}

		// Get Most Popular Terms (Active Language)
		$topTerms = Term::join('terms_translations as t', 't.term_id', '=', 'terms.id')
					->where('locale', App::getLocale())
					->where('t.stat_viewed', '>', '0')
					->groupBy('terms.id')
					->orderBy('t.stat_viewed', 'desc')
					->select('t.title', 'terms.*')
					->take(10)
					->get();

		// Get Topics
		$topics = DataTopic::translated()->where('parent_id', 0)->withCount('terms')->get();

		// Return View
		return view('app.term.index', compact('title', 'terms', 'topTerms', 'topics'));
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($slug)
	{
		// Get Term
		$term = Term::where('slug', $slug)->first();

		// Translate
		$translatedTerm = $term->translate();

		// Update View Count +1
		$update = $translatedTerm->increment('stat_viewed');

		// Get Examples
		$examples = TermExample::where('term_id', $term->id)->get();

		// Get Topics
		$topics = $term->topics;

		// Get Courses Related
		// TODO: Refactor as relational model...
		$courses = Course::join('courses_modules', 'courses.id', '=', 'courses_modules.course_id')
			->join('courses_lessons', 'courses_modules.id', '=', 'courses_lessons.module_id')
			->join('terms_lessons_mux', 'courses_lessons.id', '=', 'terms_lessons_mux.lesson_id')
			->select('courses.*') // @TODO: Refactor to only grab slug/title (from trans)
			->where('terms_lessons_mux.term_id', $term->id)
			->groupBy('terms_lessons_mux.term_id')
			->get();

		// Specify Title
		$parentTitle = trans('term.overview');
		$title = $translatedTerm->title;

		// Set Breadcrumbs
		Breadcrumbs::push($parentTitle, route('app.term.index'));
		Breadcrumbs::push($title, route('app.term.show', $term->slug));

		// Return View
		return view('app.term.show', compact('title', 'term', 'examples', 'topics', 'courses'));
	}

	/**
	 * Search
	 */
	public function searchSuggest(Request $request)
	{
		$query = $request->input('query');

		if ($query) {
			$terms = Term::whereTranslationLike('title', '%'.$query.'%')->orWhere('slug', 'like', '%'.$query.'%')->translated()->take(15)->get();
		} else {
			$terms = null;
		}

		// Handle AJAX Requests
		if (\Request::ajax()) {
			return json_encode($terms);
		}

		return $terms;
	}
}
