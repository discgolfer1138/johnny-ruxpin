const {Board, Motor, Pin} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

var board = new Board({
  io: new Raspi()
});

board.on('ready', function() {
  const PWMA = 'GPIO18'; //12
  const AIN2 = 'GPIO23'; //16
  const AIN1 = 'GPIO24'; //18

  const STBY = 'GPIO25'; //22

  // let PWMB = 'GPIO17'; //11
  // let BIN2 = 'GPIO27'; //13
  // let BIN1 = 'GPIO22'; //15

  const standby_pin = new Pin(STBY);

  let eyes =  new Motor({
    pins: {
      pwm: PWMA,
      dir: AIN2,
      cdir: AIN1
    }
  });

  board.on('exit', () => {
    eyes.stop();
    standby_pin.low();
  });

  standby_pin.high();

  // Go forward at full speed for 5 seconds
  console.log('Full speed ahead!');
  eyes.stop().forward();
  board.wait(2000, eyes.stop);
});