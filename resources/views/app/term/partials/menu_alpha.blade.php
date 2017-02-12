<!-- Nav tabs -->
<?php
$path = Request::path();
if ($path == 'glossary' || substr($path, 9, 6) == 'search') {
	$current = 'all';
} else {
	$current = substr($path, strrpos($path, '/')+1, 1);
}
?>
<ul class="nav nav-tabs hidden-md-down" role="tablist">
	<li class="nav-item">
		<a class="nav-link <?php if($current == 'all') { echo 'active'; } ?>" href="{{ route('app.term.index') }}">All</a>
	</li>
	<li class="nav-item">
		<a class="nav-link <?php if(is_numeric($current)) { echo 'active'; } ?>" href="{{ route('app.term.index') }}#num">0-9</a>
	</li>
	@foreach(range('a','z') as $i)
	<li class="nav-item alphabet">
		<a class="nav-link <?php if($i == $current) { echo 'active'; } ?>" href="{{ route('app.term.index') }}#{{ $i }}">{{ strtoupper($i) }}</a>
	</li>
	@endforeach
</ul>
