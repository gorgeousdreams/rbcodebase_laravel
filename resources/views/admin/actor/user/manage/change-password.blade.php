@extends ('includes.layouts.admin')

@section('content')
<div class="col-xs-12">
	{!! Form::open(['route' => ['admin.actor.user.manage.change-password', $user->id], 'class' => 'form-horizontal', 'role' => 'form', 'method' => 'post']) !!}

		<div class="box">

			<div class="box-body">

				<div class="form-group">
					{!! Form::label('password', trans('validation.attributes.backend.access.users.password'), ['class' => 'col-lg-2 control-label', 'placeholder' => trans('validation.attributes.backend.access.users.password')]) !!}
					<div class="col-lg-10">
						{!! Form::password('password', ['class' => 'form-control']) !!}
					</div>
				</div><!--form control-->

				<div class="form-group">
					{!! Form::label('password_confirmation', trans('validation.attributes.backend.access.users.password_confirmation'), ['class' => 'col-lg-2 control-label', 'placeholder' => trans('validation.attributes.backend.access.users.password_confirmation')]) !!}
					<div class="col-lg-10">
						{!! Form::password('password_confirmation', ['class' => 'form-control']) !!}
					</div>
				</div><!--form control-->

			</div><!-- /.box-body -->
		</div><!--box-->

		<div class="box">
			<div class="box-body">
				<div class="pull-left">
					<a href="{{route('admin.actor.user.manage.index')}}" class="btn btn-danger btn-xs">{{ trans('buttons.general.cancel') }}</a>
				</div>

				<div class="pull-right">
					<input type="submit" class="btn btn-success btn-xs" value="{{ trans('buttons.general.crud.update') }}" />
				</div>
				<div class="clearfix"></div>
			</div><!-- /.box-body -->
		</div><!--box-->

	{!! Form::close() !!}
</div>
@stop

@section('navigation-circle')
	@include('admin.actor.user._partials.nav-users')
@stop
