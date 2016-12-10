var five = require('johnny-five');
var Chip = require('chip-io');

var board = new five.Board({
  io: new Chip()
});

board.on('ready', function() {
  console.log('board ready', Date.now());

  var motor = new five.Motor(['PWM0', 'XIO-P0', 'XIO-P2']);

  motor.on('forward', function() {
    console.log('forward', Date.now());

    // demonstrate switching to reverse after 5 seconds
    board.wait(5000, function() {
      motor.reverse(50);
    });
  });

  motor.on('reverse', function() {
    console.log('reverse', Date.now());

    // demonstrate stopping after 5 seconds
    board.wait(5000, function() {
      motor.stop();
    });
  });

  motor.forward(50);
});