@if(auth()->user()->teams)
	<div class="card">
		<div class="card-header">
			Teams
		</div>
		<div class="list-group list-group-root well">
			<a href="{{ route('actor.team.index') }}" class="list-group-item {{ checkActiveRoute(route('actor.team.index', [], false)) }}">
				<i class="fa fa-users fa-fw"></i>
				<span class="title">Manage Teams</span>
			</a>
			@if(count(auth()->user()->teams) > 0)
				@foreach (auth()->user()->teams as $team)
					@if(is_null(auth()->user()->currentTeam) || auth()->user()->currentTeam->id !== $team->id)
					<a href="{{ route('actor.team.switch', $team) }}" class="list-group-item">
						<i class="fa fa-square-o fa-fw"></i>
						<span class="title"> {{ $team->name }}</span>
						<span class="pull-xs-right tag tag-pill tag-raised tag-success tag-xs">Switch</span>
					</a>
					@else
					<div class="list-group-item">
						<i class="fa fa-check-square-o fa-fw"></i>
						<span class="title"> {{ $team->name }}</span>
						<span class="pull-xs-right tag tag-pill tag-raised tag-info tag-xs">Current</span>
					</div>
					@endif
				@endforeach
			<hr />
			@endif
			<a href="{{ route('actor.team.create') }}" class="list-group-item {{ checkActiveRoute(route('actor.team.create', [], false)) }}">
				<i class="fa fa-plus fa-fw"></i>
				<span class="title">Create New Team</span>
			</a>
		</div>
	</div>
@endif
