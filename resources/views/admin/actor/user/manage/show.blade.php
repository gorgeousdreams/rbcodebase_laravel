@extends ('includes.layouts.admin')

@section('content')
	<div class="box box-success">

		<div class="box-body">

			@include('admin.actor.user._partials.overview', $user)
			@include('admin.actor.user._partials.history')

		</div><!-- /.box-body -->
	</div><!--box-->
@stop

@section('navigation-circle')
	@include('admin.actor.user._partials.nav-users')
@stop
