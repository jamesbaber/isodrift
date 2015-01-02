/*

	Load the resources for the game

*/

var imageX = new Image();
imageX.src = ""

//var audioX = new Audio("");
//audioX.play();

var imageShips = [];
var num = 4;
var current = 1;
while (current <= num) {
	imageShips[imageShips.length] = new Image();
	imageShips[imageShips.length - 1].src = "resources/ship" + current + ".png"
	current += 1
}

var imageParticleThruster = new Image();
imageParticleThruster.src = "resources/particleThruster.png"

var imageBullet = new Image();
imageBullet.src = "resources/bullet.png"

var imageLogo = new Image();
imageLogo.src = "resources/logo.png"

var imagePointer = new Image();
imagePointer.src = "resources/pointer.png";

var imagePointer2 = new Image();
imagePointer2.src = "resources/pointer2.png";

var imagePointerLight = new Image();
imagePointerLight.src = "resources/pointerLight.png";

var imagePaddle = new Image();
imagePaddle.src = "resources/paddle.png"

//var imageSplash = new Image();
//imageSplash.src = "resources/splash.png"

