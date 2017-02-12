{!! Form::open(array('route' => 'search', 'id' => 'autocomplete', 'class' => 'form-inline navbar-form')) !!}
	<input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}">
	<input id="forum_query" name="query" class="form-control" type="text" placeholder="Enter Term..." autocomplete="off" />
	<button type="submit" class="btn btn-warning">Search</button>
{!! Form::close() !!}
