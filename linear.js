const {Board, Servo} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

const SRV = 'GPIO25'; //37 - potentiometer

var board = new Board({
  io: new Raspi()
});

board.on('ready', () => {

  const srv = new Servo({
    pin: SRV
  });

  board.repl.inject({srv:srv});

});