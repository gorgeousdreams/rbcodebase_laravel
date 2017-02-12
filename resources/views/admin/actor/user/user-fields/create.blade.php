@extends('includes.layouts.admin')

@section('content')

	{!! Form::open(['route' => 'admin.actor.user.fields.store', 'method' => 'post', 'class' => 'forms-basic', 'role' => 'form']) !!}
	<div class="row">
		<div class="col-md-12 col-xs-12">
			<h3>New User Field</h3>
		</div>

		<fieldset class="form-group col-md-12">
			{!! Form::label('role_id', 'Assign to Role') !!}
			{!! Form::select('role_id', \App\Models\Actor\User\Role::pluck('title', 'id'), null, ['class' => 'form-control']) !!}
		</fieldset>


		<fieldset class="form-group col-md-12">
			{!! Form::label('type', 'Type') !!}
			<select name="type" v-model="type" class="form-control" @change="setType()">
				<option value="">-- Select --</option>
				@foreach(\App\Models\Actor\User\UserField::types() as $key => $value)
				<option value="{{ $key }}" {{ old('type') == $key ? 'selected' : '' }}>{{ $value }}</option>
				@endforeach
			</select>
		</fieldset>

		<fieldset class="form-group col-md-12">
			{!! Form::label('title', 'Title') !!}
			{!! Form::text('title', null, ['class' => 'form-control', 'placeholder' => 'Title']) !!}
		</fieldset>

		{{ Form::hidden('visibility', null) }}
		{{-- @TODO: Restore
		<fieldset class="form-group col-md-12" v-show="type">

			<div v-if="textbox">
				{!! Form::label('value', 'Value') !!}
				{!! Form::text('value', null, ['class' => 'form-control', 'placeholder' => 'Value']) !!}
			</div>

			<div v-if="textarea">
				{!! Form::label('value', 'Value') !!}
				{!! Form::textarea('value', null, ['class' => 'form-control', 'placeholder' => 'Value']) !!}
			</div>

			<div v-if="dropdown">
				{!! Form::label('value', 'Values') !!}
				<span class="pull-right"><i class="fa fa-plus" @click="addValue()"></i></span>
				<div class="form-group" v-for="value in value" track-by="$index">
					<div class="input-group">
						<input name="value[]" type="text" class="form-control" v-model="value">
						  <span class="input-group-btn">
							<button class="btn btn-danger" type="button" @click="removeValue(value)">
							  <i class="icon fa fa-minus"></i>
							</button>
						  </span>
					</div>
				</div>
			</div>

		</fieldset>
		--}}

		<fieldset class="form-group col-md-12">
			{!! Form::label('visibility', 'Visibility') !!}
			{!! Form::select('visibility', \App\Models\Actor\User\UserField::visibilities(), null, ['class' => 'form-control']) !!}
		</fieldset>

		{{ Form::hidden('order', 1) }}
		{{--
		<fieldset class="form-group col-md-12">
			{!! Form::label('order', 'Order') !!}
			{!! Form::text('order', null, ['class' => 'form-control', 'placeholder' => 'Order']) !!}
		</fieldset>
		--}}

		<fieldset class="form-group col-md-12">
			<div class="pull-left">
				<a href="{{route('admin.actor.user.fields.index')}}" class="btn btn-danger btn-xs">{{ trans('buttons.general.cancel') }}</a>
			</div>

			<div class="pull-right">
				<input type="submit" class="btn btn-success btn-xs" value="{{ trans('buttons.general.crud.create') }}" />
			</div>
			<div class="clearfix"></div>
		</fieldset>
	</div>
	{!! Form::close() !!}

@endsection

@section('navigation-circle')
	@include('admin.actor.user._partials.nav-users')
@stop

@section('after-scripts-end')
	<script>
		new Vue({
			el: 'body',

			data: {
				type: '',
				value: []
			},

			computed: {
				textbox: function() {
					return this.isType(1);
				},

				textarea: function() {
					return this.isType(2);
				},

				dropdown: function() {
					return this.isType(3) || this.isType(4);
				}
			},

			methods: {
				isType: function(type) {
					return this.type == type;
				},

				setType: function () {
					if (this.textbox || this.textarea) {
						this.value = '';
					} else if (this.dropdown) {
						this.value = [];
						this.addValue();
					}
				},

				addValue: function () {
					this.value.push('');
				},

				removeValue: function (value) {
					this.value.$remove(value);
				}
			}
		});
	</script>
@endsection
