@extends('includes.layouts.error')

@section('content')
	<form class="error-2 m-x-auto">
		<!-- FORBIDDEN:  What are you looking for?  Stop snooping! -->
		<h1>408</h1>
		<h3 class="animated fadeIn delay-1000">{{ trans('http.408.title') }}</h3>
		<h4 class="animated fadeIn delay-1100">{{ trans('http.408.description') }}</h4>
		<a href="/" class="btn btn-flat color-danger btn-lg btn-block animated fadeIn delay-1200">Return to homepage</a>
	</form>
@endsection
