@extends('includes.layouts.admin')

@section('content')

	<div class="col-xs-12">
		<h3>{{ trans('strings.backend.dashboard.welcome') }} {{ $logged_in_user->name_first }}!</h3>
		<hr />
	</div>
	<div class="col-xs-12">
		<h3>{{ trans('history.backend.recent_history') }}</h3>
		{!! history()->render() !!}
	</div>

@endsection
