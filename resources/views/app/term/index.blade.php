@extends('includes.layouts.master')

@section('content')

	<div class="heading">
		@include('app.term.partials.menu_alpha')
	</div>

	<div class="container m-t-30">
		<div class="row">
			<div class="col-lg-8">
				<?php $last = '0';
					$t = true; ?>
				@if (count($terms))
					@foreach($terms as $term)
						<?php
						$current = strtoupper(substr($term->title, 0, 1));
						if ($current <> $last) {
							// Is it a letter?
							if (ctype_alpha($current)) {
								echo "<a name=\"". $current ."\"></a>";
								echo "<h1 style='padding-top: 15px;'>". $current ."</h1>";
								// Set it as the Current
								$last = $current;
							} else {
								if($t) {  // jenjy... but it works
									echo "<a name=\"num\"></a>";
									echo "<h1 style='padding-top: 15px;'>0-9</h1>";
									// Set it as the Current
									$last = $current;
									$t = false;
								}
							}
						}
						?>
						<a href="{{ route('app.term.show', $term->slug) }}" class="label label-pill label-primary">{{ strtolower($term->title) }}</a>
					@endforeach
				@else
					<p>{{ trans('term.empty') }}</p>
				@endif
			</div>
			<div class="col-lg-4">

				<div class="card">
					<h3 class="card-header">Search</h3>
					<div class="card-block">
						@include('app.term.partials.filter_search')
					</div>
				</div>

				<div class="card">
					<h3 class="card-header">Filter</h3>
					@include('app.term.partials.filter_topics', ['topics' => $topics, 'child' => 'show'])
				</div>

				@if (count($topTerms))
				<div class="card flat">
					<h3 class="card-header">Top Terms</h3>
					<div class="card-block">
					@foreach($topTerms as $topTerm)
						<a href="{{ route('app.term.show', $topTerm->slug) }}" class="label label-pill label-primary">{!! strtolower($topTerm->title) !!}</a>
					@endforeach
					</div>
				</div>
				@endif

			</div>
		</div>
	</div>

@endsection
