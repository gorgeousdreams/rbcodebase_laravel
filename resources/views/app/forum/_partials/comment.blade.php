@foreach($comments as $comment)

	<div class="media">
		<a class="media-left">
			<img class="media-object img-circle h-40 w-40" alt="{{ $comment->user->full_name }}" src="{{ gravatar()->get($comment->user->email) }}">
		</a>
		<div class="media-body">
			{{ $comment->text }}
			@if (Auth::check())
			<a class="pull-right" data-toggle="collapse" href="#commentBox{{ $comment->id }}" aria-expanded="false" aria-controls="commentBox{{ $comment->id }}">
				<i class="fa fa-reply"></i> Reply
			</a>
			@endif
			<p class="text-muted"><small><em>Posted by <a href="{{ route('actor.user.profile.show', $comment->user->name_slug) }}">{{ $comment->user->full_name }}</a> {{ $comment->created_at->diffForHumans() }}</em></small></p>
		</div>
		<div class="collapse" id="commentBox{{ $comment->id }}">
			<div class="card card-block">
				{!! Form::open(['route' => 'app.forum.thread.comment']) !!}

					{!! Form::hidden('forum_thread_id', $thread->id) !!}
					{!! Form::hidden('comment_id', $comment->id) !!}

					<!--- Text Field --->
					<div class="form-group">
						{!! Form::textarea('text', null, ['class' => 'form-control', 'placeholder' => 'Write your comment...']) !!}
					</div>

					<!--- Start the Conversation Field --->
					<div class="form-group">
						{!! Form::submit('Post your comment', ['class' => 'btn btn-primary btn-lg btn-block m-t-20']) !!}
					</div>
				{!! Form::close() !!}
			</div>
		</div>
	</div>

	@if ($comment->comments->count())
		<div class="p-l-40">
			@include('app.forum._partials.comment', ['comments' => $comment->comments])
		</div>
	@endif

@endforeach
