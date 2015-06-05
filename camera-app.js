//
// using mjpg_streamer to run webcam
//
var dgram = require ("dgram");
var fs = require ("fs");
var http = require ("http");
var os = require ("os");
var path = require ("path")
var url = require ("url");
var servo = require('./servo-controller');
var camera = require('./run-camera');

var PIN_PAN  = 18; // GPIO18
var PIN_TILT = 13; // GPIO13

var SENSOR_INTERVAL = 1000;

var panController;
var tiltController;

// load sensible
var baseDir = path.dirname(process.argv[1]);
var sensibleContent = fs.readFileSync(path.join(baseDir, 'sensible.js'));
eval(sensibleContent.toString());

var app = sensible.node.Application;

app.prototype.onBeforeStart = onBeforeStart;
app.prototype.onAfterStart = onAfterStart;
app.prototype.servo_set = onServoSet; // /servo/set?pan=nnn&tilt=nnn
app.prototype.camserver_get = onCamServerGet; // /camserver/get

sensible.ApplicationFactory.createApplication(function (error) {
	if (error) {
		console.log('ERROR:', error);
	} else {
		console.log('sensible app created');
	}
});

function onBeforeStart(callback) {
	callback();
}

function onAfterStart(callback) {
	console.log('sensible app started');
	panController = new servo.ServoController(PIN_PAN);
	tiltController = new servo.ServoController(PIN_TILT);

	camera.initCamera();

	callback();
}

function onServoSet(request, callback) {
	console.log('onServoSet()');
	var panValue = request.parameters.pan;
	var tiltValue = request.parameters.tilt;
	var success = true;

	panController.setAngle(panValue);
 	tiltController.setAngle(tiltValue);

	var response = {
		type: 'json',
		object: { success: success }
	};
	callback(response);
}

function onCamServerGet(request, callback) {
	console.log('onCamServerGet()');
	var panValue = request.parameters.pan;
	var tiltValue = request.parameters.tilt;
	var success = true;

	var addr = gSensibleApplication.mdns.strategy.getIPAddress();

	var response = {
  		type: 'json',
  		object: {
  			url: 'http://'+ addr + ':8080/?action=stream'
  		}
  	};
 	callback(response);
}
