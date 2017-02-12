@extends('includes.layouts.master')

@section('after-styles-end')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/default.min.css" />
@endsection

@section('content')
<div class="panel panel-default">
	<div class="panel-heading">
		@include('app.term.partials.menu_alpha')
	</div>

	<div class="container m-t-30">
		<div class="row">
			<div class="col-lg-8">

				@if (!empty($term->title))
					<h1>{{ $term->title }}</h1>

					<div>{!! $term->getText() !!}</div>

					@if (count($examples))
					<hr />
					<h2>Examples</h2>
						@foreach($examples as $example)
						<div class="m-t-1 m-b-1">
							<h4>{{ $example->title }}</h4>
							<p>{!! $example->text !!}</p>
							@if ($example->code)
							<figure class="highlight">
								<pre>
									<code class="copy language-{{ $example->format }} {{ $example->format }}" data-lang="{{ $example->format }}">
{!! htmlentities($example->code) !!}
									</code>
								</pre>
							</figure>
							@endif
							<span class="label label-default">Format: {{ $example->format }}</span>
							<!-- span class="label label-default">Stack: Linux</span>
							<span class="label label-default">Platform:</span>
							<span class="label label-default">Extension:</span>
							<span class="label label-default">Goal:</span -->
						</div>
						@endforeach
					@endif

					<hr />
					<span class="label label-default">Count: {{ $term->stat_viewed }}</span>

				@else
					<p>{{ trans('term.notfound') }}</p>
				@endif
			</div>
			<div class="col-lg-4">

				@if (isset($topics) AND count($topics))
				<div class="card">
					<h3 class="card-header">Related Topics</h3>
						@include('app.term.partials.filter_topics', ['topics' => $topics, 'child' => 'hide'])
				</div>
				@endif

				@if (isset($courses) AND count($courses))
				<div class="card">
					<h3 class="card-header m-b-0">Related Lessons</h3>
					<div class="list-group list-group-root well">
					@foreach($courses as $course)
						<a href="{{ route('app.course.show', $course->slug) }}" class="list-group-item">{{ $course->title }}</a>
					@endforeach
					</div>
				</div>
				@endif

			</div>
		</div>
	</div>
</div>

@endsection
@section('after-scripts-end')
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/highlight.min.js"></script>
<script src="/assets/js/extras-syntax-highlighting.js"></script>
@endsection
