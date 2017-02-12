@extends('includes.layouts.master')

@section('content')

<div class="col-xs-12">
	<div class="row">
		<div class="search-form m-b-20">
			{!! Form::open(array('route' => 'search')) !!}
				<div class="input-group">
					<input type="text" class="form-control form-control-lg" placeholder="Enter a search term" name="query">
					<div class="input-group-addon"><i class="fa fa-search p-l-10 p-r-10"></i></div>
				</div>
			{!! Form::close() !!}
		</div>
	</div>
</div>

@endsection
