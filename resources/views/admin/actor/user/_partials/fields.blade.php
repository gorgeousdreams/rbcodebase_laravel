<fieldset class="form-group col-md-12">
	{!! Form::label('type', 'Type') !!}
	<select name="type" v-model="type" class="form-control" @change="setType()">
		<option value="">-- Select --</option>
		@foreach(\App\Models\Actor\User\UserField::types() as $key => $value)
			<option v-bind:value="{{ $key }}">{{ $value }}</option>
		@endforeach
	</select>
</fieldset>

<fieldset class="form-group col-md-12">
	{!! Form::label('title', 'Title') !!}
	{!! Form::text('title', null, ['class' => 'form-control', 'placeholder' => 'Title']) !!}
</fieldset>

<fieldset class="form-group col-md-12">
	{!! Form::label('value', 'Value') !!}
	{!! Form::textarea('value', null, ['class' => 'form-control', 'placeholder' => 'Value']) !!}
</fieldset>