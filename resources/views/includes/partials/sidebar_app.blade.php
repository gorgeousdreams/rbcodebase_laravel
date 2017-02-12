<div class="left-sidebar-1">
	<div class="wrapper">
		<div class="content">
			<div class="logo">
			@if(Auth::guest())
				<a href="{{ route('marketing.index') }}" class="text"><span>{{ app_name() }}</span></a>
			@else
				<a href="{{ route('common.dashboard') }}" class="text"><span>{{ app_name() }}</span></a>
			@endif
			</div>
			@if(config('actor.team.enable'))
				@include('includes.partials.nav_team')
			@endif

			@include('includes.partials.nav_search')

			<div class="left-sidebar-section">
				<div class="section-title">Section 1</div>
				<ul class="list-unstyled" id="section1">
					<li>
						<button class="btn btn-flat collapsed" data-toggle="collapse" data-parent="#section1" data-target="#dashboards">
							<span class="tag tag-rounded tag-danger tag-sm">5</span>
							<span class="btn-title">Dropdown 1</span>
							<i class="material-icons pull-left icon">dashboard</i>
							<i class="pull-right fa fa-caret-down"></i>
						</button>
						<div class="collapse" id="dashboards">
							<ul class="list-unstyled">
								<li>
									<a href="#" class="btn btn-flat">
										<span class="title">Link 1</span>
									</a>
								</li>
								<li>
									<a href="#" class="btn btn-flat">
										<span class="title">Link 2</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>

		</div>
	</div>
</div>
