@if($users)
@foreach($users as $user)
<div class="media">
	<a href="{{ route('actor.user.profile.show', $user->name_slug) }}" class="media-left media-middle">
		<img class="media-object img-circle h-40 w-40" alt="{{ $user->getDisplayName() }}" src="{{ gravatar()->get($user->email) }}">
	</a>
	<div class="media-body">
		<h5 class="m-b-5 media-heading"><a href="{{ route('actor.user.profile.show', $user->name_slug) }}">{{ $user->getDisplayName() }}</a></h5>
		<p class="m-b-5"><small><em>Last active on @TODO:</em></small></p>
	</div>
	<div class="media-left media-middle">
		{{ $user->contributions }}
	</div>
</div>
@endforeach
@endif
