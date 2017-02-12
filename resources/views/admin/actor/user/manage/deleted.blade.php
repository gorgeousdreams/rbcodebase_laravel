@extends ('includes.layouts.admin')

@section('content')

	@permission('create-users')
		<a class="btn btn-info" href="{{ route('admin.actor.user.manage.create') }}">{{ trans('menus.backend.access.users.create') }}</a>
	@endauth

	<div class="col-xs-12">
		<table id="datatable-users" class="table table-hover table-striped">
			<thead>
				<tr>
					<th>{{ trans('labels.backend.access.users.table.id') }}</th>
					<th>{{ trans('labels.backend.access.users.table.name_first') }}</th>
					<th>{{ trans('labels.backend.access.users.table.name_last') }}</th>
					<th>{{ trans('labels.backend.access.users.table.roles') }}</th>
					<th>{{ trans('labels.backend.access.users.table.created') }}</th>
					<th>Deleted</th>
					<th>{{ trans('labels.general.actions') }}</th>
				</tr>
			</thead>
			<tfoot class="hidden">
				<tr>
					<th>{{ trans('labels.backend.access.users.table.id') }}</th>
					<th>{{ trans('labels.backend.access.users.table.name_first') }}</th>
					<th>{{ trans('labels.backend.access.users.table.name_last') }}</th>
					<th>{{ trans('labels.backend.access.users.table.roles') }}</th>
					<th>{{ trans('labels.backend.access.users.table.created') }}</th>
					<th>Deleted</th>
					<th>{{ trans('labels.general.actions') }}</th>
				</tr>
			</tfoot>
			<tbody>
			@foreach ($users as $user)
				<tr>
					<td>{!! $user->id !!}</td>
					<td>{!! $user->name_first !!}</td>
					<td>{!! $user->name_last !!}</td>
					<td>
						@foreach ($user->roles as $role)
						{{ $role->title }}
						@endforeach
					</td>
					<td>{!! $user->created_at->diffForHumans() !!}</td>
					<td>{!! $user->deleted_at->diffForHumans() !!}</td>
					<td>
						<a href="{{ route('admin.actor.user.manage.edit', $user->id) }}" class="btn btn-xs btn-info"><i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="{{ trans('buttons.general.crud.edit') }}"></i><span class="extra-text"> Edit</span></a>
						@if($user->id != access()->id())
							<a href="{{ route('admin.actor.user.manage.restore', $user->id) }}" id="restore_user" class="btn btn-xs btn-success"><i class="fa fa-undo" data-toggle="tooltip" data-placement="top" title="{{ trans('buttons.backend.access.users.restore_user') }}"></i><span class="extra-text"> {{ trans('buttons.backend.access.users.restore_user') }}</span></a>
							<a href="{{ route('admin.actor.user.manage.delete-permanently', $user->id) }}" id="delete_user_perm" class="btn btn-xs btn-danger"><i class="fa fa-eraser" data-toggle="tooltip" data-placement="top" title="{{ trans('buttons.backend.access.users.delete_permanently') }}"></i><span class="extra-text"> {{ trans('buttons.backend.access.users.delete_permanently') }}</span></a>
						@endif
					</td>
				</tr>
			@endforeach
			</tbody>
		</table>
	</div>

	<hr />
	<div class="col-xs-12 box box-info m-t-50">
		<div class="box-header with-border">
			<h3 class="box-title">{{ trans('history.backend.recent_history') }}</h3>
		</div><!-- /.box-header -->
		<div class="box-body">
			{!! history()->renderType('User') !!}
		</div><!-- /.box-body -->
	</div><!--box box-success-->

@stop

@section('navigation-circle')
	@include('admin.actor.user._partials.nav-users')
@stop

@section('after-scripts-end')
<script>
$(document).ready(function() {
	$('#datatable-users').DataTable({
		order: [[0, "asc"]],
		columns: [
			{searchable: false, sortable: true},
			{searchable: true, sortable: true},
			{searchable: true, sortable: true},
			{searchable: false, sortable: true},
			{searchable: false, sortable: false},
			{searchable: false, sortable: true},
			{searchable: false, sortable: false}
		],
	});
});

$("body").on("click", "a[id='delete_user_perm']", function(e) {
	e.preventDefault();
	var linkURL = $(this).attr("href");

	swal({
		title: "{{ trans('strings.backend.general.are_you_sure') }}",
		text: "{{ trans('strings.backend.access.users.delete_user_confirm') }}",
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
$("body").on("click", "a[id='restore_user']", function(e) {
	e.preventDefault();
	var linkURL = $(this).attr("href");

	swal({
		title: "{{ trans('strings.backend.general.are_you_sure') }}",
		text: "{{ trans('strings.backend.access.users.restore_user_confirm') }}",
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

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})
</script>
@stop
