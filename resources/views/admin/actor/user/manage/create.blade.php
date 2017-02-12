@extends ('includes.layouts.admin')

@section('content')
<div class="col-xs-12">
	{{ Form::open(['route' => 'admin.actor.user.manage.store', 'class' => 'form-horizontal', 'role' => 'form', 'method' => 'post']) }}

		<div class="box col-xs-12 box-success">
			<div class="box-body">
				<div class="form-group">
					{{ Form::label('name_first', trans('validation.attributes.backend.access.users.name_first'), ['class' => 'col-lg-2 control-label']) }}

					<div class="col-lg-10">
						{{ Form::text('name_first', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.backend.access.users.name_first')]) }}
					</div><!--col-lg-10-->
				</div><!--form control-->

				<div class="form-group">
					{{ Form::label('name_last', trans('validation.attributes.backend.access.users.name_last'), ['class' => 'col-lg-2 control-label']) }}

					<div class="col-lg-10">
						{{ Form::text('name_last', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.backend.access.users.name_last')]) }}
					</div><!--col-lg-10-->
				</div><!--form control-->

				<div class="form-group">
					{{ Form::label('name_slug', trans('validation.attributes.backend.access.users.name_slug'), ['class' => 'col-lg-2 control-label']) }}

					<div class="col-lg-10">
						{{ Form::text('name_slug', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.backend.access.users.name_slug')]) }}
					</div><!--col-lg-10-->
				</div><!--form control-->

				<div class="form-group">
					{{ Form::label('email', trans('validation.attributes.backend.access.users.email'), ['class' => 'col-lg-2 control-label']) }}

					<div class="col-lg-10">
						{{ Form::text('email', null, ['class' => 'form-control', 'placeholder' => trans('validation.attributes.backend.access.users.email')]) }}
					</div><!--col-lg-10-->
				</div><!--form control-->

				<div class="form-group">
					{{ Form::label('password', trans('validation.attributes.backend.access.users.password'), ['class' => 'col-lg-2 control-label', 'placeholder' => trans('validation.attributes.backend.access.users.password')]) }}

					<div class="col-lg-10">
						{{ Form::password('password', ['class' => 'form-control']) }}
					</div><!--col-lg-10-->
				</div><!--form control-->

				<div class="form-group">
					{{ Form::label('password_confirmation', trans('validation.attributes.backend.access.users.password_confirmation'), ['class' => 'col-lg-2 control-label', 'placeholder' => trans('validation.attributes.backend.access.users.password_confirmation')]) }}

					<div class="col-lg-10">
						{{ Form::password('password_confirmation', ['class' => 'form-control']) }}
					</div><!--col-lg-10-->
				</div><!--form control-->

				<div class="form-group">
					{{ Form::label('status', trans('validation.attributes.backend.access.users.active'), ['class' => 'col-lg-2 control-label']) }}

					<div class="col-lg-1">
						{{ Form::checkbox('status', '1', true) }}
					</div><!--col-lg-1-->
				</div><!--form control-->

				<div class="form-group">
					{{ Form::label('confirmed', trans('validation.attributes.backend.access.users.confirmed'), ['class' => 'col-lg-2 control-label']) }}

					<div class="col-lg-1">
						{{ Form::checkbox('confirmed', '1', true) }}
					</div><!--col-lg-1-->
				</div><!--form control-->

				<div class="form-group">
					<label class="col-lg-2 control-label">{{ trans('validation.attributes.backend.access.users.send_confirmation_email') }}<br/>
						<small>{{ trans('strings.backend.access.users.if_confirmed_off') }}</small>
					</label>

					<div class="col-lg-1">
						{{ Form::checkbox('confirmation_email', '1') }}
					</div><!--col-lg-1-->
				</div><!--form control-->

				<div class="form-group">
					{{ Form::label('status', trans('validation.attributes.backend.access.users.associated_roles'), ['class' => 'col-lg-2 control-label']) }}

					<div class="col-lg-3">
						@if (count($roles) > 0)
							@foreach($roles as $role)
								<input type="checkbox" value="{{ $role->id }}" name="assignees_roles[]" id="role-{{ $role->id }}" /> <label for="role-{{ $role->id }}">{{ $role->title }}</label>
								<a href="#" data-role="role_{{ $role->id }}" class="show-permissions small">
									(
										<span class="show-text">{{ trans('labels.general.show') }}</span>
										<span class="hide-text hidden">{{ trans('labels.general.hide') }}</span>
										{{ trans('labels.backend.access.users.permissions') }}
									)
								</a>
								<br/>
								<div class="permission-list hidden" data-role="role_{{ $role->id }}">
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
			</div><!-- /.box-body -->
		</div><!--box-->

		<div class="box box-info col-xs-12">
			<div class="box-body">
				<div class="pull-left">
					{{ link_to_route('admin.actor.user.manage.index', trans('buttons.general.cancel'), [], ['class' => 'btn btn-danger btn-xs']) }}
				</div><!--pull-left-->

				<div class="pull-right">
					{{ Form::submit(trans('buttons.general.crud.create'), ['class' => 'btn btn-success btn-xs']) }}
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
$(function() {
	$(".show-permissions").click(function(e) {
		e.preventDefault();
		var $this = $(this);
		var role = $this.data('role');
		var permissions = $(".permission-list[data-role='"+role+"']");
		var hideText = $this.find('.hide-text');
		var showText = $this.find('.show-text');
		// console.log(permissions); // for debugging

		// show permission list
		permissions.toggleClass('hidden');

		// toggle the text Show/Hide for the link
		hideText.toggleClass('hidden');
		showText.toggleClass('hidden');
	});
});
</script>
@stop
