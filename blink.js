const {Board, Motor} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

// pin configuration
const PWMA = 'GPIO18'; //12 - motor A speed
const AIN1 = 'GPIO24'; //18 - motor A dir
const AIN2 = 'GPIO23'; //16 - motor A cdir

var board = new Board({
  io: new Raspi()
});

board.on('ready', () => {

  const eyes = new Motor({
    pins: {
      pwm: PWMA,
      dir: AIN1,
      cdir: AIN2
    }
  });


  eyes.rev(255);
  board.wait(1000, () => {
    eyes.stop();
  });
  eyes.fwd(255);
  board.wait(1000, () => {
    eyes.stop();
  });

  board.on('exit', () => {
    eyes.stop();
  });

});