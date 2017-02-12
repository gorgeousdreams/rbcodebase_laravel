@extends('includes.layouts.admin')

@section('content')

	<div class="col-xs-12">
		<div class="box-header with-border">
			<div class="box-tools pull-right">
				@permission('create-roles')
					<a class="btn btn-info" href="{{ route('admin.actor.user.fields.create') }}">Create Field</a>
				@endauth
			</div>
		</div><!-- /.box-header -->

		<div class="box-body">
			<div class="table-responsive">
				<table id="datatable-types" class="table table-condensed table-striped table-hover">
					<thead>
						<tr>
							<th>Type</th>
							<th>Title</th>
							<th>Type</th>
							<th>Value</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
					@foreach($fields as $field)
						<tr>
							<td>{!! $field->role->title !!}</td>
							<td>{!! $field->title !!}</td>
							<td>
								@if($field->type == 1)
									Text Box
								@elseif($field->type == 2)
									Text Area
								@elseif($field->type == 3)
									Dropdown
								@elseif($field->type == 4)
									Dropdown (Multi)
								@endif
							</td>
							<td>{!! $field->value ?: '-' !!}</td>
							<td>
								<a href="{!! route('admin.actor.user.fields.edit', $field->id) !!}" class="btn btn-info"><i class="fa fa-pencil"></i><span class="extra-text"> Edit</span></a>
								<a href="{!! route('admin.actor.user.fields.delete', $field->id) !!}" id="delete" class="btn btn-danger"><i class="fa fa-trash-o"></i><span class="extra-text"> Delete</span></a>
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
			{!! history()->renderType('Field') !!}
		</div><!-- /.box-body -->
	</div><!--box box-success-->

@endsection

@section('navigation-circle')
	@include('admin.actor.user._partials.nav-users')
@stop

@section('after-scripts-end')
<script>
$(document).ready(function() {
	$('#datatable-types').DataTable({
		order: [[0, "asc"]],
		columns: [
			{searchable: true, sortable: true},
			{searchable: true, sortable: true},
			{searchable: true, sortable: true},
			{searchable: false, sortable: true},
			{searchable: false, sortable: false}
		],
	});
});

$("body").on("click", "a[id='delete']", function(e) {
	e.preventDefault();
	var linkURL = $(this).attr("href");

	swal({
		title: "Delete Field",
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
