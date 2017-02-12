(function(){
	$(function(){
		var _request = false;
		$('#actor-user-profile-picture').change(function(event){
			var tmpPath = URL.createObjectURL(event.target.files[0]);
			var img = $('<img>')
						.attr('src', tmpPath)
						.Jcrop({
							minSize: [100, 100],
							maxSize: [200, 200],
							setSelect: [ cropped.coordinates.x, cropped.coordinates.y, cropped.coordinates.x2, cropped.coordinates.y2 ],
							aspectRatio: 1,
							onSelect: updateCoordAndSize
						});
			$('#profile-image-jcrop').html(img);
			alert(img);
		});

		$('#btn-save-profile-picture').click(function(){
			if(_request == false) {
				_request = true;
				var img = $('#profile-image-jcrop img');
				var src = img.attr('src');

				getDataUri(src, function(dataUri){
					var _data = {
						base64_image: dataUri,
						cropped_area: cropped
					};
					$.ajax({
					   type: "POST",
					   url: SITE_CONFIG.url + '/profile/media/upload_photo',
					   headers: {
						   'X-CSRF-TOKEN': SITE_CONFIG.csrf_token
					   },
					   data: _data,
					   success: function(response, status, xhr) {
						  console.log(response);
						  _request = false;
					   }
					});
				});
			}
		});
	});
})();
