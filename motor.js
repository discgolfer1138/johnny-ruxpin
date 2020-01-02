const {Board, Motor, Pin} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

var board = new Board({
  io: new Raspi()
});

board.on('ready', function() {
  let PWMA = 'GPIO18'; //12
  let AIN2 = 'GPIO23'; //16
  let AIN1 = 'GPIO24'; //18

  let STBY = 'GPIO25'; //22

  // let PWMB = 'GPIO17'; //11
  // let BIN2 = 'GPIO27'; //13
  // let BIN1 = 'GPIO22'; //15

  const standby_pin = new Pin(STBY);

  const eyes =  new Motor({
    pins: {
      pwm: PWMA,
      dir: AIN2,
      cdir: AIN1
    }
  });

  board.on('exit', () => {
    standby_pin.low();
  });

  standby_pin.high();

  // Go forward at full speed for 5 seconds
  console.log('Full speed ahead!');
  eyes.forward(255);
  board.wait(4900, eyes.stop);
});