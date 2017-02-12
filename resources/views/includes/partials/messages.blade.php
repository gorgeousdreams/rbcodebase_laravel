@if ($errors->any())
	<div class="alert alert-danger">
		@foreach ($errors->all() as $error)
			{!! $error !!}<br/>
		@endforeach
	</div>
@elseif (session()->get('flash_success'))
	<div class="alert alert-success">
		@if(is_array(json_decode(session()->get('flash_success'), true)))
			{!! implode('', session()->get('flash_success')->all(':message<br/>')) !!}
		@else
			{!! session()->get('flash_success') !!}
		@endif
	</div>
@elseif (session()->get('flash_warning'))
	<div class="alert alert-warning">
		@if(is_array(json_decode(session()->get('flash_warning'), true)))
			{!! implode('', session()->get('flash_warning')->all(':message<br/>')) !!}
		@else
			{!! session()->get('flash_warning') !!}
		@endif
	</div>
@elseif (session()->get('flash_info'))
	<div class="alert alert-info">
		@if(is_array(json_decode(session()->get('flash_info'), true)))
			{!! implode('', session()->get('flash_info')->all(':message<br/>')) !!}
		@else
			{!! session()->get('flash_info') !!}
		@endif
	</div>
@elseif (session()->get('flash_danger'))
	<div class="alert alert-danger">
		@if(is_array(json_decode(session()->get('flash_danger'), true)))
			{!! implode('', session()->get('flash_danger')->all(':message<br/>')) !!}
		@else
			{!! session()->get('flash_danger') !!}
		@endif
	</div>
@elseif (session()->get('flash_message'))
	<div class="alert alert-info">
		@if(is_array(json_decode(session()->get('flash_message'), true)))
			{!! implode('', session()->get('flash_message')->all(':message<br/>')) !!}
		@else
			{!! session()->get('flash_message') !!}
		@endif
	</div>
@endif

@if(access()->user())
	@if (config('actor.users.confirm_email_alert') && !access()->user()->isConfirmed())
	<div class="alert alert-warning">
		{!! trans('exceptions.frontend.auth.confirmation.resend', ['user_id' => access()->user()->id]) !!}
	</div>
	@endif

	@if (config('actor.users.change_password_if_null') && !access()->user()->hasPassword())
	<div class="alert alert-danger">
		Please set your password.  TODO: resources/views/includes/partials/messages.blade.php
	</div>
	@endif
@endif

@include('includes/partials/logged-in-as')
