@extends('includes.layouts.master')

@section('content')
<div class="col-xs-12">
	<div class="row">
		<div class="col-lg-8">

			<div class="panel panel-default">
				<div class="panel-heading">Create a new team</div>
				<div class="panel-body">
					<form class="form-horizontal" method="post" action="{{route('actor.team.store')}}">
						{!! csrf_field() !!}

						<div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
							<label class="col-md-4 control-label">Name</label>

							<div class="col-md-6">
								<input type="text" class="form-control" name="name" value="{{ old('name') }}">

								@if ($errors->has('name'))
									<span class="help-block">
									<strong>{{ $errors->first('name') }}</strong>
								</span>
								@endif
							</div>
						</div>


						<div class="form-group">
							<div class="col-md-6 col-md-offset-4">
								<button type="submit" class="btn btn-primary">
									<i class="fa fa-btn fa-save"></i>Save
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>

		</div>
		<div class="col-lg-4">
			@include('actor.team._partials.sidebar')
		</div>
	</div>
</div>

@endsection
