@extends('includes.layouts.master')

@section('content')

@if ($topic)
<div class="container m-t-30">
	<div class="row">
		<div class="col-md-8">

			<h1 class="m-b-20"><i class="fa {{ $topic->icon }} fa-fw"></i> {{ $topic->title }}</h1>
			<hr />

			<div class="card m-b-30">
				<h3 class="card-header">
					{{ $topic->title }}
					<a href="{{ route('app.forum.thread.create', $topic->slug) }}" class="btn btn-primary btn-outline pull-right" data-toggle="tooltip" title="{{ $topic->calltoaction }}"><i class="fa fa-plus"></i></a>
				</h3>
				<div class="card-block">
					<p>{{ $topic->text }}</p>

					@if (count($topic->threads))
						<div class="row">
							@foreach($topic->threads as $thread)
								@include('app.forum._partials.thread')
							@endforeach
						</div>
					@else
						<p>No Threads created yet.</p>
					@endif
				</div>
			</div>

			@if (count($topic->sub_topics))
				@foreach($topic->sub_topics as $sub_topic)
				<div class="card m-b-30">
					<h3 class="card-header">
						<a href="{{ route('app.forum.topic', $sub_topic->slug) }}">{{ $sub_topic->title }}</a>
						<a href="{{ route('app.forum.thread.create', $sub_topic->slug) }}" class="btn btn-primary btn-outline pull-right" data-toggle="tooltip" title="{{ $sub_topic->calltoaction }}"><i class="fa fa-plus"></i></a>
					</h3>
					<div class="card-block">
					@if (count($sub_topic->threads))
						<div class="row">
							@foreach($sub_topic->threads as $thread)
								@include('app.forum._partials.thread')
							@endforeach
						</div>
					@else
						<p>No Threads created yet.</p>
					@endif
					</div>
				</div>
				@endforeach
			@else
				{{-- <p>No sub categories created yet.</p> --}}
			@endif

		</div>

		<div class="col-md-4">

			<div class="m-b-30">
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
