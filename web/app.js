window.addEventListener('load', function() {
	const SPEED = 5;
	var pan = 90;
	var tilt = 50;

	initCamFrame();
	onChangeValue();

	// window.addEventListener('keypress', onKeyPress);
  window.addEventListener('message', function (event) {
		onKeyPress(event.data);
  });

	function onKeyPress(event) {
		var key = event.keyCode;
		console.log(key);
		switch (key) {
			case KeyEvent.DOM_VK_UP:
				if (tilt < 180) {
					tilt += SPEED;
				}
	      break;
	    case KeyEvent.DOM_VK_DOWN:
				if (tilt > 0) {
					tilt -= SPEED;
				}
	      break;
			case KeyEvent.DOM_VK_LEFT:
				if (pan < 180) {
					pan += SPEED;
				}
	      break;
	    case KeyEvent.DOM_VK_RIGHT:
				if (pan > 0) {
					pan -= SPEED;
				}
	     break;
			default:
				return;
		}
		onChangeValue();
	}

	function initCamFrame() {
		var url = '/camserver/get';
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url)
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				console.log('status:', xhr.status);
				if (xhr.status === 200) {
					var resp = JSON.parse(xhr.responseText);
					var camFrame = document.getElementById('camera-frame');
					camFrame.src = resp.url;
				}
			}
		}
	}

	function onChangeValue() {
		var url = '/servo/set?pan='+ pan + '&tilt=' + tilt;
		console.log(url);
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url)
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				console.log('status:', xhr.status);
			}
		}
	}

});
