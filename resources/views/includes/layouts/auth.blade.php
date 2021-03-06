<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
	{{--{!! SEO::generate() !!}--}}
	@yield('meta')

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="shortcut icon" href="/favicon.ico" />
	<meta name="_token" content="{{ csrf_token() }}" />
	@yield('before-styles-end')
	<!--[if IE]>
	<script src="{{ elixir('js/ie.js') }}"></script>
	<![endif]-->
	<link rel="stylesheet" type="text/css" href="{{ elixir('css/common.css') }}" />
	<link rel="stylesheet" type="text/css" href="{{ elixir('css/actor-user-auth.css') }}" />
	@yield('after-styles-end')
	@include('includes.partials.ga')
</head>
<body data-layout="empty-view-1" data-palette="palette-0" data-direction="none">

	<div class="actor-user-auth sign-in sign-up">
		{!! Breadcrumbs::show() !!}

		@yield('content')
		<p class="copyright">
			@include('includes.partials.footer_credit')
			{{-- @include('includes.partials.footer_links') --}}
		</p>
	</div>

	@yield('before-scripts-end')
	<script src="{{ elixir('js/common.js') }}"></script>
	@yield('after-scripts-end')
</body>
</html>
