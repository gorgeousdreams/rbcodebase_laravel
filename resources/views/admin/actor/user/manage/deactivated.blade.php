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
					<td>
						<a href="{{ route('admin.actor.user.manage.edit', $user->id) }}" class="btn btn-xs btn-info"><i class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="{{ trans('buttons.general.crud.edit') }}"></i><span class="extra-text"> Edit</span></a>
						@if($user->id != access()->id())
							@if($user->status == 0)
								<a href="{{ route('admin.actor.user.manage.mark', [$user->id,1]) }}" class="btn btn-xs btn-success"><i class="fa fa-play" data-toggle="tooltip" data-placement="top" title="{{ trans('buttons.backend.access.users.activate') }}"></i></a>
							@else
								<a href="{{ route('admin.actor.user.manage.mark', [$user->id,0]) }}" class="btn btn-xs btn-warning"><i class="fa fa-pause" data-toggle="tooltip" data-placement="top" title="{{ trans('buttons.backend.access.users.deactivate') }}"></i></a>
							@endif
							<a href="{{ route('admin.actor.user.manage.destroy', $user->id) }}" id="delete" data-method="delete" data-trans-button-cancel="{{ trans('buttons.general.cancel') }}" data-trans-button-confirm="{{ trans('buttons.general.crud.delete') }}" data-trans-title="{{ trans('strings.backend.general.are_you_sure') }}" class="btn btn-xs btn-danger"><i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="{{ trans('buttons.general.crud.delete') }}"></i><span class="extra-text"> Delete</span></a>
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
			{searchable: false, sortable: false}
		],
	});
});

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})
</script>
@stop
