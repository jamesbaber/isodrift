// requestAnimationFrame polyfill
var  w = window, foundRequestAnimationFrame = w.requestAnimationFrame ||
	w.webkitRequestAnimationFrame || w.msRequestAnimationFrame ||
	w.mozRequestAnimationFrame    || w.oRequestAnimationFrame  ||
	function(cb) {
		setTimeout(cb,1000/60);
	};

window.requestAnimationFrame  = foundRequestAnimationFrame ;

var framesPerSecond = 0;
var ticksPerSecond = 0; // Not used yet
var ticks = 0;

function run() {
	render();
	update();
	
	ticks += 1;
	
	window.requestAnimationFrame(run);
}

setInterval(function() {
	framesPerSecond = ticks;
	ticks = 0;
}, 1000);

run();
