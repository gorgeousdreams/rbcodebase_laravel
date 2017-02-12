<div class="left-sidebar-1">
	<div class="wrapper">
		<div class="content">
			<div class="logo">
				<a href="{{ route('common.dashboard') }}" class="text"><span>{{ app_name() }}</span></a>
			</div>

			<div class="left-sidebar-section">
				<div class="section-title">{{ trans('menus.backend.sidebar.general') }}</div>
				<ul class="list-unstyled" id="nav-dashboards">
					<li>
						<a href="{{ route('admin.dashboard') }}" class="btn btn-flat {{ checkActiveRoute(route('admin.dashboard', [], false)) }}">
							<i class="fa fa-dashboard"></i>
							<span class="btn-title">{{ trans('menus.backend.sidebar.dashboard') }}</span>
						</a>
					</li>
				</ul>
			</div>

			<div class="left-sidebar-section">
				<div class="section-title">Actors</div>
				@permission('manage-users')
				<ul class="list-unstyled" id="nav-users">
					<li>
						<button class="btn btn-flat" data-toggle="{{ checkActiveRoute(route('admin.actor.user.manage.index', [], false), true, 'collapsed', 'collapse') }}" data-parent="#nav-users" data-target="#users">
							<span class="btn-title">Users</span>
							<i class="fa fa-users"></i>
							<i class="pull-right fa fa-caret-down"></i>
						</button>
						<div class="collapse {{ checkActiveRoute(route('admin.actor.user.manage.index', [], false), true, 'in') }}" id="users" aria-expanded="true">
							<ul class="list-unstyled">
								<li>
									<a href="{{ route('admin.actor.user.manage.index') }}" class="btn btn-flat {{ checkActiveRoute(route('admin.actor.user.manage.index', [], false)) }}">
										<span class="title">{{ trans('menus.backend.access.users.all') }}</span>
									</a>
								</li>
								<li>
									<a href="{{ route('admin.actor.user.manage.create') }}" class="btn btn-flat {{ checkActiveRoute(route('admin.actor.user.manage.create', [], false)) }}">
										<span class="title">{{ trans('menus.backend.access.users.create') }}</span>
									</a>
								</li>
								<li>
									<a href="{{ route('admin.actor.user.manage.deactivated') }}" class="btn btn-flat {{ checkActiveRoute(route('admin.actor.user.manage.deactivated', [], false)) }}">
										<span class="title">{{ trans('menus.backend.access.users.deactivated') }}</span>
									</a>
								</li>
								<li>
									<a href="{{ route('admin.actor.user.manage.deleted') }}" class="btn btn-flat {{ checkActiveRoute(route('admin.actor.user.manage.deleted', [], false)) }}">
										<span class="title">{{ trans('menus.backend.access.users.deleted') }}</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
				</ul>
				@endauth
				@permission('manage-roles')
				<ul class="list-unstyled" id="nav-roles">
					<li>
						<button class="btn btn-flat" data-toggle="{{ checkActiveRoute(route('admin.actor.user.role.index', [], false), true, 'collapsed', 'collapse') }}" data-parent="#nav-roles" data-target="#roles">
							<span class="btn-title">Roles</span>
							<i class="fa fa-tasks"></i>
							<i class="pull-right fa fa-caret-down"></i>
						</button>
						<div class="collapse {{ checkActiveRoute(route('admin.actor.user.role.index', [], false), true, 'in') }} {{ checkActiveRoute(route('admin.actor.user.fields.index', [], false), true, 'in') }}" id="roles" aria-expanded="true">
							<ul class="list-unstyled">
								<li>
									<a href="{!! route('admin.actor.user.role.index') !!}" class="btn btn-flat {{ checkActiveRoute(route('admin.actor.user.role.index', [], false)) }}">
										<span class="title"> {{ trans('menus.backend.access.roles.all') }}</span>
									</a>
								</li>
								<li>
									<a href="{!! route('admin.actor.user.fields.index') !!}" class="btn btn-flat {{ checkActiveRoute(route('admin.actor.user.fields.index', [], false)) }}">
										<span class="title"> User Fields</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
				</ul>
				@endauth

					{{--
					@permission('view-brand-management')
					<ul class="list-unstyled" id="nav-brands">
						<li class="{{ Active::pattern('admin/actor/brands*') }} {{ checkActiveRoute(route('admin.actor.user.fields.index', [], false), true) }}">
							<button class="btn btn-flat collapsed" data-toggle="collapse" data-parent="#nav-brands" data-target="#brands">
								<span class="tag tag-rounded tag-danger tag-sm">5</span>
								<span class="btn-title">Brands</span>
								<i class="material-icons pull-left icon">business</i>
								<i class="pull-right fa fa-caret-down"></i>
							</button>
							<div class="collapse" id="brands">
								<ul class="list-unstyled">
									<li class="{{ Active::pattern('admin/actor/user*') }}">
										<a class="sideline" data-id="brand-viewer" data-click="toggle-section"> <i class="pull-right fa fa-caret-down icon-dashboards"></i>  <i class="zmdi zmdi-card-membership md-icon pull-left"></i>  <span class="title"> {{ trans('menus.admin.brand.title') }}</span></a>
										<ul class="list-unstyled section-brand-viewer l2 {{ Active::pattern('admin/actor/brand*') }}">
											<li class="{{ Active::pattern(route('admin.actor.brand.manage.index')) }}">
												<a href="{!! route('admin.actor.brand.manage.index') !!}" class="sideline"> <span class="title"> Brand</span></a>
											</li>
											<li class="{{ Active::pattern(route('admin.actor.brand.subscriptions.index')) }}">
												<a href="{!! route('admin.actor.brand.subscriptions.index') !!}" class="sideline"> <span class="title"> Subscriptions</span></a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
					</ul>
					@endauth
					--}}
			</div>

			<div class="left-sidebar-section">
				<div class="section-title">Common</div>

					{{--
					<ul class="list-unstyled" id="nav-users">
						<li class="{{ Active::pattern('admin/actor/user*') }}">
							<button class="btn btn-flat collapsed" data-toggle="collapse" data-parent="#nav-users" data-target="#users">
								<span class="tag tag-rounded tag-danger tag-sm">5</span>
								<span class="btn-title">Email</span>
								<i class="material-icons pull-left icon">settings</i>
								<i class="pull-right fa fa-caret-down"></i>
							</button>
							<div class="collapse" id="users">
								<ul class="list-unstyled">
									<li class="{{ Active::pattern('admin/common/mail*') }}">
										<a class="sideline" data-id="mail" data-click="toggle-section"> <i class="pull-right fa fa-caret-down icon-dashboards"></i>  <i class="zmdi zmdi-email md-icon pull-left"></i>  <span class="title">{{ trans('menus.admin.mail.main') }}</span></a>
										<ul class="list-unstyled section-mail l2 {{ Active::pattern('admin/mail/*') }}">
											<li class="{{ Active::pattern(route('admin.common.mail.template')) }}">
												<a href="{!! route('admin.common.mail.template') !!}" class="btn btn-flat"> <span class="title"> {{ trans('menus.admin.mail.templates') }}</span></a>
											</li>
											<li class="{{ Active::pattern(route('admin.common.mail.logs.list')) }}">
												<a href="{!! route('admin.common.mail.logs.list') !!}" class="btn btn-flat"> <span class="title"> {{ trans('menus.admin.mail.logs') }}</span></a>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
					</ul>
					--}}

					<ul class="list-unstyled" id="nav-logs">
						<li>
							<button class="btn btn-flat" data-toggle="{{ checkActiveRoute(route('admin.common.logs.dashboard', [], false), true, 'collapsed', 'collapse') }}" data-parent="#nav-logs" data-target="#logs">
								<span class="btn-title">Logs</span>
								<i class="fa fa-area-chart"></i>
								<i class="pull-right fa fa-caret-down"></i>
							</button>
							<div class="collapse {{ checkActiveRoute(route('admin.common.logs.dashboard', [], false), true, 'in') }}" id="logs">
								<ul class="list-unstyled">
									<li class="{{ checkActiveRoute(route('admin.common.logs.dashboard', [], false)) }}">
										<a href="{{ route('admin.common.logs.dashboard') }}" class="btn btn-flat">
											<span class="title"> Overview</span>
										</a>
									</li>
									<li class="{{ checkActiveRoute(route('admin.common.logs.list', [], false)) }}">
										<a href="{{ route('admin.common.logs.list') }}" class="btn btn-flat">
											<span class="title"> Logs</span>
										</a>
									</li>
								</ul>
							</div>
						</li>
					</ul>

				</ul>
			</div>
			<div class="left-sidebar-section p-b-50">

			</div>


		</div>
	</div>
</div>
