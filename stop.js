const {Board, Pin} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

var board = new Board({
  io: new Raspi()
});

board.on('ready', function() {
  const STBY = 'GPIO25'; //22
  const standby_pin = new Pin(STBY);

  standby_pin.low();

  console.log('stopped');
});