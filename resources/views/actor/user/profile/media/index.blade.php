@extends('includes.layouts.master')

@section('after-styles-end')
	<link rel="stylesheet" href="{{ elixir('css/profile-media.css') }}">
@endsection

@section('content')

<div class="col-xs-12">
	<div class="row">
		<div class="col-lg-8">
			<h2>Profile Image</h2>

			{{ Form::open(['method' => 'POST', 'route' => 'actor.user.profile.upload.avatar', 'files' => true, 'class' => '']) }}
				{{ Form::hidden('target', 'avatar') }}
				<div class="row">
					<div class="col-md-4">
						<img class="img-circle h-200 w-200" src="{{ $logged_in_user->picture }}">
						{{ Form::file('img_avatar', ['id' => 'actor-user-profile-picture']) }}
					</div>
					{{-- TODO REFACTOR AS MODAL --}}
					<div class="col-md-6">
						<div id="profile-image-jcrop"></div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						{!! Form::button('<i class="fa fa-floppy-o fa-fw"></i> Save Profile Picture', ['type' => 'submit', 'class' => 'list-group-item btn btn-success btn-raised']) !!}
					</div>
				</div>
			{{ Form::close() }}

			@if (access()->user()->hasPicture())
				<h3>Or Remove</h3>
				{{ Form::open(['method' => 'POST', 'route' => 'actor.user.profile.media.set', 'class' => '']) }}
					{{ Form::hidden('target', 'avatar') }}
					{{ Form::hidden('url', NULL) }}
					{!! Form::button('<i class="fa fa-trash-o fa-fw"></i> Remove Uploaded Image', ['type' => 'submit', 'class' => 'list-group-item btn btn-default btn-raised']) !!}
				{{ Form::close() }}
			@endif

			@if (count(config('social.services')))
				<h3>Or Select Existing</h3>
				@foreach (array_keys(config('social.services')) as $service)
					@if (access()->user()->hasProvider($service))
						{{ Form::open(['method' => 'POST', 'route' => 'actor.user.profile.media.set', 'class' => '']) }}
							{{ Form::hidden('target', 'avatar') }}
							{{ Form::hidden('url', access()->user()->getPictureFromProvider($service)) }}
							{!! Form::button('<i class="fa fa-'. $service .' fa-fw"></i> Set as '. $service .' avatar', ['type' => 'submit', 'class' => 'list-group-item btn btn-'. $service .' btn-raised']) !!}
						{{ Form::close() }}
					@endif
				@endforeach
			@endif

			<hr class="m-t-40" />
			<h2>Banner Image</h2>
			@TODO: Add Banner Image

		</div>
		<div class="col-lg-4">
			@include('actor.user._partials.sidebar')
		</div>
	</div>
</div>

@endsection

@section('after-scripts-end')
	<script src="{{ elixir('js/profile-media.js') }}"></script>
@endsection
