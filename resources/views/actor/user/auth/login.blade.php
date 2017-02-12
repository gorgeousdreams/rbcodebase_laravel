@extends('includes.layouts.auth')

@section('content')

<div class="container">
	<div class="row">
		<div class="col-md-12">
			<div class="panel panel-default">
				<h1 class="panel-heading">{{ trans('labels.frontend.auth.login_box_title') }}</h1>
				<div class="panel-body">

					<p>Please enter your email address and password to login</p>

					@include('includes.partials.messages')

					{{ Form::open(['route' => 'actor.user.auth.login', 'class' => 'form-horizontal']) }}
						<div class="row">
							<div class="col-xs-12">
								<div class="form-group floating-labels">
									{{ Form::input('email', 'email', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.email')]) }}
									@if ($errors->has('email'))
										<span class="help-block">
											<strong>{{ $errors->first('email') }}</strong>
										</span>
									@endif
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<div class="form-group floating-labels">
									{{ Form::input('password', 'password', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.frontend.password')]) }}
									@if ($errors->has('password'))
										<span class="help-block">
											<strong>{{ $errors->first('password') }}</strong>
										</span>
									@endif
								</div>
							</div>
						</div>
						<div class="row m-b-40">
							<div class="col-xs-12">
								<div class="checkbox">
									<label>
										{{ Form::checkbox('remember', 'remember-me') }}
										<span class="checkbox-decorator"><span class="check"></span></span> {{ trans('labels.frontend.auth.remember_me') }}
									</label>
								</div>
							</div>
						</div>
						<div class="row buttons">
							<div class="col-xs-12">
								{{ Form::submit(trans('labels.frontend.auth.login_button'), ['class' => 'btn btn-raised btn-lg btn-secondary btn-block']) }}
							</div>
							<div class="col-xs-12">
								{{ link_to_route('actor.user.auth.password.reset', trans('labels.frontend.passwords.forgot_password')) }}<br />
								@if (config('actor.users.registration'))
								{{ link_to_route('actor.user.auth.register', trans('labels.frontend.auth.register_button')) }}
								@endif
							</div>
						</div>
					{!! Form::close() !!}

				</div>
				<p class="social-buttons">
					{!! $socialite_links !!}
				</p>
			</div>
		</div>
	</div>
</div>

@endsection
