const {Board, Pin} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

var board = new Board({
  io: new Raspi()
});

board.on('ready', function() {
  // pin configuration
  const PWMA = 'GPIO18'; //12 - motor A speed
  const AIN1 = 'GPIO24'; //18 - motor A dir
  const AIN2 = 'GPIO23'; //16 - motor A cdir
  const STBY = 'GPIO25'; //22 - 
  // const PWMB = 'GPIO17'; //11
  // const BIN1 = 'GPIO22'; //15
  // const BIN2 = 'GPIO27'; //13

  // instantiate pins
  let stby_pin = new Pin({pin:STBY, mode:Pin.OUTPUT});
  // let pwma_pin = new Pin({pin:PWMA, mode:Pin.PWM});
  let ain1_pin = new Pin({pin:AIN1, mode:Pin.OUTPUT});
  let ain2_pin = new Pin({pin:AIN2, mode:Pin.OUTPUT});

  board.on('fail', () => {
    stby_pin.low();
    console.log('I blew up');
  });

  board.on('exit', () => {
    stby_pin.low();
    console.log('successfully exited');
  });

  // Go forward at full speed
  console.log('starting motor');
  ain1_pin.high();
  ain2_pin.low();
  board.io.pwmWrite(PWMA, 255);
  stby_pin.high();

  // stop after two seconds
  board.wait(2000, ()=>{
    console.log('stopping motor');
    stby_pin.low();
    ain1_pin.low();
    ain2_pin.low();
    board.io.pwmWrite(PWMA, 0);
  });
});