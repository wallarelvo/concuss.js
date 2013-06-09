

var circleOpen = new CanvasImage("mainCanvas", "open_circle");

var circleSmall = new CanvasImage("mainCanvas", "circlesmall");

var updateRate = 5;

var scaleY = 5;

var scaleX = 4;

var drawInterval = undefined;

// change in x velocity per 5 milliseconds
var ax = 0;

// change in y velocity per 5 milliseconds
var ay = 0;

var gameLength = 25 * 1000;

// Gets the canvas
var canvas = document.getElementById("mainCanvas");

window.onload = initGame;

function initGame() {
	$("#startMessage").modal("show");
	$("#startMessage").on("hidden", function () {
		drawInterval = setInterval(drawCircles, updateRate);
	});

	if(window.DeviceOrientationEvent) {
    	window.addEventListener('deviceorientation', orientationEventHandler, false);
    }

	// Makes the canvas the size of the page
    canvas.width = document.width;
    canvas.height = document.height;

    ax = updateRate * getRandomInt(-20, 20) / 1000;
    ay = updateRate * getRandomInt(-20, 20) / 1000;

    circleSmall.setHeading(ax, ay);

    circleSmall.updatePosition(canvas.width / 2, canvas.height / 2).redraw();
    circleOpen.updatePosition(canvas.width / 2, canvas.height / 2).redraw();
}

function orientationEventHandler(event) {
	event.preventDefault();
	$("#tiltVertical").html(Math.floor(event.gamma));
	$("#tiltHorizontal").html(Math.floor(event.beta));
}

function drawCircles() {
	circleOpen.clearCanvas();
	circleOpen.redraw();

	if (circleSmall.x + circleSmall.hx + circleSmall.image.width / 2 > document.width - 50 || 
		circleSmall.x + circleSmall.hx - circleSmall.image.width / 2 < 0) {
		circleSmall.hx = -circleSmall.hx / 1.8;
	}

	if (circleSmall.y + circleSmall.hy + circleSmall.image.height / 2 > document.height - 170 || 
		circleSmall.y + circleSmall.hy - circleSmall.image.height / 2 < 50) {
		circleSmall.hy = -circleSmall.hy / 1.8;
	}

	circleSmall.incrementPosition().redraw();

	uax = mapVal(+$("#tiltHorizontal").html(), -45, 45, -scaleX * Math.abs(ax), scaleX * Math.abs(ax));
	uay = mapVal(-+$("#tiltVertical").html(), -45, 45, -scaleY * Math.abs(ay), scaleY * Math.abs(ay));

	circleSmall.setHeading(circleSmall.hx + ax + uax, circleSmall.hy + ay + uay);
}

function mapVal(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
