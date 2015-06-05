(function() {
const CWD = '/home/pi/mjpg-streamer';
const COMMAND = CWD + '/mjpg_streamer';
const PARAMS = [ '-i', "./input_uvc.so -r 320x240 -d /dev/video0 -y -n", '-o', "./output_http.so"];

var cp = require('child_process');

exports.initCamera = function() {
	var proc = cp.spawn( COMMAND, PARAMS, { cwd: CWD }); 
	proc.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});

	proc.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
	});

	proc.on("close", function (inCode) {
		console.log ("track finishes");
	});
}

})();

