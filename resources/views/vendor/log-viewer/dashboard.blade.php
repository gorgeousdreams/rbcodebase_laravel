@extends('includes.layouts.admin')

@section('after-styles-end')
	<style>
		/* Log level labels & progress bars */
		.label-env {
			padding: 2px 6px;
			background-color: #6A1B9A;
			font-size: .85em;
		}

		span.level {
			padding: 2px 6px;
			text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
			border-radius: 2px;
			font-size: .9em;
			font-weight: 600;
		}

		.progress {
			margin-bottom: 10px;
		}

		.progress-bar,
		span.level,
		span.level i {
			color: #FFF;
		}

		span.level.level-empty {
			background-color: {{ log_styler()->color('empty') }};
		}

		.progress-bar.level-all,
		span.level.level-all,
		.badge.level-all {
			background-color: {{ log_styler()->color('all') }};
		}

		.progress-bar.level-emergency,
		span.level.level-emergency,
		.badge.level-emergency {
			background-color: {{ log_styler()->color('emergency') }};
		}

		.progress-bar.level-alert,
		span.level.level-alert,
		.badge.level-alert {
			background-color: {{ log_styler()->color('alert') }};
		}

		.progress-bar.level-critical,
		span.level.level-critical,
		.badge.level-critical {
			background-color: {{ log_styler()->color('critical') }};
		}

		.progress-bar.level-error,
		span.level.level-error,
		.badge.level-error {
			background-color: {{ log_styler()->color('error') }};
		}

		.progress-bar.level-warning,
		span.level.level-warning,
		.badge.level-warning {
			background-color: {{ log_styler()->color('warning') }};
		}

		.progress-bar.level-notice,
		span.level.level-notice,
		.badge.level-notice {
			background-color: {{ log_styler()->color('notice') }};
		}

		.progress-bar.level-info,
		span.level.level-info,
		.badge.level-info {
			background-color: {{ log_styler()->color('info') }};
		}

		.progress-bar.level-debug,
		span.level.level-debug,
		.badge.level-debug {
			background-color: {{ log_styler()->color('debug') }};
		}
	</style>
@endsection

@section('content')

	<h2>
		Log Viewer
	</h2>
<div class="col-xs-12">
	<div class="row">
		<div class="col-md-3">
			<canvas id="stats-doughnut-chart" height="300"></canvas>
		</div>
		<div class="col-md-9">
			<section class="box-body">
				<div class="row">
					@foreach($percents as $level => $item)
						<div class="col-md-4">
							<div class="info-box level level-{{ $level }} {{ $item['count'] === 0 ? 'level-empty' : '' }}">
								<span class="info-box-icon">
									{!! log_styler()->icon($level) !!}
								</span>

								<div class="info-box-content">
									<span class="info-box-text">{{ $item['name'] }}</span>
									<span class="info-box-number">
										{{ $item['count'] }} entries - {!! $item['percent'] !!} %
									</span>
									<div class="progress">
										<div class="progress-bar" style="width: {{ $item['percent'] }}%"></div>
									</div>
								</div>
							</div>
						</div>
					@endforeach
				</div>
			</section>
		</div>
	</div>
</div>
@endsection

@section('after-scripts-end')
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
	<script>
		Chart.defaults.global.responsive      = true;
		Chart.defaults.global.scaleFontFamily = "'Source Sans Pro'";
		Chart.defaults.global.animationEasing = "easeOutQuart";

		$(function() {
			var data = {!! $reports;; !!};

			new Chart($('#stats-doughnut-chart')[0].getContext('2d'))
				.Doughnut(data, {
					animationEasing : "easeOutQuart"
				});
		})
	</script>
@stop
