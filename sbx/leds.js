var five = require('johnny-five'); var chipio = require('chip-io');

var board = new five.Board({
  io: new chipio()
});

board.on('ready', function() {
  // create LED instances
  let ledRed = new five.Led('XIO-P0');
  let ledGrn = new five.Led('XIO-P2');
  let ledBlu = new five.Led('XIO-P4');

  // turn them all on
  ledRed.on();
  ledGrn.on();
  ledBlu.on();
});
