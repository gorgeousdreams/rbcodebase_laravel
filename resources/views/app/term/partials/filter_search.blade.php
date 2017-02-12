<!-- Search Form -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script type="text/javascript">
		$(document).on('keyup', '#term_id', function() {
			var min_length = 1; // min caracters to display the autocomplete
			var keyword = $('#term_id').val();
			var token = $('#_token').val();
			if (keyword.length >= min_length) {
				$.ajax({
					url: '/glossary/suggest',
					type: 'POST',
					data: {query:keyword, _token: token},
					success:function(data){
						$('#term_list').html('');
						$('#term_list').show();

						if(data == '[]'){
							$("#term_list").append("<em><small>No Results Found</small></em>");
						} else {
							$.each($.parseJSON(data), function (i, object) {
								console.log(object.title);
								$("#term_list").append("<a href='/glossary/term/"+object.slug+"'>"+object.title+"</a><br />");
							});
						}
					}
				});
			} else {
				$('#term_list').hide();
			}
		});

		// set_item : this function will be executed when we select an item
		function set_item(item) {
			// change input value
			$('#term_id').val(item);
			// hide proposition list
			$('#term_list').hide();
		}
	</script>
	{!! Form::open(array('route' => 'search', 'id' => 'autocomplete', 'class' => 'form-inline navbar-form')) !!}
		<input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}">
		<input id="term_id" name="query" class="form-control" type="text" placeholder="Enter Term..." autocomplete="off" />
		<div id="term_list"></div>
		<button type="submit" class="btn btn-warning">Search</button>
	{!! Form::close() !!}
