@extends('includes.layouts.master')

@section('after-styles-end')
<link rel="stylesheet" type="text/css" href="{{ elixir('css/admin.css') }}" />
@endsection

@section('content')
<div class="col-xs-12">
	<div class="row">
		<div class="col-lg-8">

			<div class="panel panel-default">
				<div class="panel-heading clearfix">
					<h3>Current Members of team "{{$team->name}}"</h3>
					<a href="{{route('actor.team.index')}}" class="btn btn-sm btn-default pull-right">
						<i class="fa fa-arrow-left"></i> Back
					</a>
				</div>
				<div class="panel-body">
					<table class="table table-striped">
						<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Action</th>
						</tr>
						</thead>
						@if($team->users)
							@foreach($team->users AS $user)
								<tr>
									<td>{{ $user->name_first }}</td>
									<td>{{ $user->name_last }}</td>
									<td>
										@if(auth()->user()->isOwnerOfTeam($team))
											@if(auth()->user()->getKey() !== $user->id)
												<a href="{{route('actor.team.members.change_owner', [$team, $user->id])}}" id="owner" class="btn btn-sm btn-default">
													<i class="fa fa-star"></i> Give Ownership
												</a>

												<form style="display: inline-block;" action="{{ route('actor.team.members.destroy', [$team, $user]) }}" id="delete" method="post">
													{!! csrf_field() !!}
													<input type="hidden" name="_method" value="DELETE" />
													<button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i> Remove From Team</button>
												</form>
											@else
												<span>Owner</span>
											@endif
										@endif
									</td>
								</tr>
							@endforeach
						@else
							No Teams
						@endif
					</table>
				</div>
			</div>

			@if(count($team->invites))
			<div class="m-t-50 panel panel-default">
				<h3>Pending invitations</h3>
				<div class="panel-body">
					<table class="table table-striped">
						<thead>
						<tr>
							<th>E-Mail</th>
							<th>Action</th>
						</tr>
						</thead>
						@foreach($team->invites AS $invite)
							<tr>
								<td>{{$invite->email}}</td>
								<td>
									<a href="{{ route('actor.team.members.resend_invite', [$team->id, $invite]) }}" class="btn btn-sm btn-default">
										<i class="fa fa-envelope-o"></i> Resend invite
									</a>
									<a href="{{ route('actor.team.members.revoke_invite', [$team->id, $invite]) }}" class="btn btn-sm btn-default">
										<i class="fa fa-trash-o"></i> Revoke invite
									</a>
								</td>
							</tr>
						@endforeach
					</table>
				</div>
			</div>
			@endif

			<div class="m-t-50 panel panel-default">
				<h3>Invite to team "{{$team->name}}"</h3>
				<div class="panel-body">
					<form class="form-horizontal" method="post" action="{{route('actor.team.members.invite', $team)}}">
						{!! csrf_field() !!}
						<div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
							<label class="col-md-4 control-label">E-Mail Address</label>

							<div class="col-md-6">
								<input type="email" class="form-control" name="email" value="{{ old('email') }}">

								@if ($errors->has('email'))
									<span class="help-block">
											<strong>{{ $errors->first('email') }}</strong>
										</span>
								@endif
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-6 col-md-offset-4">
								<button type="submit" class="btn btn-primary">
									<i class="fa fa-btn fa-envelope-o"></i>Invite to Team
								</button>
							</div>
						</div>
					</form>
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
$("body").on("click", "a[id='owner']", function(e) {
	e.preventDefault();
	var linkURL = $(this).attr("href");
	swal({
		title: "Change Team Owner",
		text: "Are you sure you want to remove yourself as an owner?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "{{ trans('strings.backend.general.continue') }}",
		cancelButtonText: "{{ trans('buttons.general.cancel') }}",
		closeOnConfirm: false
	}, function(isConfirmed){
		if (isConfirmed){
			window.location.href = linkURL;
		}
	});
});

$('#delete').submit(function(e){
	e.preventDefault();
	swal({
		title: "Change Team Owner",
		text: "Are you sure you want to remove yourself as an owner?",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#cc3f44",
		confirmButtonText: "{{ trans('strings.backend.general.continue') }}",
		cancelButtonText: "{{ trans('buttons.general.cancel') }}",
		closeOnConfirm: false,
		html: false
	}, function(){
		$(".form-confirm").off("submit").submit();
	});
});
</script>
@endsection
