const {Board, Motor} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

var board = new Board({
  io: new Raspi()
});

board.on('ready', function() {
  let PWMA = 12;
  let AIN2 = 16;
  let AIN1 = 18;

  // STBY = 22

  // PWMB = 11
  // BIN2 = 13
  // BIN1 = 15

  const eyes =  new Motor([PWMA, AIN2, AIN1]);
  eyes.on('forward', function(err) {
    console.log(err);
    // demonstrate braking after 5 seconds
    board.wait(3000, function() {
      eyes.stop();
    });
  });

  eyes.stop().forward(100);
});