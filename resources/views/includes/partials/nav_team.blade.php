@if(auth()->user()->teams)
	@if(auth()->user()->currentTeam)
	<div class="sidebar-heading">
		<div class="sidebar-image">
			<img src="../../../../assets/faces/m7.png" class="img-circle img-fluid" alt="sidebar-image" />
		</div>
		<div class="sidebar-options">
			<div class="dropdown">
				<a href="#" class="btn btn-secondary btn-raised dropdown-toggle" data-toggle="dropdown">
					{{ auth()->user()->currentTeam->name }}
				</a>
				<div class="dropdown-menu dropdown-menu-center from-top">
					@if(count(auth()->user()->teams) > 1)
					<div>Current Teams</div>
					@foreach (auth()->user()->teams as $team)
						@if(is_null(auth()->user()->currentTeam) || auth()->user()->currentTeam->id !== $team->id)
							<a href="{{ route('actor.team.switch', $team) }}" class="dropdown-item">
								<i class="fa fa-sign-in"></i>
								<span class="title"> {{ $team->name }}</span>
								<span class="pull-xs-right tag tag-pill tag-raised tag-danger tag-xs">Switch</span>
							</a>
						@endif
					@endforeach
					<hr />
					@endif
					<a href="{{ route('actor.team.index') }}" class="dropdown-item">
						<i class="fa fa-users fa-fw"></i>
						<span class="title">Manage Teams</span>
					</a>
					<a href="{{ route('actor.team.create') }}" class="dropdown-item">
						<i class="fa fa-plus fa-fw"></i>
						<span class="title">Create New Team</span>
					</a>
				</div>
			</div>
			<div class="description">
				@if(auth()->user()->currentTeam->owner_id == auth()->user()->id)
					<span class="label label-success">Owner</span>
				@else
					<span class="label label-primary">Member</span>
				@endif
			</div>
		</div>
	</div>
	@else
	<div class="sidebar-heading">
		<a href="{{ route('actor.team.index') }}">Click to select team</a>
	</div>
	@endif
@endif
