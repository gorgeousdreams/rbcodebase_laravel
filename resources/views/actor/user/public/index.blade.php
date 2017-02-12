@extends('includes.layouts.master')

@section('content')

	@if($user)

		<div class="badge badge-100">
			@if($user->isVerified())
			<span class="tag tag-sm tag-rounded tag-success">
				<i class="fa fa-check"></i>
			</span>
			@endif
			<img class="img-circle h-100 w-100" src="{!! $user->getPicture() !!}" alt="{{ $user->getDisplayName() }}" />
		</div>

		<div class="">
		@foreach (array_keys(config('social.services')) as $service)
			<div class="m-t-10">
			@if ($user->hasProvider($service))
				<a href="#{{-- @TODO: Add Link --}}" class="btn btn-{{ $service }} btn-raised">
					<i class="fa fa-{{ $service }} fa-fw"></i>
					<!-- span class="btn-text">{{ $service }}</span -->
					<div class="ripple-container"></div>
				</a>
			@endif
			</div>
		@endforeach
		</div>

	@else
		<p>Ack! We lost them!</p>
	@endif

@endsection
