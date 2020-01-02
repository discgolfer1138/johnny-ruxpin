const {Board, Motor} = require('johnny-five');
const Raspi = require('raspi-io').RaspiIO;

var board = new Board({
  io: new Raspi()
});

board.on('ready', function() {
  let PWMA = 'GPIO18'; //12
  let AIN2 = 'GPIO23'; //16
  let AIN1 = 'GPIO24'; //18

  // let STBY = 'GPIO25'; //22

  // let PWMB = 'GPIO17'; //11
  // let BIN2 = 'GPIO27'; //13
  // let BIN1 = 'GPIO22'; //15

  const eyes =  new Motor({
    pins: {
      pwm: PWMA,
      dir: AIN2,
      cdir: AIN1
    }
  });

  // eyes.on('forward', function(err) {
  //   console.log(err);
  //   // demonstrate braking after 5 seconds
  //   board.wait(3000, function() {
  //     eyes.stop();
  //   });
  // });

  eyes.stop().forward(200);
});