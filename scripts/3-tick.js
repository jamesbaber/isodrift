// Manage game loop updating
function update() {	
	// Function to manage the DPad and its events
	function paddleStatus(side) {
		if(mobile == true) {
			var output = "invalidarg";
			if (side == "left") {
				// Get the status of the left pad (speed)
				output = "none";
				touches.forEach(function(touch) {
					if (lineDistance(touch, leftPaddle) <= 300) {
						var dist = leftPaddle.y - touch.y;
						// Output a number from negative 10 to positive 10
						output = dist;
					}
				});
				return output;
			} else if (side == "right") {
				// Get the value of the right pad (steering)
				output = "none";
				touches.forEach(function(touch) {
					if (lineDistance(touch, rightPaddle) <= 300) {
						output = "close";
						var dist = rightPaddle.x - touch.x;
						// Output a number from negative 10 to positive 10
						output = dist;
					}
				});
				return output;
			}
		}
	}
	
	// Define speed limits
	var maxSpeedForward = 10;
	var maxSpeedReverse = -2;
	var maxTurn = 10;

	// Manage speed
	var leftPad = paddleStatus("left");
	var rightPad = paddleStatus("right");
	// Move
	if (keys[87] || leftPad > 0) {
		player.speed += 0.03;
		// for variable speed
		// player.speed += (leftPad / 10000);
	} else if (keys[83] || leftPad < 0) { // Move backwards
		player.speed -= 0.03;
		// for variable speed
		// player.speed -= (leftPad / 10000);
	} else {
		if (player.speed < 0) {
			// Slow down the player (If negative speed (reverse))
			player.speed += 0.03;
		}
		if (player.speed > 0) {
			// Slow down player (If positive speed (forward))
			player.speed -= 0.06;
		}
	}

	
	// If speed almost zero make it zero
	if (player.speed < 0.01 && player.speed > -0.01) {
		player.speed = 0;
	}
	
	// Move in direction of player.angle
	player.x += player.speed * Math.cos(player.angle * Math.PI / 180);
    player.y += player.speed * Math.sin(player.angle * Math.PI / 180);
	
	addParticle(player.x, player.y);
	addParticle(player.x, player.y);
	addParticle(player.x, player.y);

	// Limit speed
	if (player.speed > maxSpeedForward) {
		player.speed = maxSpeedForward;
	}
	if (player.speed < maxSpeedReverse) {
		player.speed = maxSpeedReverse;
	}
	
	// Turn controls
	if (keys[65] ||rightPad > 0) {
		// Turn left
		var addition = ((maxSpeedForward + 2) - player.speed);
		if (addition > 2) {
			addition = 2;
		}
		player.angle -= addition;
	}
	if (keys[68] || rightPad < 0) {
		// Turn right
		var addition = ((maxSpeedForward + 2) - player.speed);
		if (addition > 2) {
			addition = 2;
		}
		player.angle += addition;
	}
	
	// Loop angle on 360 and 0
	if (player.angle < -359 || player.angle > 359) {
		player.angle = 0;
	}
	
	// Particle tick
	for (i = 0; i < particles.length; i++) {
		particles[i].life -= 1;
		if (particles[i].life <= 0) {
			if (Math.random() < 0.1) {
				particles.splice(i, 1);
			}
		}
	}
	
	// If player touching upgrade, increase score
	var index = 0;
	upgrades.forEach(function(entry) {
		if (lineDistance(entry, player) < 32) {
			score += 1
			upgrades.splice(index, 1);
		}
		index += 1;
	});
	
	// Move bullets
	bullets.forEach(function(bullet) {
		bullet.x += 10 * Math.cos(bullet.angle * Math.PI / 180);
		bullet.y += 10 * Math.sin(bullet.angle * Math.PI / 180);
	});
	
	// Fire bullets
	if (keys[32]) {
		if (player.fireCooldown <= 0) {
			fireBullet(player.x, player.y, player.angle);
			player.fireCooldown = 10;
		}
	}
	// Remove cooldown slowly
	if (player.fireCooldown > 0) {
		player.fireCooldown -= 1;
	}
	
	// Manage bullets hitting enemies
	// Step through bullets
	bullets.forEach(function(bullet) {
		// Step through enemies
		enemys.forEach(function(enemy) {
			// If the bullet is touching the enemy
			if (lineDistance(enemy, bullet) <= 64) {
				// The bullet *bullet* is touching the enemy *enemy*
				console.log("An enemy has been hit");
				
				// Remove the bullet from the list
				bullets.splice(bullet, 1);
				
				// Decrease the health
				var enemyIndex = enemys.indexOf(enemy);
				enemys[enemyIndex].health -= 1;
				
				// Remove dead enemies
				// If the health is less than or equal to 0 then remove it
				enemys.forEach(function(enemy) {
					var enemyIndex = enemys.indexOf(enemy);
					if (enemys[enemyIndex].health <= 0) {
						enemys.splice(enemyIndex, 1);
					}
				});
			}
		});
	});
}
