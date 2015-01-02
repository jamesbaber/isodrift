// Get canvas for future use
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Work out if this is mobile
// Just do "if (mobile == true) {"
var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

/*

	Define reusable functions

*/

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function lineDistance(point1, point2)
{
	var xs = 0;
	var ys = 0;
	xs = point2.x - point1.x;
	xs = xs * xs;
	ys = point2.y - point1.y;
	ys = ys * ys;
	return Math.sqrt(xs + ys);
}

/*

	Input event management

*/

keys = [];

window.addEventListener("keydown", function(e) {
	keys[e.keyCode] = true;
}, false);

window.addEventListener("keyup", function(e) {
	delete keys[e.keyCode];
}, false);


canvas.addEventListener('click', function(e) {
	// Use 'e' to manage click
}, false);


var touches = [];
canvas.addEventListener('touchstart', touchManage, false);
canvas.addEventListener('touchend', touchManage, false);
canvas.addEventListener('touchmove', touchManage, false);

function touchManage(e) {
	e.preventDefault();
	var current = 0
	touches = [];
	while (current < e.touches.length) {
		touches[touches.length] = {
			x: Math.round(e.touches[current].clientX),
			y: Math.round(e.touches[current].clientY)
		};
		current += 1;
	}
}

/*

	Setup positions of paddles

*/

// Left paddle for SPEED
var leftPaddle = {
	x: 200,
	y: canvas.height - 200
};

// Right paddle for STEERING
var rightPaddle = {
	x: canvas.width - 200,
	y: canvas.height - 200
};


/*

	Setup the player and enemies objects

*/

var player = {
	x: getRandom(300, 400),
	y: getRandom(300, 400),
	angle: getRandom(0, 359),
	speed: 0,
	fireCooldown: 10,
	image: imageShips[getRandom(0, imageShips.length - 1)]
};

var enemys = [];

// Function to spawn enemies, all settings are optional
function spawnEnemy(x, y, angle) {
	// If x or y not specified then make them up randomly
	if(!x || !y ) {
		var x = getRandom(50, canvas.width - 50);
		var y = getRandom(50, canvas.height - 50);
	}
	
	// If angle not specified then randomise it
	if(!angle) {
		var angle = getRandom(0, 360);
	}
	
	// Work out which image to use, it cann't be the same as the player
	var img = player.image;
	while (img == player.image) {
		img = imageShips[getRandom(0, imageShips.length - 1)]
	}
	
	// Add a enemy to the list
	enemys.push({
		x: x,
		y: y,
		angle: angle,
		speed: 0,
		canSeePlayer: 0,
		health: 10,
		fireCooldown: 10,
		image: img
	});
}
function spawnEnemies(num) {
	var current = 0;
	while (current < num) {
		spawnEnemy();
		current += 1;
	}
}

// Spawn 10 enemies
spawnEnemies(10);


/*

	Setup particles

*/

var particles = [
];

function addParticle(x, y) {
	x += (Math.random() - 0.5) * 10;
	y += (Math.random() - 0.5) * 10;
	particles.push({x: x, y: y, life: 5});
}

var upgrades = [
]


/*
var i = 0;
var x = 0;
var y = 0;
var f = 0;
while (i < 20) {
	x = Math.random() * 1000
	y = Math.random() * 1000
	if (y <	window.innerHeight && x < window.innerWidth) {
		f = 0;
		upgrades.forEach(function(entry) {
			if (lineDistance(entry, {x: x, y: y}) < 128) {
				f = 1;
			}
		});
		if (f = 1)  {
			upgrades[upgrades.length] = {x: x, y: y};
		}
	}
	i += 1
}
*/

var score = 0;

var bullets = [
];

function fireBullet(x, y, angle) {
	x += 50 * Math.cos(angle * Math.PI / 180);
    y += 50 * Math.sin(angle * Math.PI / 180);
	bullets[bullets.length] = {
		x: x,
		y: y,
		angle: angle
	}
}

/*

	Setup trees

*/

var trees = [
]

var i = 0;
var x = 0;
var y = 0;
var treeNum = 10;
while (i < treeNum) {
	x = Math.random() * 1000
	y = Math.random() * 1000
	if (y <	window.innerHeight && x < window.innerWidth) {
		trees[trees.length] = {x: x, y: y, angleSeed: Math.random() * 1000};
	}
	i += 1
}

/*

	Setup the tutorial

*/

var tutorialTimeSec = 5;
var tutorialTime = tutorialTimeSec * 60;

/*

	Setup the course

*/

var currentCourse = 1;