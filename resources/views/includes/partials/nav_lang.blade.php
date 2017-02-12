@if (config('locale.status') && count(config('locale.languages')) > 1)
	<div class="nav-item">
		<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
			@if(access()->user())
				@if(access()->user()->language)
				<span class="flag flag-icon flag-icon-{{ access()->user()->language }}"></span>
				@else
				<span class="flag flag-icon flag-icon-us"></span>
				@endif
			@elseif(session()->has('locale'))
				<span class="flag flag-icon flag-icon-{{ access()->user()->language }}"></span>
			@else
				<span class="flag flag-icon flag-icon-us"></span>
			@endif
			<span class="caret"></span>
		</a>
		<div class="dropdown-menu dropdown-menu-flag dropdown-menu-right from-right" role="menu">
			@foreach (array_keys(config('locale.languages')) as $lang)
				@if ($lang != App::getLocale())
				<div class="dropdown-item">
					<a href="{{ route('actor.user.language.switcher', $lang) }}">
						<span class="flag flag-icon-background flag-icon flag-icon-{{ $lang }}"></span>
						<span class="title">{{ trans('menus.language-picker.langs.'.$lang) }}</span>
					<div class="ripple-container"></div></a>
				</div>
				@endif
			@endforeach
		</div>
	</div>
@endif
