<div class="card">
	<div class="card-header">
		Settings
	</div>
	<div class="list-group list-group-root well">
		<a href="{!! route('actor.user.profile.edit') !!}" class="list-group-item {{ checkActiveRoute(route('actor.user.profile.edit', [], false), true) }}">
			<i class="fa fa-pencil fa-btn fa-fw"></i>
			{{ trans('navs.frontend.user.my_information') }}
		</a>
		@if (auth()->user()->canChangePassword())
		<a href="{!! route('actor.user.profile.password') !!}" class="list-group-item {{ checkActiveRoute(route('actor.user.profile.password', [], false), true) }}">
			<i class="fa fa-lock fa-btn fa-fw"></i>
			{{ trans('navs.frontend.user.change_password') }}
		</a>
		@endif
		<a href="{!! route('actor.user.social.connect') !!}" class="list-group-item {{ checkActiveRoute(route('actor.user.social.connect', [], false), true) }}">
			<i class="fa fa-cube fa-btn fa-fw"></i>
			Social Logins
		</a>
		<a href="{!! route('actor.user.profile.media') !!}" class="list-group-item {{ checkActiveRoute(route('actor.user.profile.media', [], false), true) }}">
			<i class="fa fa-paint-brush fa-btn fa-fw"></i>
			Media &amp; Styles
		</a>
	</div>
</div>
