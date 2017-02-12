@extends ('includes.layouts.admin')

@section('after-styles-end')
	{!! Html::style('css/admin/plugin/jstree/themes/default/style.min.css') !!}
@stop

@section('content')

<div class="col-xs-12">

{{ Form::model($role, ['route' => ['admin.actor.user.role.update', $role->id], 'class' => 'form-horizontal', 'role' => 'form', 'method' => 'post', 'id' => 'edit-role']) }}

	<div class="box box-success">
		<div class="box-body">
			<div class="form-group">
				{{ Form::label('title', trans('validation.attributes.backend.access.roles.name'), ['class' => 'col-lg-2 control-label']) }}

				<div class="col-lg-10">
					{{ Form::text('title', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.backend.access.roles.name')]) }}
				</div><!--col-lg-10-->
			</div><!--form control-->

			<div class="form-group">
				{{ Form::label('associated-permissions', trans('validation.attributes.backend.access.roles.associated_permissions'), ['class' => 'col-lg-2 control-label']) }}

				<div class="col-lg-10">
					@if ($role->id != 1)
						{{-- Administrator has to be set to all --}}
						{{ Form::select('associated-permissions', ['all' => 'All', 'custom' => 'Custom'], $role->all ? 'all' : 'custom', ['class' => 'form-control']) }}
					@else
						<span class="label label-success">{{ trans('labels.general.all') }}</span>
					@endif

					<div id="available-permissions" class="hidden mt-20">
						<div class="row">
							<div class="col-xs-12">
								@if ($permissions->count())
									@foreach ($permissions as $perm)
										<input type="checkbox" name="permissions[]" value="{{ $perm->id }}" id="perm_{{ $perm->id }}" {{in_array($perm->id, $role_permissions) ? 'checked' : ""}} /> <label for="perm_{{ $perm->id }}">{{ $perm->title }}</label><br/>
									@endforeach
								@else
									<p>There are no available permissions.</p>
								@endif
							</div><!--col-lg-6-->
						</div><!--row-->
					</div><!--available permissions-->
				</div><!--col-lg-3-->
			</div><!--form control-->

			<div class="form-group">
				{{ Form::label('order', trans('validation.attributes.backend.access.roles.sort'), ['class' => 'col-lg-2 control-label']) }}

				<div class="col-lg-10">
					{{ Form::text('order', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.backend.access.roles.sort')]) }}
				</div><!--col-lg-10-->
			</div><!--form control-->
		</div><!-- /.box-body -->
	</div><!--box-->

	<div class="box box-success">
		<div class="box-body">
			<div class="pull-left">
				{{ link_to_route('admin.actor.user.role.index', trans('buttons.general.cancel'), [], ['class' => 'btn btn-danger btn-xs']) }}
			</div><!--pull-left-->

			<div class="pull-right">
				{{ Form::submit(trans('buttons.general.crud.update'), ['class' => 'btn btn-success btn-xs']) }}
			</div><!--pull-right-->

			<div class="clearfix"></div>
		</div><!-- /.box-body -->
	</div><!--box-->

{{ Form::close() }}
</div>

@stop

@section('navigation-circle')
	@include('admin.actor.user._partials.nav-users')
@stop

@section('after-scripts-end')
<script>
var associated = $("select[name='associated-permissions']");
var associated_container = $("#available-permissions");

if (associated.val() == "custom")
	associated_container.removeClass('hidden');
else
	associated_container.addClass('hidden');

associated.change(function() {
	if ($(this).val() == "custom")
		associated_container.removeClass('hidden');
	else
		associated_container.addClass('hidden');
});
</script>
@stop
