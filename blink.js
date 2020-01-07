const {Board, Motor} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;
const temporal = require('temporal');

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

  let bear = {
    eyes:{
      open: function(){
        eyes.rev(255);
        temporal.delay(1000, () => {
          eyes.stop();
        });
      },
      close: function(){
        eyes.fwd(255);
        temporal.delay(1000, () => {
          eyes.stop();
        });
      }
    }
  };

  board.repl.inject(bear);

  board.on('exit', () => {
    eyes.stop();
  });

});