////////////////////////////////////////////////////////////
/////////////////////////TELECATION/////////////////////////
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
/////////////////////TO DO//////////////////////////////////
////////////////////////////////////////////////////////////

//Finish composition
//Less messages
//Add voicemail files
//Align files with assets

////////////////////////////////////////////////////////////
/////////////////////DECLARATIONS///////////////////////////
////////////////////////////////////////////////////////////

//All potential messages
let messages = [
  'Please wait',
  'Please wait',
  'Content loading',
  'Content loading',
  'Please wait',
  'Please wait',
  'Please hold the line',
  'Content loading',
  'Content loading',
  'Your call is very important to us',
  'No seriously',
  'Your call is very important to us',
  'How much longer is this going to take?',
  'Please wait',
  'Please wait',
  'I\'m not sure I can',
  'well u kinda have to',
  'Content loading',
  'Content loading',
  'waaaaaait a second',
  'WAIT ONE SECOND',
  'no wait',
  'No seriously',
  'Content loading?',
  'Content loading?',
  'But how can content be loading?',
  'wait ooooone second',
  'the voicemails AAAARE the content',
  'NOOOOO wait',
  'there IIIS no content',
  'wait a second',
  'Call 020 388 05900'
];

//Arrays
let randomised = [];
let positions = [];

//Variables
let startSecond, currentSecond, positionChoice, randomisedChoice;
let accumulatedSeconds = 0;
let messageCounter = 0;
let accumulatedPeriod = 0;
let state = 0;
let imageLoopX = 0;
let imageLoopY = 0;
let targetSize = 100;
let periodMax = 100; //Change this to change length of each individual message

//Sound
let sound;







////////////////////////////////////////////////////////////
/////////////////////////PRELOAD////////////////////////////
////////////////////////////////////////////////////////////


function preload() {
  //Preload the sound
  sound = loadSound('assets/solet.mp3');
  //Preload single file image
  single = loadImage('assets/single.png');
}











////////////////////////////////////////////////////////////
///////////////////////////SETUP////////////////////////////
////////////////////////////////////////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Define the second the setup function is run
  startSecond = second();

  //Begin playing sound
  sound.play();

  //Create 15 (arbitrary number) random positions onscreen for the text to jump between
  //These are pushed as nested arrays to the positions array
  for (let i = 0; i < 15; i++) {

    //To prevent messages appearing in the loading bar area, the display
    //is split into 4 quadrants. The random number selection below will only
    //choose co-ordinates within the selected quadrant to prevent overlapping
    //with the loading bar.
    let quadrantSelect = int(random(0, 3));

    //Top left
    if (quadrantSelect == 0) {
      let nestX = random(10, width / 2);
      let nestY = random(10, (height / 2) - 50);
      let nest = [nestX, nestY];
      positions.push(nest);

      //Top right
    } else if (quadrantSelect == 1) {
      let nestX = random(width / 2, width - 200);
      let nestY = random(10, (height / 2) - 50);
      let nest = [nestX, nestY];
      positions.push(nest);

      //Bottom left
    } else if (quadrantSelect == 2) {
      let nestX = random(10, width / 2);
      let nestY = random((height / 2) + 50, height - 10);
      let nest = [nestX, nestY];
      positions.push(nest);

      //Bottom right
    } else if (quadrantSelect == 3) {
      let nestX = random(width / 2, width - 200);
      let nestY = random((height / 2) + 50, height - 10);
      let nest = [nestX, nestY];
      positions.push(nest);

    }
  }

  //For every message, choose a random integer up to the number of available positions
  //These are pushed to the "randomised" array
  for (let i = 0; i < messages.length; i++) {
    positionChoice = (int(random(positions.length)));
    randomised.push(positionChoice);
  }
}









////////////////////////////////////////////////////////////
///////////////////////////DRAW/////////////////////////////
////////////////////////////////////////////////////////////



function draw() {
  if (state == 0) {
    background(255);

    //Sets currentSecond as the second every time draw loop is run
    currentSecond = second();
    //If the current second doesn't match startSecond from setup, accumulatedSeconds increases
    //by one, as does the accumulatedPeriod value. Neither actually refers to seconds, but rather number
    //of times the draw loop has been run.
    if (currentSecond != startSecond) {
      accumulatedSeconds++;
      accumulatedPeriod++;
      //This is so that when the seconds cycles back to the second on which 
      //the script is loaded, the progress bar doesn't pause for 1 second
      startSecond = -1;
      //If the accumulatedPeriod value hits the maximum value for each individual period of text,
      //it resets to zero
      if (accumulatedPeriod == periodMax) {
        accumulatedPeriod = 0;
      }
    }












    ////////////////////////////////////////////////////////////
    ///////////////////////PROGRESS BAR/////////////////////////
    ////////////////////////////////////////////////////////////

    //Position
    //slidX variable maps accumulated seconds from between zero and the maximum period time for
    //every message in the messages array to be displayed to the screen size +- 50px
    let slidX = map(accumulatedSeconds, 0, messages.length * periodMax, 400, width - 400, true);
    strokeWeight(50);

    //Ghost bar
    stroke(220);
    line(400, height / 2, width - 400, height / 2);

    //Loading section of bar
    stroke(0);
    line(400, height / 2, slidX, height / 2);














    ////////////////////////////////////////////////////////////
    ///////////////////////TEXT/////////////////////////////////
    ////////////////////////////////////////////////////////////

    stroke(0);
    strokeWeight(0.5);
    textSize(15);

    //Whenever the loops in the current period hits the maximum value, the next message
    //is triggered
    if (accumulatedPeriod == periodMax - 1) {
      messageCounter++;
    }

    //Position as determined by which message in the array is being displayed

    //Central messages
    if (messages[messageCounter] == 'Please wait' ||
      messages[messageCounter] == 'Content loading') {
      text(messages[messageCounter], width / 2 - 40, height / 2 + 75);

      //Last message triggers loaded function
    } else if (messageCounter == (messages.length - 1)) {
      //Trigger loaded state
      state = 1;

      //If the message isn't one of the central ones, it takes its position from its equivalent
      //entry in the "randomised" array, which in turn relates to one of the nested arrays in
      //the "positions" array
    } else {
      randomisedChoice = randomised[messageCounter];
      text(messages[messageCounter], positions[randomisedChoice][0], positions[randomisedChoice][1]);
    }
  }








  ////////////////////////////////////////////////////////////
  ///////////////////////LOADED///////////////////////////////
  ////////////////////////////////////////////////////////////




  ////////////////////////////////////////////////////////////
  //////////////////////STATE 1///////////////////////////////
  ////////////////////////////////////////////////////////////

  //State 1 just draws over the previous frame, and is seperate from State 2 so that
  //the loop does not continually draw over the 'loading' files
  else if (state == 1) {
    background(255);
    textSize(100);
    text('020 388 05900', width / 2 - 320, height / 2);
    state = 2;
  }


  ////////////////////////////////////////////////////////////
  //////////////////////STATE 2///////////////////////////////
  ////////////////////////////////////////////////////////////

  //State 2 draws the loading files one by one
  //This is just for show - they will be drawn over again in the next state
  //using a much tidier nested for loop

  else if (state == 2) {
    //Slow this bit down
    frameRate(20);
    if (imageLoopX < width) {
      //Resize single file image every time
      single.resize(targetSize, targetSize);
      //Draw single file
      image(single, imageLoopX, imageLoopY);
      //Increase X position by size of image
      imageLoopX += targetSize;
      //When X reaches the end of the screen
    } else if (imageLoopX >= width) {
      //It resets to 0 and Y increases by the size of the image
      imageLoopX = 0;
      imageLoopY += targetSize;
    }

    //When Y reaches the end of the screen
    if (imageLoopY >= height) {
      //State 3 is triggered
      state = 3;
    }
  }

  ////////////////////////////////////////////////////////////
  //////////////////////STATE 3///////////////////////////////
  ////////////////////////////////////////////////////////////


  //State 3 redraws all of the files that were 'loaded' in the previous state
  else if (state == 3) {
    frameRate(60);
    background(255);
    text('020 388 05900', width / 2 - 320, height / 2);
    for (let i = 0; i < width; i += targetSize) {
      for (let j = 0; j < height; j += targetSize) {
        single.resize(targetSize, targetSize);
        image(single, i, j);
        textSize(50);
      }
      state = 4;
    }
  }



  ////////////////////////////////////////////////////////////
  //////////////////////STATE 4///////////////////////////////
  ////////////////////////////////////////////////////////////

  else if (state == 4) {
  }



  //CLOSE DRAW LOOP HERE
}






////////////////////////////////////////////////////////////
/////////////////////MOUSE CLICKED//////////////////////////
////////////////////////////////////////////////////////////


function mouseClicked() {
  //1st row, 5th file
  if (mouseX >= 425 && mouseX <= 472 && mouseY >= 10 && mouseY <= 70) {
    console.log('File 1');

    //Play voicemail 1

    //1st row, 6th file
  } else if (mouseX >= 525 && mouseX <= 572 && mouseY >= 10 && mouseY <= 70) {
    console.log('File 2');

    //Play voicemail 2

    //1st row, 8th file
  } else if (mouseX >= 725 && mouseX <= 772 && mouseY >= 10 && mouseY <= 70) {
    console.log('File 3');

    //Play voicemail 3

    //2nd row, 2nd file
  } else if (mouseX >= 125 && mouseX <= 172 && mouseY >= 110 && mouseY <= 170) {
    console.log('File 4');

    //Play voicemail 4

    //2nd row, 4th file
  } else if (mouseX >= 325 && mouseX <= 372 && mouseY >= 110 && mouseY <= 170) {
    console.log('File 5');

    //Play voicemail 5

    //3rd row, 12th file
  } else if (mouseX >= 1125 && mouseX <= 1172 && mouseY >= 210 && mouseY <= 270) {
    console.log('File 6');

    //Play voicemail 6

    //4th row, 7th file
  } else if (mouseX >= 625 && mouseX <= 672 && mouseY >= 310 && mouseY <= 370) {
    console.log('File 7');

    //Play voicemail 7

    //5th row, 10th file
  } else if (mouseX >= 925 && mouseX <= 972 && mouseY >= 410 && mouseY <= 470) {
    console.log('File 8');

    //Play voicemail 8
  }
}







