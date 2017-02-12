@extends('includes.layouts.master')

@section('after-styles-end')
<link rel="stylesheet" type="text/css" href="{{ elixir('css/admin.css') }}" />
@endsection

@section('content')

<div class="col-xs-12">
	<div class="row">
		<div class="col-lg-8">

			<h2>User Roles</h2>
			<p>The following are user roles connected to your account.</p>
			@if($roles->count())
			<div>
				@foreach($roles as $role)
					@if(in_array($role->id, $userRoles))
						@if($role->self_opt_out)
							<a href="{{ route('actor.user.profile.role.optout', $role->id) }}" id="optout" class="btn btn-icon btn-primary btn-outline" data-toggle="tooltip" data-placement="top" title="Click to Opt-Out of this Role">
								<i class="fa fa-{{ $role->icon }}"></i> {{ $role->title }}<div class="ripple-container"></div>
								<i class="fa fa-check-square-o p-l-20"></i>
							</a>
						@else
							<div class="btn btn-icon btn-primary btn-outline" style="cursor: not-allowed;" data-toggle="tooltip" data-placement="top" title="This role does not allow opting-out">
								<i class="fa fa-{{ $role->icon }}"></i> {{ $role->title }}<div class="ripple-container"></div>
								<i class="fa fa-check-square-o p-l-20"></i>
							</div>
						@endif
					@else
						@if($role->visibility && $role->self_opt_in)
							<a href="{{ route('actor.user.profile.role.optin', $role->id) }}" id="optin" class="btn btn-icon btn-secondary btn-outline" data-toggle="tooltip" data-placement="top" title="Click to Opt-In to this Role">
								<i class="fa fa-{{ $role->icon }}"></i> {{ $role->title }}
								<i class="fa fa-square-o p-l-10"></i>
							</a>
						@endif
					@endif
				@endforeach
			</div>
			@endif

			<h2 class="m-t-50">{{ trans('labels.frontend.user.profile.update_information') }}</h2>
			<p>Update your profile information below.</p>

			{{ Form::model($logged_in_user, ['route' => 'actor.user.profile.update', 'class' => 'form-horizontal', 'method' => 'PATCH']) }}

				<div class="form-group">
					{!! Form::label('name_first', trans('validation.attributes.frontend.name_first')) !!}
					{!! Form::input('text', 'name_first', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.name_first')]) !!}
				</div>

				<div class="form-group">
					{!! Form::label('name_last', trans('validation.attributes.frontend.name_last')) !!}
					{!! Form::input('text', 'name_last', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.name_last')]) !!}
				</div>

				<div class="form-group">
					{!! Form::label('name_slug', trans('validation.attributes.frontend.name_slug')) !!}
					{!! Form::input('text', 'name_slug', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.name_slug')]) !!}
				</div>


				@if ($logged_in_user->canChangeEmail())
				<div class="form-group">
					{!! Form::label('email', trans('validation.attributes.frontend.email')) !!}
					{!! Form::email('email', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.email')]) !!}
				</div>
				@endif

				<!--- Language Field --->
				<div class="form-group">
					{!! Form::label('language', 'Language:') !!}
					{!! Form::select('language', ['' => '-- Select Language --'] + get_language_list(), $user->language, ['class' => 'form-control']) !!}
				</div>

				<!--- Timezone Field --->
				<div class="form-group">
					{!! Form::label('timezone', 'Timezone:') !!}
					{!! Form::select('timezone', ['' => '-- Select Timezone --'] + get_timezone_list(), $user->timezone, ['class' => 'form-control']) !!}
				</div>
				@if($roles->count())
					<div class="form-group m-t-30">
					@foreach($user->roles as $role)
						@if($role->fields)
							<h4>{{ $role->title }} Meta</h4>
							@foreach($role->fields as $field)
								<div class="form-group m-t-20">
									<label class="text-capitalize">{!! $field->title !!}</label>
									{!! $field->render() !!}
								</div>
							@endforeach
						@else
							{{-- This role has no custom fields. --}}
						@endif

					@endforeach
					</div>
				@endif

				<div class="form-group m-t-50">
					{{ Form::submit(trans('labels.general.buttons.update'), ['class' => 'btn btn-primary']) }}
				</div>

		</div>
		<div class="col-lg-4">
			@include('actor.user._partials.sidebar')
		</div>
	</div>
</div>

@endsection


@section('after-scripts-end')
<script src="{{ elixir('js/admin.js') }}"></script>
<script>
$("body").on("click", "a[id='optout']", function(e) {
	e.preventDefault();
	var linkURL = $(this).attr("href");

	swal({
		title: "Delete Role",
		text: "Are you sure you want to remove this role?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "{{ trans('strings.backend.general.continue') }}",
		cancelButtonText: "{{ trans('buttons.general.cancel') }}",
		closeOnConfirm: false
	}, function(isConfirmed){
		if (isConfirmed){
			window.location.href = linkURL;
		}
	});
});
</script>
@endsection
