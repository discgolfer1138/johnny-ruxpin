const {Board, Motor} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;
const keypress = require('keypress');

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
    }
  });

  motor.stop();

  // make `process.stdin` begin emitting "keypress" events
  keypress(process.stdin);

  // listen for the "keypress" event
  var stopmotor;
  process.stdin.on('keypress', (ch, key) =>{

    stopmotor = setTimeout(function(){
      motor.stop();
    }, 100);
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
});