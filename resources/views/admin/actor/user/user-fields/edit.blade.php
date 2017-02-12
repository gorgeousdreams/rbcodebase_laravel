@extends('includes.layouts.admin')

@section('content')

	{!! Form::model($field, ['route' => ['admin.actor.user.fields.update', $field->id], 'class' => 'forms-basic', 'role' => 'form', 'method' => 'post']) !!}
		<div class="row">
			<div class="col-md-12 col-xs-12">
				<h3>Edit User Field</h3>
			</div>

			<fieldset class="form-group col-md-12">
				{!! Form::label('type', 'Type') !!}
				<select name="type" v-model="type" class="form-control" @change="setType()">
					<option value="">-- Select --</option>
					@foreach(\App\Models\Actor\User\UserField::types() as $key => $value)
						<option value="{{ $key }}" {{ ($field->type == $key) ? 'selected' : '' }}>{{ $value }}</option>
					@endforeach
				</select>
			</fieldset>

			<fieldset class="form-group col-md-12">
				{!! Form::label('title', 'Title') !!}
				{!! Form::text('title', null, ['class' => 'form-control', 'placeholder' => 'Title']) !!}
			</fieldset>

			<fieldset class="form-group col-md-12">
				{!! Form::label('visibility', 'Visibility') !!}
				{!! Form::select('visibility', \App\Models\Actor\User\UserField::visibilities(), null, ['class' => 'form-control']) !!}
			</fieldset>

			<fieldset class="form-group col-md-12">
				{!! Form::label('order', 'Order') !!}
				{!! Form::text('order', null, ['class' => 'form-control', 'placeholder' => 'Order']) !!}
			</fieldset>

			<fieldset class="form-group col-md-12">
				<div class="pull-left">
					<a href="{{route('admin.actor.user.fields.index')}}" class="btn btn-danger btn-xs">{{ trans('buttons.general.cancel') }}</a>
				</div>

				<div class="pull-right">
					<input type="submit" class="btn btn-success btn-xs" value="{{ trans('buttons.general.crud.update') }}" />
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
				type: {{ $field->type }},
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

			ready: function() {
				var value = '{{ $field->value }}';

				this.value = (value.indexOf("|") == -1) ? value : value.split("|");
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
