let messages = [
  'Please wait',
  'Content loading',
  'Please wait',
  'Please hold the line',
  'Content loading',
  'Your call is very important to us',
  'No seriously',
  'Your call is very important to us',
  'How much longer is this going to take?',
  'Please wait',
  'I\'m not sure I can',
  'well u kinda have to',
  'Content loading',
  'waaaaaait a second',
  'WAIT ONE SECOND',
  'no wait',
  'No seriously',
  'Content loading?',
  'But how can content be loading?',
  'wait ooooone second',
  'the voicemails AAAARE the content',
  'NOOOOO wait',
  'there IIIS no content',
  'wait a second',
  'Call 020 388 05900'
];

let startSecond;
let currentSecond;
let accumulatedSeconds = 0;
let messageCounter = 0;
let accumulatedPeriod = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  startSecond = second();
}

function draw() {
  background(255);
  currentSecond = second();
  if (currentSecond != startSecond){
    accumulatedSeconds++;
    accumulatedPeriod++;
    if (accumulatedPeriod == 400){
      accumulatedPeriod = 0;
    }
  }
  
  //Progress bar
  let slidX = map(accumulatedSeconds, 0, 10000, 50, width-50);
  strokeWeight(50);

  //Ghost bar
  stroke(220);
  line(50, height/2, width-50, height/2);

  //Loading section of bar
  stroke(0);
  line(50, height/2, slidX, height/2);

  //Text
  stroke(0);
  strokeWeight(0.5);
  textSize(15);
  if (accumulatedPeriod == 399) {
    messageCounter++;
  }
  text(messages[messageCounter], width/2 - 40, height/2 + 75);
}
