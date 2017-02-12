
			<nav class="navbar-1">
				<ul class="nav nav-inline navbar-left">
					<div class="logo">
						<a href="#" class="text">
							<span>{{ app_name() }}</span>
						</a>
					</div>
				</ul>

				@include('includes.partials.nav_user')
			</nav>
			<div class="jumbotron-1">
					<div class="jumbotron jumbotron-fluid">
						<div class="container-fluid">
							<h1 class="display-3">Welcome</h1>
							{!! Breadcrumbs::show() !!}

							<button type="button" class="btn btn-primary bmd-btn-fab" data-toggle="dropdown">
							<i class="fa fa-ellipsis-v"></i>
						</button>
							<div class="dropdown-menu dropdown-menu-right from-right">
								<a class="dropdown-item" href="#">
									<i class="material-icons icon">email</i>
									<span class="title">Inbox</span>
									<span class="tag tag-pill tag-raised tag-danger tag-xs">New</span>
								</a>
								<a class="dropdown-item" href="#">
									<i class="material-icons icon">grade</i>
									<span class="title">Messages</span>
									<span class="tag tag-outline-primary tag-rounded tag-xs">5</span>
								</a>
								<a class="dropdown-item" href="#">
									<i class="material-icons icon">settings</i>
									<span class="title">Profile</span>
								</a>
								<a class="dropdown-item" href="#">
									<i class="material-icons icon">alarm</i>
									<span class="title">Lock screen</span>
								</a>
								<a class="dropdown-item" href="#">
									<i class="material-icons icon">power_settings_new</i>
									<span class="title">Logout</span>
								</a>
							</div>
						</div>
					</div>
				</div>
