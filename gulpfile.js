const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');


/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
	//.phpUnit()
	//.compressHtml()

	// mix.sass('app.scss')
	// .webpack('app.js')
	mix
		/**
		 * *********************************************************************
		 * IE scripts
		 */
		.scripts([
			'html5shiv.min.js',
			'respond.min.js'
		],'public/js/ie.js')

		/**
		 * *********************************************************************
		 * Common
		 */
		.styles([
			'main.css',
			'global.css',
			'colors.css',
			'box-shadows.css',
			'font-awesome/font-awesome.css',
			'animate.css',
			'layouts/homepage.css',
			'layouts/default-sidebar-1.css',
			'layouts/default-sidebar-2.css',
			'layouts/empty-view-1.css',
			'layouts/empty-view-2.css',
			'layouts/empty-view-3.css',
			'navbars/user-nav.css',
			'color-system/material-design-colors.css',
			'icons/font-awesome.css',
			'icons/flags.css',
			'icons/material-design-icons.css',
			'pages/error.css',
			'ui/alerts.css',
			'ui/badges.css',
			'ui/breadcrumbs.css',
			'ui/buttons.css',
			'ui/cards.css',
			'ui/dropdowns.css',
			'ui/grid.css',
			'ui/images.css',
			'ui/lists.css',
			'ui/modals.css',
			'ui/overlays.css',
			'ui/pagination.css',
			'ui/popovers.css',
			'ui/progress-bars.css',
			'ui/social-media-buttons.css',
			'ui/sweet-alert.css',
			'ui/tabs.css',
			'ui/tags.css',
			'ui/tooltips.css',
			'ui/typography.css'
		],'public/css/common.css')

		.scripts([
			'plugins/jquery/dist/jquery.js',
			'plugins/lodash/dist/lodash.min.js',
			'plugins/modernizr.js',
			'plugins/tether/dist/js/tether.js',
			'plugins/jquery-storage-api/jquery.storageapi.min.js',
			'plugins/mousetrap/mousetrap.js',
			'plugins/bootstrap-material-design/dist/bootstrap-material-design.iife.js',
			'plugins/functions.js',
			'plugins/app.js'
		],'public/js/common.js')

		/**
		 * *********************************************************************
		 * Coming Soon
		 */
		//'plugins/pages/coming-soon.js',

		/**
		 * *********************************************************************
		 * Public Routes
		 */

		// Auth
		.styles([
			'layouts/empty-view-2.css',
			'pages/sign-in.css',
			'pages/sign-up.css',
			'ui/buttons.css',
			'forms/basic.css',
			'forms/checkboxes.css',
			'forms/radios.css',
			'forms/sliders.css',
			'roboto.css',
		],'public/css/actor-user-auth.css')

		// Error
		.styles([
			'layouts/empty-view-1.css',
			'pages/sign-in.css',
			'pages/sign-up.css',
			'pages/error.css',
		],'public/css/actor-user-error.css')

		// Profile
		.styles([
			'user-widgets/user-widget-1.css',
			'user-widgets/user-widget-10.css',
			'user-widgets/user-widget-11.css',
			'user-widgets/user-widget-2.css',
			'user-widgets/user-widget-6.css',
			'user-widgets/user-widget-7.css',
			'user-widgets/user-widget-8.css',
			'user-widgets/user-widget-9.css',
			'text-widgets/text-widget-1.css',
			'text-widgets/text-widget-2.css',
			'text-widgets/text-widget-7.css',
			'activity-widgets/activity-widget-1.css',
			'activity-widgets/activity-widget-3.css',
			'activity-widgets/activity-widget-4.css',
			'activity-widgets/activity-widget-5.css',
			'activity-widgets/activity-widget-6.css',
		],'public/css/actor-user-profile.css')

		/**
		 * *********************************************************************
		 * Authenticated Routes
		 */

		// Email
		.styles([
			// 'email/inbox.css', -- no file
		],'public/css/common-inbox.css')

		// Maps
		.styles([
			'maps/google-maps.css',
			'maps/vector-maps.css',
		],'public/css/common-maps.css')

		/**
		 * *********************************************************************
		 * Registration
		 */
		.styles([
			'../js/plugins/sweetalert2/dist/sweetalert2.css',
			'pages/registration/styles.css'
		], 'public/css/pages/registration/styles.css')

		.scripts([
			'plugins/sweetalert2/dist/sweetalert2.min.js',
			'pages/registration/scripts.js'
		], 'public/js/pages/registration/scripts.js')

		.version([
			'public/css/pages/registration/styles.css',
			'public/js/pages/registration/scripts.js'
		])

		/**
		 * *********************************************************************
		 * Profile
		 */

		// Media
		.styles([
			'jquery-jcrop/jquery.Jcrop.min.css',
			'pages/profile/media/styles.css'
		], 'public/css/profile-media.css')

		.scripts([
			'plugins/jquery-jcrop/jquery.Jcrop.min.js',
			'pages/profile/media/functions.js',
			'pages/profile/media/scripts.js'
		], 'public/js/profile-media.js')

		.version([
			'public/css/profile-media.css',
			'public/js/profile-media.js'
		])

		/**
		 * *********************************************************************
		 * Admin
		 */

		.styles([
			'./node_modules/datatables.net-bs/css/dataTables.bootstrap.css',
			'tables/datatable.css',
			'./node_modules/sweetalert/dist/sweetalert.css'
		], 'public/css/admin.css')

		.scripts([
			'./node_modules/datatables.net/js/jquery.dataTables.js',
			'./node_modules/datatables.net-bs/js/dataTables.bootstrap.js',
			'./node_modules/sweetalert/dist/sweetalert-dev.js'
		], 'public/js/admin.js')

	/*
	 * Master layout assets
	 */

		// Master Styles
		.styles([
			'roboto.css',
			'material-icons.css',
			'font-awesome/font-awesome.css',
			'flag-icon-css.css',
			'main.css',
			'global.css',
			'colors.css',
			'box-shadows.css',
			'animate.css',
			'layouts/homepage.css',
			'layouts/default-sidebar-1.css',
			'left-sidebars/left-sidebar-1.css',
			'navbars/navbar-1.css',
			'right-sidebars/right-sidebar-1.css',
			'helpers/margin.css',
			'helpers/padding.css',
			'helpers/text.css',
			'helpers/border.css',
			'helpers/height.css',
			'helpers/width.css',
			'helpers/other.css',
			'color-system/material-design-colors.css',
			'icons/flags.css',
			'icons/font-awesome.css',
			'icons/weather-icons.css',
			'icons/material-design-icons.css',
			'extras/mousetrap.css',
			'jumbotron/jumbotron-1.css',
			'forms/basic.css',
			'forms/checkboxes.css',
			'forms/radios.css',
			'forms/sliders.css',
			// 'forms/file-uploads.css', -- no file
			'user-widgets/user-widget-1.css',
			'text-widgets/text-widget-1.css',
		],'public/css/master.css')

		// Master Scripts
		.scripts([
			'plugins/jquery/dist/jquery.min.js',
			'plugins/lodash/dist/lodash.min.js',
			'plugins/modernizr.js',
			'plugins/tether/dist/js/tether.js',
			'plugins/jquery-storage-api/jquery.storageapi.min.js',
			'plugins/moment/moment.js',
			'plugins/mousetrap/mousetrap.js',
			'plugins/bootstrap-material-design/dist/bootstrap-material-design.iife.js',
			'plugins/highlight.min.js',
			'plugins/jquery-fullscreen/jquery.fullscreen-min.js',
			'plugins/functions.js',
			'plugins/app.js',
			'plugins/left-sidebar.js',
			'plugins/navbar-1.js',
			'plugins/icons/font-awesome.js',
			'plugins/forms/validation.js',
			// REFACTOR BELOW
			'plugins/charts/peity.js',
			'plugins/charts/chart-js.js',
			'plugins/charts/chartist.js',
			'plugins/charts/morris.js',
			'plugins/charts/nvd3.js',
			'plugins/charts/echarts.js',
			// 'plugins/forms/file-uploads.js', -- no file
			'plugins/maps/vector-maps.js',
			'plugins/maps/google-maps.js',
			'plugins/icons/material-design-icons.js',
			'plugins/icons/flags.js',
			'plugins/icons/ionicons.js',
			'plugins/icons/weather-icons.js',
			'plugins/tables/table-export.js',
			'plugins/tables/datatable.js',
			'plugins/dashboards/geographic.js',
			'plugins/dashboards/analytics.js',
			'plugins/ui/counters.js',
			'plugins/ui/notify.js',
			'plugins/ui/tooltips.js',
			'plugins/ui/popovers.js',
			'plugins/ui/sweet-alert.js',
			'plugins/ui/toastr.js',
			'plugins/charts/easy-pie-chart.js',
			'plugins/editors/summernote.js',
			'plugins/extras/elevate-zoom.js',
			'plugins/extras/syntax-highlighting.js'
		],'public/js/master.js');

	/*
	 * Tools
	 */

		// Copy
		mix.copy('resources/assets/fonts/font-awesome','public/assets/fonts/font-awesome');

		// Version
		mix.version([
			'public/js/ie.js',
			'public/css/common.css',
			'public/js/common.js',
			'public/css/master.css',
			'public/js/master.js',
			'public/css/actor-user-auth.css',
			'public/css/actor-user-error.css',
			'public/css/actor-user-profile.css'
		]);


});
