
//All potential messages
let messages = [
  'Please wait', //0
  'Content loading', //1
  'Please wait', //2
  'Please hold the line', //3
  'Content loading', //4
  'Your call is very important to us', //5
  'No seriously', //6
  'Your call is very important to us', //7
  'How much longer is this going to take?', //8
  'Please wait', //9
  'I\'m not sure I can', //10
  'well u kinda have to', //11
  'Content loading', //12
  'waaaaaait a second', //13
  'WAIT ONE SECOND', //14
  'no wait', //15
  'No seriously', //16
  'Content loading?', //17
  'But how can content be loading?', //18
  'wait ooooone second', //19
  'the voicemails AAAARE the content', //20
  'NOOOOO wait', //21
  'there IIIS no content', //22
  'wait a second', //23
  'Call 020 388 05900' //24
];

//Variables
let startSecond, currentSecond;
let accumulatedSeconds = 0;
let messageCounter = 0;
let accumulatedPeriod = 0;
let periodMax = 75;

//Sound
let sound;

////////////////////////////////////////////////////////////
/////////////////////////PRELOAD////////////////////////////
////////////////////////////////////////////////////////////

function preload() {
  sound = loadSound('assets/solet.wav');
}


////////////////////////////////////////////////////////////
///////////////////////////SETUP////////////////////////////
////////////////////////////////////////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);
  startSecond = second();
  sound.play();
}

////////////////////////////////////////////////////////////
///////////////////////////DRAW/////////////////////////////
////////////////////////////////////////////////////////////



function draw() {
  background(255);

  //Positions for text placement
  let positions = [
    [400, height/2 - 50], //Top left
    [width-650, height/2 - 50], //Top right
    [width-650, height/2 + 50], //Bottom right
    [400, height/2 + 50], //Bottom left
  ];

  //Sets currentSecond as the second every time draw loop is run
  currentSecond = second();
  //If the current second doesn't match startSecond from setup, accumulatedSeconds increases
  //by one, as does the accumulatedPeriod value. Neither actually refers to seconds, but rather number
  //of times the draw loop has been run.
  if (currentSecond != startSecond){
    accumulatedSeconds++;
    accumulatedPeriod++;
    //This is so that when the seconds cycles back to the second on which 
    //the script is loaded, the progress bar doesn't pause for 1 second
    startSecond = -1;
    //If the accumulatedPeriod value hits the maximum value for each individual period of text,
    //it resets to zero
    if (accumulatedPeriod == periodMax){
      accumulatedPeriod = 0;
    }
  }
  

  ////////////////////////////////////////////////////////////
  ///////////////////////PROGRESS BAR/////////////////////////
  ////////////////////////////////////////////////////////////

  //Position
  //slidX variable maps accumulated seconds from between zero and the maximum period time for
  //every message in the messages array to be displayed to the screen size +- 50px
  let slidX = map(accumulatedSeconds, 0, messages.length*periodMax, 400, width-400);
  strokeWeight(50);

  //Ghost bar
  stroke(220);
  line(400, height/2, width-400, height/2);

  //Loading section of bar
  stroke(0);
  line(400, height/2, slidX, height/2);



  ////////////////////////////////////////////////////////////
  ///////////////////////TEXT/////////////////////////////////
  ////////////////////////////////////////////////////////////
  
  stroke(0);
  strokeWeight(0.5);
  textSize(15);
  
  //Whenever the loops in the current period hits the maximum value, the next message
  //is triggered
  if (accumulatedPeriod == periodMax-1) {
    messageCounter++;
  }
  
  //Position as determined by which message in the array is being displayed
  //Probably a more elegant way to do this
  
  //Central messages
  if (messageCounter == 0 || messageCounter == 1 || messageCounter == 2 || messageCounter == 4 || messageCounter == 9 || messageCounter == 12 || messageCounter == 17){
    text(messages[messageCounter], width/2 - 40, height/2 + 75);
    
    //Top left
  } else if (messageCounter == 3 || messageCounter == 8 || messageCounter == 14 || messageCounter == 19){
    text(messages[messageCounter], positions[0][0], positions[0][1]);

    //Top right
  } else if (messageCounter == 5 || messageCounter == 10 || messageCounter == 15 || messageCounter == 20){
    text(messages[messageCounter], positions[1][0], positions[1][1]);

    //Bottom right
  } else if (messageCounter == 6 || messageCounter == 11 || messageCounter == 16 || messageCounter == 21){
    text(messages[messageCounter], positions[2][0], positions[2][1]);

    //Bottom left
  } else if (messageCounter == 7 || messageCounter == 13 || messageCounter == 18 || messageCounter == 22){
    text(messages[messageCounter], positions[3][0], positions[3][1]);
  }
}
