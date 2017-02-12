<div class="card">
	<div class="card-header">
		Profile {!! route('actor.user.profile', [], false) !!}
	</div>
	<div class="list-group list-group-root well">
		<a href="{!! route('actor.user.profile') !!}" class="list-group-item {!! checkActiveRoute(route('actor.user.profile', [], false), false) !!}"><i class="fa fa-user fa-btn fa-fw"></i> Overview</a>
		<a href="{!! route('actor.user.profile.show', auth()->user()->name_slug) !!}" class="list-group-item"><i class="fa fa-at fa-btn fa-fw"></i> Public Profile</a>
	</div>
</div>
@include('actor.user._partials.nav_settings')
@include('actor.user._partials.nav_billing')
@include('actor.user._partials.nav_teams')
