// Import the interface to Tessel hardware
var tessel = require('tessel');
// Load the http module to create an http server.
var http = require('http');
var url = require('url');

var tessel = require('tessel');
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['A']);

// Configure our HTTP server to respond with "Hello from Tessel!" to all requests.
var server = http.createServer(function (request, response) {
  var urlParts = url.parse(request.url, true);
  var doorRegex = /door/;
      if (urlParts.pathname.match(doorRegex)) {
      // If there is a request containing the string 'door' call a function, toggleLED
      
	      var servo1 = 1; // We have a servo plugged in at position 1

		  	console.log("WE ARE IN THE .ON READY!!!!")
		  var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

		  //  Set the minimum and maximum duty cycle for servo 1.
		  //  If the servo doesn't move to its full extent or stalls out
		  //  and gets hot, try tuning these values (0.05 and 0.12).
		  //  Moving them towards each other = less movement range
		  //  Moving them apart = more range, more likely to stall and burn out
		  var openSesame = function () {
		  	setTimeout(function() {
		  		clearInterval(openSesame);
		  	}, 5000);
		    setInterval(function () {
		      console.log('Position (in range 0-1):', position);
		      //  Set servo #1 to position pos.
		      servo.move(servo1, position);

		      // Increment by 10% (~18 deg for a normal servo)
		      position += 0.35;
		      if (position > 1) {
		        position = 0; // Reset servo position
		      }
		    }, 500); // Every 500 milliseconds
		  };
		  servo.configure(servo1, 0.05, 0.12, openSesame);

		  response.end("Hello from Tessel!\n");
    } else {
      // All other request will call a function, showIndex
      response.writeHead(200, {"Content-Type": "text/plain"});
  		response.end("Hello from Tessel!\n");
    }
  });






// Listen on port 8080, IP defaults to 192.168.1.101. Also accessible through [tessel-name].local
server.listen(8080);

// Put a friendly message in the terminal
console.log("Server running at http://192.168.1.101:8080/");