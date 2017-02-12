@extends('includes.layouts.master')

@section('content')

<div class="container m-t-30">
	<div class="row">
		<div class="col-md-8">

			<h1 class="m-b-20"><i class="fa {{ $topic->icon }}"></i> {{ $topic->calltoaction }}</h1>
			<hr />

			{!! Form::open(['route' => 'app.forum.thread.store']) !!}

				{!! Form::hidden('topic_id', $topic->id) !!}

				@if(count(auth()->user()->brands))
				<!--- Brand id Field --->
				<div class="form-group">
					{!! Form::label('brand_id', 'Brand:') !!}
					{!! Form::select('brand_id', ['' => '-- Select --'] + auth()->user()->brands->pluck('title', 'id')->toArray(), null, ['class' => 'form-control']) !!}
				</div>
				@endif

				<!--- Title Field --->
				<div class="form-group">
					{!! Form::label('title', 'Title:') !!}
					{!! Form::text('title', null, ['class' => 'form-control']) !!}
				</div>

				<!--- Text Field --->
				<div class="form-group">
					{!! Form::label('text', 'Text:') !!}
					{!! Form::textarea('text', null, ['class' => 'form-control']) !!}
				</div>

				<!--- Start the Conversation Field --->
				<div class="form-group">
					{!! Form::submit('Start the Conversation', ['class' => 'btn btn-info btn-lg btn-block m-t-20']) !!}
				</div>
			{!! Form::close() !!}

		</div>
		<div class="col-md-4">


			<div class="card">
				<h3 class="card-header">Tips</h3>
				<div class="card-block">
					@TODO: INSERT LIVE
				</div>
			</div>


		</div>
	</div>
</div>
@endsection
