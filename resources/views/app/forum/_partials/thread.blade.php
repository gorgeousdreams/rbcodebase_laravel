@if($thread)
<div class="col-xs-12">
	<div class="media">
		<a href="{{ route('actor.user.profile.show', $thread->user->name_slug) }}" title="{{ $thread->user->full_name }}" class="media-left">
			<img class="media-object img-circle h-40 w-40" alt="{{ $thread->user->full_name }}" src="{{ gravatar()->get($thread->user->email) }}">
		</a>
		<div class="media-body">
			<h5><a href="{{ route('app.forum.thread', array($topic->slug, $thread->slug)) }}"><strong>{{ $thread->title }}</strong></a></h5>
			<p class="text-muted"><small><em>Posted by <a href="{{ route('actor.user.profile.show', $thread->user->name_slug) }}" title="{{ $thread->user->full_name }}">{{ $thread->user->full_name }}</a> {{ $thread->created_at->diffForHumans() }}</em></small></p>
		</div>
	</div>
</div>
@endif
