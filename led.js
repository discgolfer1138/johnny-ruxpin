const {Board, Led} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

var board = new Board({
  io: new Raspi()
});

board.on('ready', function() {
  var led = new Led('P1-13');
  led.blink();
});