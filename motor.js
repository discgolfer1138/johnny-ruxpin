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

  let eyes = new Motor({
    pins: {
      pwm: PWMA,
      dir: AIN1,
      cdir: AIN2
    }
  });

  let mouth = new Motor({
    pins: {
      pwm: PWMB,
      dir: BIN1,
      cdir: BIN2
    }
  });

  eyes.on('start', () => {
    console.log('eye motor started');
    if(eyes.isOn) board.wait(500, eyes.stop);
  });

  eyes.on('stop', () => {
    console.log('eye motor stopped');
  });


  mouth.on('start', () => {
    console.log('mouth motor started');
    if(mouth.isOn) board.wait(500, mouth.stop);
  });

  mouth.on('stop', () => {
    console.log('mouth motor stopped');
  });

  board.on('exit', () => {
    eyes.stop();
    mouth.stop();
  });

  let bear = {
    eyes: eyes,
    mouth: mouth
  };

  board.repl.inject(bear);
});