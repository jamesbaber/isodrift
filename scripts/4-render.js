/*

	Rotated image drawing function

*/
var TO_RADIANS = Math.PI/180;
function drawRotatedImage(image, x, y, angle) {
	context.save();
	context.translate(x, y);
	context.rotate(angle * TO_RADIANS);
	context.drawImage(image, -(image.width/2), -(image.height/2));
	context.restore();
}

// Manage game rendering
function render() {
	// Clear the canvas and make it transparent
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// Show the canvas
	context.fillStyle = "#4F5257";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	// Draw logo at  the top
	drawRotatedImage(imageLogo,  canvas.width / 2, 80, 0);
	
	// Draw particles underneath everything else
	for (i = 0; i < particles.length; i++) {
		drawRotatedImage(imageParticleThruster, particles[i].x, particles[i].y, 0);
	}
	
	// Draw upgrades
	for (i = 0; i < upgrades.length; i++) {
		drawRotatedImage(imageUpgrade, upgrades[i].x, upgrades[i].y, 0);
	}
	
	// Draw enemys
	context.fillStyle = "#00FF00";
	enemys.forEach(function(enemy) {
		drawRotatedImage(enemy.image, enemy.x, enemy.y, enemy.angle);
		context.fillRect(enemy.x - ((enemy.health * 4) / 2), enemy.y - 45, enemy.health * 4, 5);
	});
	
	// Draw player
	drawRotatedImage(player.image, player.x, player.y, player.angle);
	if (tutorialTime > 0) {
		context.fillStyle = "#FFFFFF";
		context.textAlign = "center";
		context.fillText("This is you", player.x, player.y - 60);
		if (mobile == true) {
			context.fillText("Use the paddles to move", player.x, player.y + 100);
			//context.fillText("And the middle button to fire", player.x, player.y + 90);
		} else {
			context.fillText("Use WASD to move", player.x, player.y + 100);
			context.fillText("And space to fire", player.x, player.y + 140);
		}
		context.beginPath();
		context.arc(player.x, player.y, 50, 0, 2 * Math.PI);
		context.stroke();
	}

	// Draw bullets
	bullets.forEach(function(bullet) {
		drawRotatedImage(imageBullet, bullet.x, bullet.y, bullet.angle);
	});
	
	
	// Set fonts
	context.font = "bold 40px Century Gothic";
	context.fillStyle = "#FFFFFF";
	context.textAlign = "left";
	
	// Draw stats
	context.fillText(score + " points", 10, 40);
	context.fillText(Math.round(player.speed * 3.7) + " mph", 10, 80);
	context.fillText(enemys.length + " enemies", 10, 120);
	context.fillText(player.angle + " degrees", 10, 160);
	
	// Work out what color the FPS should be
	if (framesPerSecond >= 60) {
		// 60+ Very good
		context.fillStyle = "#5CCC29";
	} else if (framesPerSecond >= 30) {
		// 30+ Just about O.K. but not very good
		context.fillStyle = "#FF8E0D";
	} else if (framesPerSecond < 30) {
		// -30 Pretty terrible
		context.fillStyle = "#B80000";
	}
	// Finally draw the FPS
	context.fillText(framesPerSecond + " FPS", 10, 200);
	
	/*
	
		Draw the 3D player icon
		at a fixed position on the screen
	
	*/
	// Draw pointer
	drawRotatedImage(imagePointer, 60, 280, player.angle);
	if (player.x < 0 || player.x > canvas.width || player.y < 0 || player.y > canvas.height) {
		angle = Math.atan2(player.y - 60, player.x - 300) * 180 / Math.PI;
		drawRotatedImage(imagePointer2, 60, 280, angle);
	}

	// Draw fake 3D player
	var height = 8;
	var current = 0;
	while (current <= height) {
		drawRotatedImage(imagePointerLight, 60, 280 - current, player.angle);
		drawRotatedImage(player.image, 60, 280 - current, player.angle);
		current += 1;
	}
	
	/*
	// Render trees
	trees.forEach(function(tree) {
		var layers = 5;
		var layer = 0;
		while (layer <= layers) {
			// Draw the layer scaled down from 5-0 using the rotation seed
			var x = tree.x;
			var y = tree.y;
			var angle = Math.atan2(tree.y - player.y, tree.x - player.y) * 180 / Math.PI;
			var yDist = player.y + y;
			var xDist = player.x + x;
			xDist = xDist / 20;
			yDist = yDist / 20;
			
			x += ((xDist) * layer) * Math.cos(angle * Math.PI / 180);
			y += ((yDist) * layer) * Math.sin(angle * Math.PI / 180);
			drawRotatedImage(imageTree, x, y, tree.angleSeed * layer);
			layer += 1;
		}
	});
	*/
	/*
	context.fillStyle = "#FFFFFF";
	touches.forEach(function(touch) {
		context.fillRect(touch.x - 10, touch.y - 10, 20, 20);
	});
	*/
	// Draw the DPad for mobile
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		// Draw left paddle (speed)
		drawRotatedImage(imagePaddle, leftPaddle.x, rightPaddle.y, 0);
		
		// Draw right paddle (steering)
		drawRotatedImage(imagePaddle, rightPaddle.x, rightPaddle.y, 90);
	}
	
	// Decrease tutorial counter
	tutorialTime -= 1;
	if (tutorialTime <= 0) {
		tutorialTime = 0;
	}
}
