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
  const motor = new Motor({
    pins: {
      pwm: PWMA,
      dir: AIN1,
      cdir: AIN2,
      enable: STBY
    },
    invertPWM: true
  });

  board.repl.inject({
    motor
  });

  motor.on('stop', () => {
    console.log(`automated stop on timer: ${Date.now()}`);
  });

  motor.on('forward', () => {
    console.log(`forward: ${Date.now()}`);

    // enable the motor after 2 seconds
    board.wait(2000, motor.enable);
  });

  motor.on('enable', () => {
    console.log(`motor enabled: ${Date.now()}`);

    // enable the motor after 2 seconds
    board.wait(2000, motor.stop);
  });

  motor.on('disable', () => {
    console.log(`motor disabled: ${Date.now()}`);
  });

  // disable the motor
  motor.disable();

  // set the motor going forward full speed (nothing happen)
  motor.forward(255);
});