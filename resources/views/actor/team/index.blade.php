@extends('includes.layouts.master')

@section('after-styles-end')
<link rel="stylesheet" type="text/css" href="{{ elixir('css/admin.css') }}" />
@endsection

@section('content')
<div class="col-xs-12">
	<div class="row">
		<div class="col-lg-8">

			@if(count($invites))
			<div class="panel-body">
				<table class="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						@foreach($invites as $invite)
						<tr>
							<td>{{ $invite->team->name }}</td>
							<td>{{ $invite->type }}</td>
							<td>
								<a href="{{route('actor.team.invite_accept', $invite->accept_token)}}" class="btn btn-sm btn-default">
									<i class="fa fa-sign-in"></i> Accept Request
								</a>
								<a href="{{route('actor.team.invite_decline', $invite->deny_token)}}" class="btn btn-sm btn-default">
									<i class="fa fa-times"></i> Deny Request
								</a>
							</td>
						</tr>
						@endforeach
					</tbody>
				</table>
			</div>
			@endif

			<div class="m-t-50 panel panel-default">
				<div class="panel-heading clearfix">
					<a class="pull-right btn btn-default btn-sm" href="{{ route('actor.team.create') }}">
						<i class="fa fa-plus"></i> Create team
					</a>
				</div>
				<div class="panel-body">
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Role</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							@foreach($teams as $team)
							<tr>
								<td>{{$team->name}}</td>
								<td>
									@if(auth()->user()->isOwnerOfTeam($team))
										<span class="label label-success">Owner</span>
									@else
										<span class="label label-primary">Member</span>
									@endif
								</td>
								<td>
									@if(is_null(auth()->user()->currentTeam) || auth()->user()->currentTeam->getKey() !== $team->getKey())
										<a href="{{route('actor.team.switch', $team)}}" class="btn btn-sm btn-default">
											<i class="fa fa-sign-in"></i> Switch
										</a>
									@else
										<span class="label label-default">Current team</span>
									@endif
								</td>
								<td>
									<a href="{{route('actor.team.members.show', $team)}}" class="btn btn-sm btn-default">
										<i class="fa fa-users"></i> Members
									</a>

									@if(auth()->user()->isOwnerOfTeam($team))
										<a href="{{route('actor.team.edit', $team)}}" class="btn btn-sm btn-default">
											<i class="fa fa-pencil"></i> Edit
										</a>

										<form style="display: inline-block;" action="{{route('actor.team.destroy', $team)}}" id="delete" name="form-confirm" method="post">
											{!! csrf_field() !!}
											<input type="hidden" name="_method" value="DELETE" />
											<button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i> Delete</button>
										</form>
									@endif
								</td>
							</tr>
							@endforeach
						</tbody>
					</table>
				</div>
			</div>

		</div>
		<div class="col-lg-4">
			@include('actor.team._partials.sidebar')
		</div>
	</div>
</div>
@endsection

@section('after-scripts-end')
<script src="{{ elixir('js/admin.js') }}"></script>
<script>
$('#delete').submit(function(e){
	e.preventDefault();
	swal({
		title: "Delete Team",
		text: "Are you sure you want to perminantly delete this team?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#cc3f44",
		confirmButtonText: "{{ trans('strings.backend.general.continue') }}",
		cancelButtonText: "{{ trans('buttons.general.cancel') }}",
		closeOnConfirm: false,
		html: false
	}, function(){
		$("#delete").off("submit").submit();
	});
});
</script>
@endsection
