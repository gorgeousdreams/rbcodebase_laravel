<?php

namespace App\Http\Controllers\App\Forum;

use App\Repositories\Common\Breadcrumbs;
use App\Http\Controllers\Controller;
use App\Models\App\Forum\ForumComment;
use App\Models\App\Forum\ForumThread;
use App\Models\App\Forum\ForumTopic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use SEO;

/**
 * Class FrontendController
 * @package App\Http\Controllers
 */
class ForumController extends Controller
{

	public function __construct()
	{
		// Set Base Breadcrumb

		Breadcrumbs::push('<i class="fa fa-home"></i>', route('marketing.index'));
	}

	public function index()
	{
		// Get Topics
		$topics = ForumTopic::where('parent_id', null)->with('sub_topics', 'threads')->get();

		// Get most Active Thread Posters
		$users = DB::table('users')
					->join('forum_threads', 'users.id', '=', 'forum_threads.user_id')
					->select(DB::raw('count(forum_threads.id) as contributions')) // , 'users.name_slug', 'users.name_first', 'users.name_last', 'users.email'
					->groupBy('users.id')
					->havingRaw('COUNT(*) > 1')
					->get();

		// Specify Title
		$title = 'Forum'; // @TODO: Translate

		// Set Breadcrumbs
		Breadcrumbs::push($title, route('app.forum.index'));

		// Return View
		return view('app.forum.index', compact('title', 'topics', 'users'));
	}

	public function topic($slug)
	{
		// Parent Topic
		$topic = ForumTopic::where('slug', $slug)->with('sub_topics', 'threads')->firstOrFail();

		// Get most Active Thread Posters
		$users = DB::table('users')
					->join('forum_threads', 'users.id', '=', 'forum_threads.user_id')
					->select(DB::raw('count(forum_threads.id) as contributions'), 'users.name_slug', 'users.name_first', 'users.name_last', 'users.email')
					->where('forum_threads.forum_topic_id', $topic->id) // @TODO: View all contributions in Threads and Comments
					->groupBy('users.id')
					->havingRaw('COUNT(*) > 1')
					->get();

		// Specify Title
		$parentTitle = 'Forum'; // @TODO: Translate
		$title = $topic->title;

		// Set Breadcrumbs
		Breadcrumbs::push($parentTitle, route('app.forum.index'));
		Breadcrumbs::push($title, route('app.forum.topic', $topic->slug));

		// Return View
		return view('app.forum.topic', compact('title', 'topic', 'users'));
	}


	/*
	 * Forum Threads
	 */

	public function threadShow($topic, $thread)
	{
		// Parent Topic
		$topic = ForumTopic::where('slug', $topic)->firstOrFail();

		// Get Related Threads
		$thread = ForumThread::where('slug', $thread)->with('user', 'comments.comments.user', 'comments.user')->translated()->firstOrFail();

		// Get Most Active Commenters
		$users = DB::table('users')
					->join('forum_thread_comment', 'users.id', '=', 'forum_thread_comment.user_id')
					->select(DB::raw('count(forum_thread_comment.id) as contributions'), 'users.name_slug', 'users.name_first', 'users.name_last', 'users.email')
					->groupBy('users.id')
					->havingRaw('COUNT(*) > 1')
					->get();

		// Specify Title
		$parentTitle = 'Forum'; // @TODO: Translate
		$title = $thread->title;

		// Set Breadcrumbs
		Breadcrumbs::push($parentTitle, route('app.forum.index'));
		Breadcrumbs::push($topic->title, route('app.forum.topic', $topic->slug));
		Breadcrumbs::push($title, route('app.forum.thread', [$topic->slug, $thread->slug]));

		// Return View
		return view('app.forum.thread.index', compact('title', 'topic', 'thread', 'users'));
	}


	public function threadCreate($slug)
	{
		$topic = ForumTopic::where('slug', $slug)->firstOrFail();

		// Specify Title
		$parentTitle = 'Forum'; // @TODO: Translate
		$title = $topic->calltoaction;

		// Set Breadcrumbs
		Breadcrumbs::push($parentTitle, route('app.forum.index'));
		Breadcrumbs::push($topic->title, route('app.forum.topic', $topic->slug));
		Breadcrumbs::push($title, route('app.forum.thread.create', $topic->slug));

		// Return View
		return view('app.forum.thread.create', compact('topic'));
	}

	protected function threadStore(Request $request)
	{
		$topic = ForumTopic::findOrFail($request->topic_id);

		$thread = new ForumThread();

		$thread->forum_topic_id = $topic->id;
		$thread->user_id = auth()->id();
		$thread->brand_id = $request->brand_id;
		$thread->slug = str_slug($request->title);

		$thread->save();

		$thread->translations()->create([
			'locale' => \App::getLocale(),
			'title'  => $request->title,
			'text'   => $request->text,
		]);

		return redirect(route('app.forum.thread', [$topic->slug,$thread->slug]));
	}

	protected function threadUpdate($input, $id)
	{
		$user_id = Auth::user()->id;

		// Update
		DB::table('projects')
			->where('id', $id)
			->where('user_id', $user_id)// Ensure they are the primary
			->update(['title' => $input['title']]);
	}

	protected function threadDestroy($id)
	{
		$user_id = Auth::user()->id;

		// Delete
		DB::table('projects')
			->where('id', $id)
			->where('user_id', $user_id)// Ensure they are the primary
			->delete();
	}

	/*
	 * Thread Comments
	 */
	public function threadCommentStore(Request $request)
	{

		ForumComment::create([
			'forum_thread_id' => $request->forum_thread_id,
			'parent_id'       => $request->comment_id,
			'user_id'         => auth()->id(),
			'text'            => $request->text,
			'locale'          => \App::getLocale(),
		]);

		return back();
	}
}
