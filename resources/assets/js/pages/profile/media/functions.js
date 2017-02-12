'use strict';

var cropped = {
	coordinates: { x: 50, y: 50, x2: 100, y2: 100 },
	size: {w: 100, h: 100}
};

function getDataUri(url, callback) {
	var image = new Image();

	image.onload = function () {
		var canvas = document.createElement('canvas');
		canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
		canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

		canvas.getContext('2d').drawImage(this, 0, 0);

		// Get raw image data
		callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

	};

	image.src = url;
}

function updateCoordAndSize(croppedArea) {
	// croped coordinates
	cropped.coordinates.x = croppedArea.x;
	cropped.coordinates.y = croppedArea.y;
	cropped.coordinates.x2 = croppedArea.x2;
	cropped.coordinates.y2 = croppedArea.y2;

	// croped width and height
	cropped.size.w = croppedArea.w;
	cropped.size.h = croppedArea.h;

	console.log(cropped);
}
