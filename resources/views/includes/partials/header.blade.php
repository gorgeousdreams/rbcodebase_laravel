<div class="jumbotron-1">
	<div class="jumbotron jumbotron-fluid">
		<div class="container-fluid">
			<div class="align-right">
				@include('includes.partials.nav_user')
			</div>
			<div class="align-left">
				<h1 class="display-3">Welcome</h1>
				{!! Breadcrumbs::show() !!}
			</div>

			@yield('navigation-circle')
		</div>
	</div>
</div>
