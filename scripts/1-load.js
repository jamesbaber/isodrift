/*

	Load misc resources

*/

var imageParticleThruster = new Image();
imageParticleThruster.src = "resources/particleThruster.png"

var imageBullet = new Image();
imageBullet.src = "resources/bullet.png"

var imageLogo = new Image();
imageLogo.src = "resources/logo.png"

var imageBeta = new Image();
imageBeta.src = "resources/beta.png"

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


/*

	Load maps and background images

*/

var imageBackground = new Image();
imageBackground.src = "resources/background.png"


/*

	Load ship models

*/

var imageShips = [];
var num = 4;
var current = 1;
while (current <= num) {
	imageShips[imageShips.length] = new Image();
	imageShips[imageShips.length - 1].src = "resources/ships/ship" + current + ".png"
	current += 1
}


/*

	Audio

*/

//var audioX = new Audio("");
//audioX.play();
