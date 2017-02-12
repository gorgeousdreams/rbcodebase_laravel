@extends('includes.layouts.master')

@section('content')

<div class="container m-t-30">
	<div class="row">
		<div class="col-md-8">

			<h1 class="m-b-20"><i class="zmdi zmdi-comments zmdi-hc-2x"></i> Join the Discussion!</h1>

			@if (count($topics))
			<div class="row">
				@foreach($topics as $topic)
				<div class="card m-b-40">
					<h3 class="card-header">
						<i class="fa {{ $topic->icon }} fa-fw" aria-hidden="true"></i> <a href="{{ route('app.forum.topic', $topic->slug) }}">{{ $topic->title }}</a>
						<a href="{{ route('app.forum.thread.create', $topic->slug) }}" class="btn btn-primary btn-outline pull-right" data-toggle="tooltip" title="{{ $topic->calltoaction }}"><i class="fa fa-plus"></i></a>
					</h3>
					<div class="card-block">

						@if (count($topic->threads))
						<div class="row">
							@foreach($topic->threads as $thread)
								@include('app.forum._partials.thread')
							@endforeach
						</div>
						@else
						<p>Be the first to <a href="{{ route('app.forum.thread.create', $topic->slug) }}">get the conversation started!</a></p>
						@endif

						@if (count($topic->sub_topics))
						<div class="row">
							@foreach($topic->sub_topics as $sub_topic)
							<div class="card">
								<i class="fa {{ $sub_topic->icon }} fa-fw" aria-hidden="true"></i> <a href="{{ route('app.forum.topic', $sub_topic->slug) }}">{{ $sub_topic->title }}</a>
								<div class="activity-widget-3">
									@if (count($sub_topic->threads))
										<div class="row">
											@foreach($sub_topic->threads as $thread)
												@include('app.forum._partials.thread')
											@endforeach
										</div>
									@else
										<p>Be the first to <a href="{{ route('app.forum.thread.create', $sub_topic->slug) }}">get the conversation started!</a></p>
									@endif
								</div>
							</div>
							@endforeach
						</div>
						@else
							{{--<p><em>No sub categories created yet.</em></p> --}}
						@endif



					</div>
				</div>
				@endforeach
			</div>
			@else
			<p>No categories created yet.</p>
			@endif

		</div>
		<div class="col-md-4">

			<div class="m-t-20 m-b-30">
				@if (count($topics))
				<div class="dropdown">
					<a class="btn btn-primary btn-lg btn-block" data-toggle="dropdown" aria-expanded="false"><i class="btn-icon fa fa-plus"></i> Create a Thread</a>
					<div class="dropdown-menu dropdown-no-overflow animation-delay">
					@foreach($topics as $topic)
						<a href="{{ route('app.forum.thread.create', $topic->slug) }}" class="btn btn-info btn-lg btn-block animated pulse"><i class="btn-icon fa {{ $topic->icon }} fa-fw"></i> {{ $topic->calltoaction }}</a>
					@endforeach
					</div>
				</div>
				@endif
			</div>

			<div class="card">
				<h3 class="card-header">Looking for something?</h3>
				<div class="card-block">
					@include('app.forum._partials.searchform')
				</div>
			</div>

			<div class="card">
				<h3 class="card-header">Community</h3>
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


@endsection
