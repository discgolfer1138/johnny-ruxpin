const {Board, Motor} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

var board = new Board({
  io: new Raspi()
});

board.on('ready', function() {
  // const motor = new Motor([ "a5", "a4", "a3" ]);
  var led = new board.Led('P1-13');
  led.blink();
});