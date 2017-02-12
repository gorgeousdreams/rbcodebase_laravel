{{ 'Session:'. session('invite_token') }}

@if(Auth::guest())
	<ul class="nav navbar-nav pull-right hidden-md-down navbar-profile">
		<li class="nav-item"><a href="{!! route('actor.user.auth.login') !!}" class="nav-link">{{ trans('navs.frontend.login') }}</a></li>
		@if (config('actor.users.registration'))
		<li class="nav-item"><a href="{!! route('actor.user.auth.register') !!}" class="nav-link">{{ trans('navs.frontend.register') }}</a></li>
		@endif
	</ul>
@else
	<div class="pull-right navbar-1">
		<div id="dropdown-message" class="nav-item dropdown message dropdown-tasks">
			<a class="nav-link dropdown-toggle no-after {{ checkActiveRoute(route('actor.user.notifications', [], false)) }}" data-toggle="dropdown" href="{{ route('actor.user.notifications') }}" aria-expanded="true">
				<i class="fa fa-bell"></i>
			</a>
			<div class="dropdown-menu">
				<div class="dropdown-menu-header">
					<span class="side-left">Notifications</span>

					<div class="clearfix"></div>
				</div>
				<div class="no-messages">
					<i class="fa fa-bell-slash-o" aria-hidden="true"></i>
					<p>You don't have any notifications</p>
				</div>
				<div class="dropdown-menu-footer">
					<a href="{{ route('actor.user.notifications') }}">See all</a>
				</div>
			</div>
		</div>

		<span class="welcome m-r-10">{{ trans('strings.backend.dashboard.welcome') }}, {{ $logged_in_user->name_first }}</span>
		<div class="dropdown">
			<a class="dropdown-toggle no-after" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<div class="badge badge-40">
					@if(access()->user()->isVerified())
					<span class="tag tag-sm tag-rounded tag-success">
						<i class="fa fa-check"></i>
					</span>
					@endif
					<img class="max-w-40 img-circle" src="{!! $logged_in_user->picture ? url($logged_in_user->picture) : get_gravatar(access()->user()->email) !!}" alt="{{ $logged_in_user->getDisplayName() }}" />
				</div>
			</a>
			<div class="dropdown-menu dropdown-menu-user dropdown-menu-right from-right">
				<a class="dropdown-item" href="{!! route('common.dashboard') !!}">
					<i class="fa fa-dashboard fa-fw"></i>
					<span class="title m-l-10">Dashboard</span>
					<span class="tag tag-pill tag-raised tag-danger tag-xs">New</span>
				</a>
				<a class="dropdown-item" href="{!! route('actor.user.profile') !!}">
					<i class="fa fa-gears fa-fw"></i>
					<span class="title m-l-10">Your Settings</span>
				</a>

				@if(config('actor.team.enable'))
				<a class="dropdown-item" href="{!! route('actor.team.index') !!}">
					<i class="fa fa-briefcase fa-fw"></i>
					<span class="title m-l-10">Teams</span>
				</a>
				@endif

				@permission('view-admin')
				<hr />
				<a class="dropdown-item" href="{!! route('admin.dashboard') !!}">
					<i class="fa fa-user-secret fa-fw"></i>
					<span class="title m-l-10">Admin</span>
				</a>
				@endauth

				<hr />
				<a class="dropdown-item toggle-fullscreen" href="#">
					<i class="fa fa-arrows-alt fa-fw"></i>
					<span class="title m-l-10">Full Screen</span>
				</a>

				<a class="dropdown-item" href="{!! route('actor.user.auth.logout') !!}">
					<i class="fa fa-sign-out fa-fw"></i>
					<span class="title m-l-10">Logout</span>
				</a>

			</div>
		</div>
		<div class="m-l-10">
			@include('includes.partials.nav_lang')
		</div>
	</div>
@endif
