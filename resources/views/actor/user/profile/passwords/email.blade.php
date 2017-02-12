@extends('includes.layouts.master')

@section('content')

<div class="col-xs-12">
	<div class="row">
		<div class="col-lg-8">

			<h2>{{ trans('labels.frontend.passwords.reset_password_box_title') }}</h2>

			@if (session('status'))
				<div class="alert alert-success">
					{{ session('status') }}
				</div>
			@endif

			{!! Form::open(['url' => 'password/email', 'class' => 'form-horizontal']) !!}

				<div class="form-group">
					{!! Form::label('email', trans('validation.attributes.frontend.email')) !!}
					{!! Form::input('email', 'email', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.email')]) !!}
				</div><!--form-group-->

				<div class="form-group">
					{!! Form::submit(trans('labels.frontend.passwords.send_password_reset_link_button'), ['class' => 'btn btn-primary']) !!}
				</div><!--form-group-->

			{!! Form::close() !!}

		</div>
		<div class="col-lg-4">
			@include('actor.user._partials.sidebar')
		</div>
	</div>
</div>

@endsection
