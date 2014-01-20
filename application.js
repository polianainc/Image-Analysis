var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

$(window).load(function() {
	allWidthHeight();
	allWidth();
	allBW();
});

function allWidthHeight() {	
	$('#images img').each(function() {
		if($(this).height() < 440 && $(this).width() < 440)
			$('#width-height').append($('<li>').html($(this).attr('src').replace('images/', '')));
	});
}

function allWidth() {	
	$('#images img').each(function() {
		if($(this).height() >= 440 && $(this).width() < 440)
			$('#width').append($('<li>').html($(this).attr('src').replace('images/', '')));
	});
}

function allBW() {
	$('#images img').each(function() {
		var imageObj = new Image();
		var width = $(this).width();
		var height = $(this).height();
		
		imageObj.onload = function() {
			canvas.width = width;
			canvas.height = height;
			context.drawImage(imageObj, 0, 0);
			
			var imgd = context.getImageData(0, 0, width, height);
			var pix = imgd.data;
			var grayscale = true;

			for(var i = 0, n = pix.length; i < n; i += 4) {
				pix[i] = parseInt(pix[i]);
				pix[i+1] = parseInt(pix[i+1]);
				pix[i+2] = parseInt(pix[i+2]);

				if(
					(pix[i] != pix[i+1] || pix[i+1] != pix[i+2] || pix[i] != pix[i+2]) ||
					(pix[i] + 1 != pix[i+1] + 1 || pix[i+1] + 1 != pix[i+2] + 1 || pix[i] + 1 != pix[i+2] + 1) ||
					(pix[i] + 2 != pix[i+1] + 2 || pix[i+1] + 2 != pix[i+2] + 2 || pix[i] + 2 != pix[i+2] + 2)
				)
					grayscale = false;
			}

			if(grayscale)
				$('#black-white').append($('<li>').html($(this).attr('src').replace('images/', '')));
				
			context.clearRect(0, 0, 2000, 2000);
		};
		
		imageObj.src = $(this).attr('src');
	}).promise().done(function() {
		finish();
	});
}

function finish() {
	$('#images').remove();
	$('#canvas').remove();
	
	$('#width-height').before($('<h2>').html("Images with height and width both less than 440px:"));
	$('#width').before($('<h2>').html("Images with width less than 440px:"));
	$('#black-white').before($('<h2>').html("Images that are black and white:"));
	
	$('h1').html("And the results are...");
}