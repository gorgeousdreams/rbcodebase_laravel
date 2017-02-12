@extends('includes.layouts.master')

@section('content')
@if ($topic)
<div class="container m-t-30">
	<div class="row">
		<div class="col-md-8">

			<h1 class="m-b-20"><i class="fa {{ $topic->icon }}"></i> {{ $topic->title }}</h1>
			<hr />

			<div class="media">
				<a class="media-left">
					<img class="media-object img-circle h-40 w-40" alt="{{ $thread->user->full_name }}" src="{{ gravatar()->get($thread->user->email) }}">
				</a>
				<div class="media-body">
					<h3>{{ $thread->text }}</h3>
					<p class="text-muted"><small><em>{{ $thread->created_at->diffForHumans() }}</em></small></p>
					{{ $thread->title }}
				</div>
			</div>

			@if(count($thread->comments))
				<hr />
				<h3>Feedback</h3>
				@include('app.forum._partials.comment', ['comments' => $thread->comments])
			@endif

			<hr />
			<h3>Join The Conversation</h3>
			@if (Auth::check())
				{!! Form::open(['route' => 'app.forum.thread.comment']) !!}
					{!! Form::hidden('forum_thread_id', $thread->id) !!}
					<!--- Text Field --->
					<div class="form-group">
						{!! Form::textarea('text', null, ['class' => 'form-control']) !!}
					</div>
					<!--- Start the Conversation Field --->
					<div class="form-group">
						{!! Form::submit('Post your comment', ['class' => 'btn btn-primary btn-lg btn-block m-t-20']) !!}
					</div>
				{!! Form::close() !!}
			@else
				Please register or log in to post a comment.
			@endif

		</div>
		<div class="col-md-4">

			<div class="m-t-10 m-b-30">
				<a href="{{ route('app.forum.thread.create', $topic->slug) }}" class="btn btn-primary btn-lg btn-block"><i class="btn-icon fa fa-plus"></i> {{ $topic->calltoaction }}</a>
			</div>

			<div class="card">
				<h3 class="card-header">Search</h3>
				<div class="card-block">
					@include('app.forum._partials.searchform')
				</div>
			</div>

			<div class="card">
				<h3 class="card-header">Most Active</h3>
				<div class="card-block">
					@include('app.forum._partials.activeuser', ['users' => $users])
				</div>
			</div>

			{{-- @TODO FINISH
			<div class="card">
				<h3 class="card-header">Statistics</h3>
				<div class="card-block">
					@TODO: INSERT STATS
				</div>
			</div>
			--}}

		</div>
	</div>
</div>
@endif
@endsection
