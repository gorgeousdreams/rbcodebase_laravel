@extends('includes.layouts.master')

@section('after-styles-end')
	<link rel="stylesheet" type="text/css" href="{{ elixir('css/actor-user-profile.css') }}">
@endsection

@section('content')

	<div class="col-xs-12">
		<div class="row">
			<div class="col-lg-8">

				<div class="m-b-40">
					<div class="user-widget-6 bg">
						<div class="row">
							<div class="col-xs-12">

								<div class="badge badge-100">
									@if($user->isVerified())
									<span class="tag tag-sm tag-rounded tag-success">
										<i class="fa fa-check"></i>
									</span>
									@endif
									<img class="img-circle h-100 w-100" src="{!! $user->getPicture() !!}" alt="{{ $user->getDisplayName() }}" />
								</div>

								<h5>{!! $user->getDisplayName() !!}</h5>
								<p>
								{{ trans('labels.frontend.user.profile.created_at') }} {!! $user->created_at->diffForHumans() !!}<br />
								{{ trans('labels.frontend.user.profile.last_updated') }} {!! $user->updated_at->diffForHumans() !!}
								<p><i class="fa fa-envelope-o color-dark"></i> <span class="color-dark">{!! $user->email !!}</span> </p>
								<p><i class="fa fa-link color-dark"></i> @<span class="color-dark">{!! $user->name_slug !!}</span> </p>

								@foreach (array_keys(config('social.services')) as $service)
									<div class="m-t-10">
									@if (access()->user()->hasProvider($service))
										<a href="#{{-- @TODO: Add Link --}}" class="btn btn-{{ $service }} btn-raised">
											<i class="fa fa-{{ $service }} fa-fw"></i>
											<!-- span class="btn-text">{{ $service }}</span -->
											<div class="ripple-container"></div>
										</a>
									@endif
									</div>
								@endforeach

								@if(!empty($roles))
									<h3>Roles</h3>
									@foreach($roles as $role)
										{!! $role->title !!}<br />
									@endforeach
								@endif

								@if(!empty($usermeta) && $usermeta->count())
									<h3>Custom Meta:</h3>
									@foreach($usermeta as $fields)
										{!! $fields->title !!}: {!! isset($fields->meta->value) ? $fields->meta->value : '<em>Not Supplied</em>' !!}<br />
									@endforeach
								@endif
								</p>
							</div>
						</div>
					</div>
				</div>

			</div>
			<div class="col-lg-4">
				@include('actor.user._partials.sidebar')
			</div>
		</div>
	</div>

@endsection
