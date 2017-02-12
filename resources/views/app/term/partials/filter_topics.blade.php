@if ($topics)
<div class="list-group list-group-root well">
	@foreach($topics as $topic)
		@if($topic->children->count() > 0 AND $child == 'show')
			<a href="{{ route('app.term.topic', $topic->slug, false) }}" class="list-group-item {{ checkActiveRoute(route('app.term.topic', $topic->slug, false), true) }}">
				<i class="fa fa-{{ $topic->icon }} fa-fw"></i>
				{{ $topic->title }}
				<span class="pull-right label label-info label-rounded">{{ $topic->terms_count }}</span>
				<span class="caret"></span>
			</a>
			<div class="list-group">
				@foreach($topic->children as $subtopic)
					@if($subtopic->terms_count > 0)
					<a href="{{ route('app.term.topic', $subtopic->slug, false) }}" class="list-group-item {{ checkActiveRoute(route('app.term.topic', $subtopic->slug, false), true) }}">
						<i class="fa fa-{{ $subtopic->icon }} fa-fw"></i>
						{{ $subtopic->title }}
						<span class="pull-right label label-info label-rounded">{{ $subtopic->terms_count }}</span>
					</a>
					@endif
				@endforeach
			</div>
		@else
			<a href="{{ route('app.term.topic', $topic->slug, false) }}" class="list-group-item {{ checkActiveRoute(route('app.term.topic', $topic->slug, false), true) }}">
				<i class="fa fa-{{ $topic->icon }} fa-fw"></i>
				{{ $topic->title }}
				<span class="pull-right label label-info label-rounded">{{ $topic->terms_count }}</span>
			</a>
		@endif
	@endforeach
</div>
@else
	Nothing.
@endif
