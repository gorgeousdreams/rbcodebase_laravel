	<button type="button" class="btn btn-primary bmd-btn-fab" data-toggle="dropdown">
		<i class="fa fa-ellipsis-v"></i>
	</button>
	<div class="dropdown-menu dropdown-menu-right from-right">
	@permission('manage-users')
		<a class="dropdown-item" href="{{ route('admin.actor.user.manage.index') }}">
			<i class="material-icons icon">person_pin</i>
			<span class="title">{{ trans('labels.backend.access.users.active') }}</span>
		</a>
		@permission('create-users')
		<a class="dropdown-item" href="{{ route('admin.actor.user.manage.index') }}">
			<i class="material-icons icon">person_add</i>
			<span class="title">{{ trans('menus.backend.access.users.create') }}</span>
		</a>
		@endauth
		<a class="dropdown-item" href="{{ route('admin.actor.user.manage.deactivated') }}">
			<i class="material-icons icon">person_pin</i>
			<span class="title">{{ trans('menus.backend.access.users.deactivated') }}</span>
		</a>
		<a class="dropdown-item" href="{{ route('admin.actor.user.manage.deleted') }}">
			<i class="material-icons icon">person_pin</i>
			<span class="title">{{ trans('menus.backend.access.users.deleted') }}</span>
		</a>
		<a class="dropdown-item" href="{!! route('admin.actor.user.role.index') !!}">
			<i class="material-icons icon">perm_data_setting</i>
			<span class="title">{{ trans('menus.backend.access.roles.all') }}</span>
		</a>
		<a class="dropdown-item" href="{!! route('admin.actor.user.fields.index') !!}">
			<i class="material-icons icon">person_outline</i>
			<span class="title">User Fields</span>
		</a>
	@endauth
	</div>
