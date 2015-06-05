(function () {

var rpio = require('rpio');

rpio.pwmSetClockDivider(512);

// constructor
var ServoController = function(pin) {
	this.pin = pin;
	rpio.setFunction(pin, rpio.PWM);
	rpio.pwmSetRange(pin, 1024);
	console.log('ServoController:', pin);
};

ServoController.prototype.setAngle = function(angle) {
	console.log('setAngle:', angle);
	if (angle < 0) {
		angle = 0;
	} else if (angle > 180) {
		angle = 180;
	}
	// 24 ~ 115
	var value = Math.floor(angle / 2 + 24);
	console.log('rpio.pwmSetData(pin=' + this.pin + ', value=' + value + ')');
	rpio.pwmSetData(this.pin, value);
}

ServoController.prototype.initSwitch = function(pin) {
	rpio.setInput(pin);
	this.switchPin = pin;
}

ServoController.prototype.getSwitch = function() {
	return rpio.read(this.switchPin);
}

exports.ServoController = ServoController;

})();
