const {Board, Motor} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

// pin configuration
const PWMA = 'GPIO18'; //12 - motor A speed
const AIN1 = 'GPIO24'; //18 - motor A dir
const AIN2 = 'GPIO23'; //16 - motor A cdir
const STBY = 'GPIO25'; //22 - standby
// const PWMB = 'GPIO17'; //11
// const BIN1 = 'GPIO22'; //15
// const BIN2 = 'GPIO27'; //13

var board = new Board({
  io: new Raspi()
});

board.on('ready', () => {
  let motor = new Motor({
    pins: {
      pwm: PWMA,
      dir: AIN1,
      cdir: AIN2
    },
    invertPWM: true
  });

  motor.stop();

  board.repl.inject({
    motor
  });

  motor.on('stop', () => {
    console.log(`stop: ${Date.now()}`);
  });

  motor.on('forward', () => {
    console.log(`forward: ${Date.now()}`);
  });

  motor.on('reverse', () => {
    console.log(`reverse: ${Date.now()}`);
  });
});