@extends('includes.layouts.auth')

@section('after-styles-end')
	<link rel="stylesheet" type="text/css" href="{{ elixir('css/pages/registration/styles.css') }}" />
@endsection

@section('content')

	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="panel panel-default">
					<h1 class="panel-heading">{{ trans('labels.frontend.auth.register_box_title') }}</h1>
					<div class="panel-body">
						<p class="m-b-20">Please enter your email address and password to create your account</p>

						{{-- @include('includes.partials.messages') --}}

						{{ Form::open(['route' => 'actor.user.auth.register', 'class' => 'form-horizontal']) }}

							<div class="row">
								<div class="col-xs-12">
									<div class="form-group bmd-form-group floating-labels {{ $errors->has('name_first') ? 'has-error' : '' }}">
										{{ Form::label('name_first', trans('validation.attributes.frontend.name_first') , ['class' => 'bmd-label-floating control-label']) }}
										{{ Form::input('text', 'name_first', null, ['class' => 'form-control', 'required' => true]) }}
										<span class="bmd-help">Please enter your first name</span>
										@if ($errors->has('name_first'))
											<span class="help-block">
												<strong>{{ $errors->first('name_first') }}</strong>
											</span>
										@endif
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<div class="form-group bmd-form-group floating-labels {{ $errors->has('name_last') ? 'has-error' : '' }}">
										{{ Form::label('name_last', trans('validation.attributes.frontend.name_last'), ['class' => 'bmd-label-floating control-label']) }}
										{{ Form::input('text', 'name_last', null, ['class' => 'form-control', 'required' => true]) }}
										<span class="bmd-help">Please enter your last name</span>
										@if ($errors->has('name_last'))
											<span class="help-block">
												<strong>{{ $errors->first('name_last') }}</strong>
											</span>
										@endif
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<div class="form-group bmd-form-group floating-labels {{ $errors->has('name_slug') ? 'has-error' : '' }}">
										{{ Form::label('name_slug', trans('validation.attributes.frontend.name_slug'), ['class' => 'bmd-label-floating control-label']) }}
										{{ Form::input('text', 'name_slug', null, ['class' => 'form-control', 'required' => true]) }}
										@if ($errors->has('name_slug'))
											<span class="help-block">
												<strong>{{ $errors->first('name_slug') }}</strong>
											</span>
										@endif
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<div class="form-group bmd-form-group floating-labels {{ $errors->has('email') ? 'has-error' : '' }}">
										{{ Form::label('email', trans('validation.attributes.frontend.email'), ['class' => 'bmd-label-floating control-label']) }}
										{{ Form::input('email', 'email', null, ['class' => 'form-control', 'required' => true]) }}
										<span class="bmd-help">Please enter your email</span>
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
									<div class="form-group bmd-form-group floating-labels {{ $errors->has('password') ? 'has-error' : '' }}">
										{{ Form::label('password', trans('validation.attributes.frontend.password'), ['class' => 'bmd-label-floating control-label']) }}
										{{ Form::input('password', 'password', null, ['class' => 'form-control', 'required' => true]) }}
										<span class="bmd-help">Please enter your password</span>
										@if ($errors->has('password'))
											<span class="help-block">
												<strong>{{ $errors->first('password') }}</strong>
											</span>
										@endif
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<div class="form-group bmd-form-group floating-labels {{ $errors->has('password') ? 'has-error' : '' }}">
										{{ Form::label('password_confirmation', trans('validation.attributes.frontend.password_confirmation'), ['class' => 'bmd-label-floating control-label']) }}
										{{ Form::input('password', 'password_confirmation', null, ['class' => 'form-control', 'required' => true]) }}
										<span class="bmd-help">Please enter your password again</span>
										@if ($errors->has('password_confirmation'))
											<span class="help-block">
											<strong>{{ $errors->first('password_confirmation') }}</strong>
										</span>
										@endif
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<div class="checkbox checkbox-secondary">
										<label>
											<input type="checkbox" value="agree" name="agreement"><span
													class="checkbox-decorator"><span class="check"></span></span>By
											clicking on create account, you agree to our terms of service and that you
											have read our privacy policy, including our cookie use policy
										</label>
									</div>
									@if ($errors->has('agreement'))
										<span class="help-block">
										<strong>{{ $errors->first('agreement') }}</strong>
									</span>
									@endif
								</div>
							</div>
							@if (config('actor.captcha.registration'))
								<div class="row">
									<div class="col-xs-12">
										<div class="checkbox checkbox-secondary">
											{!! Form::captcha() !!}
											{{ Form::hidden('captcha_status', 'true') }}
										</div>
									</div>
								</div>
							@endif

							{{ Form::submit(trans('labels.frontend.auth.register_button'), ['class' => 'btn btn-raised btn-lg btn-secondary btn-block']) }}
						{{ Form::close() }}
						<p class="sign-up-link">I have an account <a href="{{ url('/login') }}">Sign in here</a></p>
						<p class="social-buttons">
							{!! $socialite_links !!}
						</p>

					</div>
				</div>
			</div>
		</div>
	</div>
@endsection

@section('after-scripts-end')
	@if (config('actor.captcha.registration'))
		{!! Captcha::script() !!}
	@endif
	<script src="{{ elixir('js/pages/registration/scripts.js') }}"></script>
@stop
