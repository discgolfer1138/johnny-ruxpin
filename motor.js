const {Board, Motor} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

// pin configuration
const PWMA = 'GPIO18'; //12 - motor A speed
const AIN1 = 'GPIO24'; //18 - motor A dir
const AIN2 = 'GPIO23'; //16 - motor A cdir
// const STBY = 'GPIO25'; //22 - standby
const PWMB = 'GPIO17'; //11
const BIN1 = 'GPIO22'; //15
const BIN2 = 'GPIO27'; //13

var board = new Board({
  io: new Raspi()
});

board.on('ready', () => {
  let eyes_motor = new Motor({
    pins: {
      pwm: PWMA,
      dir: AIN1,
      cdir: AIN2
    }
  });

  let mouth_motor = new Motor({
    pins: {
      pwm: PWMB,
      dir: BIN1,
      cdir: BIN2
    }
  });

  eyes_motor.stop();
  mouth_motor.stop();

  let bear = {
    eyes:{
      open: () => {
        eyes_motor.stop().forward();
        board.wait(500, eyes_motor.stop);
      },
      close: () => {
        eyes_motor.stop().reverse();
        board.wait(500, eyes_motor.stop);
      }
    },
    mouth:{
      open: () => {
        mouth_motor.stop().forward();
        board.wait(500, mouth_motor.stop);
      },
      close: () => {
        mouth_motor.stop().reverse();
        board.wait(500, mouth_motor.stop);
      }
    }
  };

  this.repl.inject(bear);
});