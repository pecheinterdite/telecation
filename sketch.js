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

function setup() {
  createCanvas(windowWidth, windowHeight);
  startSecond = second();
}

function draw() {
  background(255);
  currentSecond = second();
  if (currentSecond != startSecond){
    accumulatedSeconds++;
    console.log(accumulatedSeconds);
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
    strokeWeight(1);

    if (accumulatedSeconds < 400){
      text(messages[0], 50, height/2 - 50);

    } else if (accumulatedSeconds >= 400 && accumulatedSeconds < 800){
      text(messages[1], 50, height/2 - 50);

    } else if (accumulatedSeconds >= 800 && accumulatedSeconds < 1200){
      text(messages[2], 50, height/2 - 50);

    } else if (accumulatedSeconds >= 1200 && accumulatedSeconds < 1600){
      text(messages[3], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 1600 && accumulatedSeconds < 2000){
      text(messages[4], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 2000 && accumulatedSeconds < 2400){
      text(messages[5], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 2400 && accumulatedSeconds < 2800){
      text(messages[6], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 2800 && accumulatedSeconds < 3200){
      text(messages[7], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 3200 && accumulatedSeconds < 3600){
      text(messages[8], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 3600 && accumulatedSeconds < 4000){
      text(messages[9], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 4000 && accumulatedSeconds < 4400){
      text(messages[10], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 4400 && accumulatedSeconds < 4800){
      text(messages[11], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 4800 && accumulatedSeconds < 5200){
      text(messages[12], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 5200 && accumulatedSeconds < 5600){
      text(messages[13], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 5600 && accumulatedSeconds < 6000){
      text(messages[14], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 6000 && accumulatedSeconds < 6400){
      text(messages[15], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 6400 && accumulatedSeconds < 6800){
      text(messages[16], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 6800 && accumulatedSeconds < 7200){
      text(messages[17], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 7200 && accumulatedSeconds < 7600){
      text(messages[18], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 7600 && accumulatedSeconds < 8000){
      text(messages[19], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 8000 && accumulatedSeconds < 8400){
      text(messages[20], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 8400 && accumulatedSeconds < 8800){
      text(messages[21], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 8800 && accumulatedSeconds < 9200){
      text(messages[22], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 9200 && accumulatedSeconds < 9600){
      text(messages[23], 50, height/2 - 50);
      
    } else if (accumulatedSeconds >= 9600 && accumulatedSeconds < 10000){
      text(messages[24], 50, height/2 - 50);
      
    }

}
