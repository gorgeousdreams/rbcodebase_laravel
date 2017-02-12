<div class="activity-widget-1">
	<ul class="timeline list-group">
		@each('admin.history.partials.item', $history, 'historyItem')
	</ul>
</div>

@if ($paginate)
	<div class="pull-right">
		{{ $history->links() }}
	</div><!--pull-right-->

	<div class="clearfix"></div>
@endif
