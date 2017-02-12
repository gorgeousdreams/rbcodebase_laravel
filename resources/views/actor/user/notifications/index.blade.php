@extends('includes.layouts.master')

@section('content')

<div class="panel panel-default">
	<div class="panel-heading no-bg panel-settings">
		<h3 class="panel-title">
			{{ trans('common.allnotifications') }}
		</h3>
	</div>
	<div class="panel-body timeline user-widget-2">
		@if(count($notifications) > 0)
		<div class="list-group">
			@foreach($notifications as $notification)
			<li class="list-group-item row">
				<div class="col-sm-1">
				@if($notification->notified_from)
					{{-- Notify From User --}}
					<a href="{{ route('actor.user.profile.show', $notification->notified_from->name_slug) }}" class="badge badge-50">
						<span class="tag tag-raised tag-rounded tag-info">
							<i class="fa fa-{!! config('log-notifications.types.'. $notification->type .'.icon') !!} icon" style="margin-right: 0px;"></i>
						</span>
						<img src="{{ $notification->notified_from->getPicture() }}" alt="{{ $notification->notified_from->name_slug }}" title="{{ $notification->notified_from->getDisplayName() }}" class="max-w-50 img-circle" alt="badge">
					</a>
				@else
					{{-- Notify From Default Admin --}}
					<a href="{{ route('actor.user.profile.show', $defaultuser->name_slug) }}" class="badge badge-50">
						<span class="tag tag-raised tag-rounded tag-info">
							<i class="fa fa-{!! config('log-notifications.types.'. $notification->type .'.icon') !!} icon" style="margin-right: 0px;"></i>
						</span>
						<img src="{{ $defaultuser->getPicture() }}" alt="{{ $defaultuser->name_slug }}" title="{{ $defaultuser->getDisplayName() }}" class="max-w-50 img-circle" alt="badge">
					</a>
				@endif
				</div>
				<div class="bmd-list-group-col col-sm-9">
					<p class="list-group-item-heading">{{ $notification->type }}</p>
					<p class="list-group-item-text">
						@if($notification->link)
						<a href="{{ $notification->link }}">{{ str_limit($notification->text, 250) }}</a>
						@else
						{{ str_limit($notification->text, 250) }}
						@endif
					</p>
				</div>
				<a href="#" data-notification-id="{{ $notification->id }}" class="notification-delete col-sm-1">
					<span class="trash-icon bg-danger"><i class="pull-xs-right fa fa-dot-circle-o icon color-info" aria-hidden="true"></i></span>
				</a>
			</li>
			@endforeach
		</div>
		@else
		<div class="alert alert-warning">{{ trans('messages.no_notifications') }}</div>
		@endif
		<div class="pagination-holder">
			{{ $notifications->render() }}
		</div>
	</div>
</div>

@endsection
