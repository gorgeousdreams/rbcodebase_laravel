@extends ('includes.layouts.admin')

@section('content')
	<div class="col-xs-12">
		{!! Form::model($user, ['route' => ['admin.actor.user.manage.update', $user->id], 'class' => 'form-horizontal', 'role' => 'form', 'method' => 'post']) !!}
		<div class="row">
			{{ trans('labels.backend.access.users.edit') }}

			<fieldset class="form-group col-md-12">
				{!! Form::label('name_first', trans('validation.attributes.backend.access.users.name_first')) !!}
				{!! Form::text('name_first', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.backend.access.users.name_first')]) !!}
			</fieldset><!--form control-->

			<fieldset class="form-group col-md-12">
				{!! Form::label('name_last', trans('validation.attributes.backend.access.users.name_last')) !!}
				{!! Form::text('name_last', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.backend.access.users.name_last')]) !!}
			</fieldset><!--form control-->

			<fieldset class="form-group col-md-12">
				{!! Form::label('name_slug', trans('validation.attributes.backend.access.users.name_slug')) !!}
				{!! Form::text('name_slug', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.backend.access.users.name_slug')]) !!}
			</fieldset><!--form control-->

			<fieldset class="form-group col-md-12">
				{!! Form::label('email', trans('validation.attributes.backend.access.users.email')) !!}
				{!! Form::text('email', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.backend.access.users.email')]) !!}
			</fieldset>
			<!--form control-->

			<!--- Language Field --->
			<div class="form-group col-md-12">
				{!! Form::label('language', 'Language') !!}
				{!! Form::select('language', ['' => '-- Select Language --'] + get_language_list(), null, ['class' => 'form-control']) !!}
			</div>
			<!--- Timezone Field --->
			<div class="form-group col-md-12">
				{!! Form::label('timezone', 'Timezone') !!}
				{!! Form::select('timezone', ['' => '-- Select Timezone --'] + get_timezone_list(), null, ['class' => 'form-control']) !!}
			</div>
			@if ($user->id != 1)
				<div class="form-group">
					{{ Form::label('status', trans('validation.attributes.backend.access.users.active'), ['class' => 'col-lg-2 control-label']) }}

					<div class="col-lg-1">
						{{ Form::checkbox('status', '1', $user->status == 1) }}
					</div><!--col-lg-1-->
				</div><!--form control-->

				<div class="form-group">
					{{ Form::label('confirmed', trans('validation.attributes.backend.access.users.confirmed'), ['class' => 'col-lg-2 control-label']) }}

					<div class="col-lg-1">
						{{ Form::checkbox('confirmed', '1', $user->confirmed == 1) }}
					</div><!--col-lg-1-->
				</div><!--form control-->

				<div class="form-group">
					{{ Form::label('status', trans('validation.attributes.backend.access.users.associated_roles'), ['class' => 'col-lg-12 control-label']) }}

					<div class="col-lg-12">
						@if (count($roles) > 0)
							@foreach($roles as $role)
								<input type="checkbox" value="{{$role->id}}" name="assignees_roles[]" {{in_array($role->id, $user_roles) ? 'checked' : ''}} id="role-{{$role->id}}" /> <label for="role-{{$role->id}}">{{ $role->title }}</label>
									<a href="#" data-role="role_{{$role->id}}" class="show-permissions small">
										(
											<span class="show-text">{{ trans('labels.general.show') }}</span>
											<span class="hide-text hidden">{{ trans('labels.general.hide') }}</span>
											{{ trans('labels.backend.access.users.permissions') }}
										)
									</a>
								<br/>
								<div class="permission-list hidden" data-role="role_{{$role->id}}">
									@if ($role->all)
										{{ trans('labels.backend.access.users.all_permissions') }}<br/><br/>
									@else
										@if (count($role->permissions) > 0)
											<blockquote class="small">{{--
										--}}@foreach ($role->permissions as $perm){{--
										--}}{{$perm->title}}<br/>
												@endforeach
											</blockquote>
										@else
											{{ trans('labels.backend.access.users.no_permissions') }}<br/><br/>
										@endif
									@endif
								</div><!--permission list-->
							@endforeach
						@else
							{{ trans('labels.backend.access.users.no_roles') }}
						@endif
					</div><!--col-lg-3-->
				</div><!--form control-->
			@endif
		</div><!-- /.box-body -->
	</div><!--box-->

	<div class="box box-success">
		<div class="box-body">
			<div class="pull-left">
			{{ link_to_route('admin.actor.user.manage.index', trans('buttons.general.cancel'), [], ['class' => 'btn btn-danger btn-xs']) }}
		</div><!--pull-left-->

		<div class="pull-right">
			{{ Form::submit(trans('buttons.general.crud.update'), ['class' => 'btn btn-success btn-xs']) }}
		</div><!--pull-right-->

		<div class="clearfix"></div>
	</div><!-- /.box-body -->

	@if ($user->id == 1)
		{!! Form::hidden('status', 1) !!}
		{!! Form::hidden('confirmed', 1) !!}
		{{ Form::hidden('assignees_roles[]', 1) }}
	@endif

	{!! Form::close() !!}
</div><!--box-->
@stop

@section('navigation-circle')
	@include('admin.actor.user._partials.nav-users')
@stop

@section('after-scripts-end')
<script>
$(function() {
	$(".show-permissions").click(function(e) {
		e.preventDefault();
		var $this = $(this);
		var role = $this.data('role');
		var permissions = $(".permission-list[data-role='"+role+"']");
		var hideText = $this.find('.hide-text');
		var showText = $this.find('.show-text');

		// show permission list
		permissions.toggleClass('hidden');

		// toggle the text Show/Hide for the link
		hideText.toggleClass('hidden');
		showText.toggleClass('hidden');
	});
});
</script>
@stop
