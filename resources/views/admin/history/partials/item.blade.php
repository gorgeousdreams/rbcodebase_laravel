<li class="list-group-item">
	<i class="fa fa-{{ $historyItem->icon }} {{ $historyItem->class }}"></i>
	<div class="bmd-list-group-col">
		<p class="list-group-item-heading">{{ history()->renderDescription($historyItem->text, $historyItem->assets) }}</p>
		<p class="list-group-item-text m-b-5">{{ $historyItem->created_at->diffForHumans() }} by {{ $historyItem->user->getDisplayName() }}</p>
	</div>
</li>
