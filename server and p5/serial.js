var serial; // variable to hold an instance of the serialport library

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/tty.usbmodem14201'; // fill in your serial port name here
var options = {
  baudrate: 9600
}; // change the data rate to whatever you wish
var inData;


var socket = io.connect();
let time;

let hours, mins, secs;
let norcount, sinecount, squcount, tricount;
let pnorcount, psinecount, psqucount, ptricount; // previous counts
let norsecs, sinesecs, squsecs, trisecs;
let psecs; // previous seconds
let reset, count;

let arr1 =[2,3,4,5]; // arranagement
let arr2 = [2,3,4,5];

//create an audio context
	window.AudioContext = window.AudioContext || window.webkitAudioContext
	var audioContext = new AudioContext()

	//set the context
	StartAudioContext(audioContext, ".starterButton").then(function(){
		document.querySelector("#isStarted").textContent = "Started"
	})

socket.on('connect', function() {
  console.log("Serial Connected");
  console.log(socket.id);
});

var sendmessage = function(inData) {
  socket.emit('senddata',inData);
  // console.log ("sending data");
};

socket.on('displaydata', function (inData) {
  // console.log(inData);
  time = inData;
}
);

let fontclock;
let tick;

function preload() {
  fontclock = loadFont('7segment.ttf');
    tick = loadSound('tick.wav');
}

function setup() {
  textFont(fontclock);
  textSize(2048/6.5);
  textAlign(CENTER);
  createCanvas(1536, 2048);
  serial = new p5.SerialPort(); // make a new instance of the serialport
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.open(portName, options);
}


function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // inData = Number(serial.read());
  inData = serial.readLine();
  if (inData){
    sendmessage(inData);
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

function draw() {
  // if(inData) {
  //   background(255);
  //   text (inData,30,30);
  // }
  // if(time){
  //     background(255);
  //     textSize (50);
  //     text (time,80,80);
  // }

  background(0);
  fill (255);
  // ALWAYS SET ONCE BEFORE SHOW TO RESTARTS SECS VALUE

  if (time) {

    // text(inData, 30, 30);
    let splitString = split(time, ',');
    state = int(splitString[0]);
    hours = splitString[1];
    mins = splitString[2];
    secs = int(splitString[3]);
    // console.log(state, hours, mins, secs);
  }

  if (psecs > secs) {
    reset = millis();
    norcount = count;
    sinecount = 0;
    squcount = 0;
    tricount = 0;
    arr2 = shuffle(arr1);
    // background(255,0,0);
  }
  count = millis() - reset;
  // count = count / 1000;

  norcount = count / 1000;
  norcount = floor(norcount);
  // text(hours + " : " + mins + " : " + norcount, 10, 30);

  i = map(count, 0, 60000, 0, 360);
  sineVal = sin(radians(i));
  sineVal = map(sineVal, 1, -1, -5, 5); // set interval
  sinecount = floor(count / 1000 + sineVal);
  // text(hours + " : " + mins + " : " + sinecount, 10, 50);

  if (count > 30000) {
    sqVal = ((millis() - n) * 2)
  } else {
    sqVal = 0;
    n = millis();
  }
  squcount = floor(sqVal / 1000);
  // text(hours + " : " + mins + " : " + squcount, 10, 70);

  //   // this is the value that you should be incrementing at given point in time
  // m = map (count % 60000,0,60000,2,0);
  //   if (frameCount% 60 ==0) {
  // tricount = tricount + m;
  //   }
  m = map (count,0,60000,0,90);
  triVal = sin(radians(m));
  tricount = floor(map(triVal, 0,1, 0,60)); // set interval


  // text(hours + " : " + mins + " : " + tricount, 10, 90);
  psecs = secs;

  // addzero(norcount);
  // addzero(sinecount);
  // addzero(squcount);
  // addzero(tricount);

  if (norcount<10) {
    norcount = "0" + norcount;
  }
  if (sinecount<10) {
    sinecount = "0" + sinecount;
  }
  if (squcount<10) {
    squcount = "0" + squcount;
  }
  if (tricount<10) {
    tricount = "0" + tricount;
  }

  //background text
noStroke();
fill(22);
  text(88 + ":" + 88 + ":" + 88, width / 2, height / 6 *   arr2[0] - (2048 / 7.5 / 2));
  text(88 + ":" + 88 + ":" + 88, width / 2, height / 6 *   arr2[1] - (2048 / 7.5 / 2));
  text(88 + ":" + 88 + ":" + 88, width / 2, height / 6 *  arr2[2] - (2048 / 7.5 / 2));
  text(88 + ":" + 88 + ":" + 88, width / 2, height / 6 *  arr2[3] - (2048 / 7.5 / 2));

  noStroke();
  fill(255);
  text(hours + ":" + mins + ":" + norcount, width / 2, height / 6 *   arr2[0] - (2048 / 7.5 / 2));
  text(hours + ":" + mins + ":" + sinecount, width / 2, height / 6 *   arr2[1] - (2048 / 7.5 / 2));
  text(hours + ":" + mins + ":" + squcount, width / 2, height / 6 *  arr2[2] - (2048 / 7.5 / 2));
  text(hours + ":" + mins + ":" + tricount, width / 2, height / 6 *  arr2[3] - (2048 / 7.5 / 2));


  if (frameCount%30 >15) {
    if (state == 1) {
      strokeWeight(3);
      stroke(0);
      fill(0);
      text(hours + "     ", width/2+18, height/6*2 - (2048/7.5/2));
      text(hours + "     ", width/2+18, height/6*3 - (2048/7.5/2));
      text(hours + "     ", width/2+18, height/6*4 - (2048/7.5/2));
      text(hours + "     ", width/2+18, height/6*5 - (2048/7.5/2));

    }else if (state ==2) {
      strokeWeight(3);
      stroke(0);
      fill(0);
      text(mins, width/2, height/6*2 - (2048/7.5/2));
      text(mins, width/2, height/6*2 - (2048/7.5/2));
      text(mins, width/2, height/6*3 - (2048/7.5/2));
      text(mins, width/2, height/6*4 - (2048/7.5/2));
      text(mins, width/2, height/6*5 - (2048/7.5/2));
    }
  }

  if (pnorcount < norcount) {
    tick.play();
  }
  if (psinecount < sinecount) {
    tick.play();
  }
  if (psqucount < squcount) {
    tick.play();
  }
  if (ptricount < tricount) {
    tick.play();
  }

  pnorcount = norcount;
  psinecount = sinecount;
  psqucount = squcount;
  ptricount = tricount;

}
