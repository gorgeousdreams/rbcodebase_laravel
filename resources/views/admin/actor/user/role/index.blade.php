@extends ('includes.layouts.admin')

@section('content')

	<div class="col-xs-12">
		<div class="box-header with-border">
			<div class="box-tools pull-right">
				@permission('create-roles')
					<a class="btn btn-info" href="{{ route('admin.actor.user.role.create') }}">{{ trans('menus.backend.access.roles.create') }}</a>
				@endauth
			</div>
		</div><!-- /.box-header -->

		<div class="box-body">
			<div class="table-responsive">
				<table id="datatable-roles" class="table table-condensed table-striped table-hover">
					<thead>
						<tr>
							<th>{{ trans('labels.backend.access.roles.table.role') }}</th>
							<th>{{ trans('labels.backend.access.roles.table.permissions') }}</th>
							<th>{{ trans('labels.backend.access.roles.table.number_of_users') }}</th>
							<th>Details</th>
							<th>{{ trans('labels.backend.access.roles.table.sort') }}</th>
							<th>{{ trans('labels.general.actions') }}</th>
						</tr>
					</thead>
					<tbody>
					@foreach ($roles as $role)
						<tr>
							<td>{{ $role->title }}</td>
							<td>
								@foreach ($role->permissions as $permission)
									<div>{{ $permission->title }}</div>
								@endforeach
							</td>
							<td>{{ $role->users->count() }}</td>
							<td>
								@if($role->autoassign)
								<div><i class="fa fa-magic"></i> AutoAssigned</div>
								@endif
								@if($role->visibility)
								<div><i class="fa fa-eye"></i> Visible</div>
								@endif
								@if($role->show_on_registration)
								<div><i class="fa fa-user"></i> Register Show</div>
								@endif
								@if($role->show_on_settings)
								<div><i class="fa fa-cogs"></i> Settings Show</div>
								@endif
								@if($role->self_opt_in)
								<div><i class="fa fa-sign-in"></i> Allow OptIn</div>
								@endif
								@if($role->self_opt_out)
								<div><i class="fa fa-sign-out"></i> Allow OptOut</div>
								@endif
							</td>
							<td>{{ $role->order }}</td>
							<td>
								<a href="{{ route('admin.actor.user.role.edit', $role->id) }}" class="btn btn-xs btn-info"><i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="{{ trans('buttons.general.crud.edit') }}"></i><span class="extra-text"> Edit</span></a>
								@if ($role->id != 1)
								<a href="{{ route('admin.actor.user.role.delete', $role->id) }}" id="delete" class="btn btn-xs btn-danger"><i class="fa fa-trash-o" data-toggle="tooltip" data-placement="top" title="{{ trans('buttons.general.crud.delete') }}"></i><span class="extra-text"> Delete</span></a>
								@endif
							</td>
						</tr>
					@endforeach
					<tbody>
				</table>
			</div><!--table-responsive-->
		</div><!-- /.box-body -->
	</div><!--box-->

	<div class="col-xs-12 box box-info">
		<div class="box-header with-border">
			<h3 class="box-title">{{ trans('history.backend.recent_history') }}</h3>
		</div><!-- /.box-header -->
		<div class="box-body">
			{!! history()->renderType('Role') !!}
		</div><!-- /.box-body -->
	</div><!--box box-success-->
@stop

@section('navigation-circle')
	@include('admin.actor.user._partials.nav-users')
@stop

@section('after-scripts-end')
<script>
$(document).ready(function() {
	$('#datatable-roles').DataTable({
		order: [[4, "asc"]],
		columns: [
			{searchable: true, sortable: true},
			{searchable: true, sortable: false},
			{searchable: false, sortable: true},
			{searchable: false, sortable: false},
			{searchable: false, sortable: true},
			{searchable: false, sortable: false}
		],
	});
});

$("body").on("click", "a[id='delete']", function(e) {
	e.preventDefault();
	var linkURL = $(this).attr("href");

	swal({
		title: "Delete Role",
		text: "{{ trans('strings.backend.general.are_you_sure') }}",
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

</script>
@stop
