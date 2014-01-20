<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Image Analysis</title>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
</head>

<body>
	<h1 style="text-align: center;">If you see this message, the script is still working...</h1>
	<ul id="width-height"></ul>
	<ul id="width"></ul>
	<ul id="black-white"></ul>
	<div id="images">
		<?php
			$images = glob('images/' . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);
			
			foreach($images as $image) {
				echo '<img src="' . $image . '">';
			}
		?>
	</div>
	<canvas id="canvas" width="2000" height="2000"></canvas>
	<script src="application.js"></script>
</body>
</html>