@extends('includes.layouts.master')

@section('content')

<div class="col-xs-12">
	<div class="row">
		<div class="col-lg-8">

			@foreach (array_keys(config('social.services')) as $service)
			<div class="m-t-10">
				@if (access()->user()->hasProvider($service))
				<a href="{{ route('actor.user.social.disconnect', $service) }}" class="btn btn-{{ $service }} btn-raised">
					<i class="fa fa-{{ $service }} fa-fw"></i>
					<span class="btn-text">Disconnect from {{ $service }}</span>
					<div class="ripple-container"></div>
				</a>
				@else
				<a href="{{ route('actor.user.auth.social.login', $service) }}"class="btn btn-raised btn-{{ $service }} btn-outline btn-icon">
					<i class="fa fa-{{ $service }} fa-fw"></i>
					<span class="btn-text">Connect To {{ $service }}</span>
					<div class="ripple-container"></div>
				</a>
				@endif
			</div>
			@endforeach

		</div>
		<div class="col-lg-4">
			@include('actor.user._partials.sidebar')
		</div>
	</div>
</div>

@endsection
