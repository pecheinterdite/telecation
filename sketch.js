////////////////////////////////////////////////////////////
/////////////////////////TELECATION/////////////////////////
////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
/////////////////////TO DO//////////////////////////////////
////////////////////////////////////////////////////////////

//Finish composition
//Align files with assets

////////////////////////////////////////////////////////////
/////////////////////DECLARATIONS///////////////////////////
////////////////////////////////////////////////////////////

//All potential messages
let messages = [
  //3.5 secs
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  //3.5 secs
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  //3.5 secds
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  //3.5 secs
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  //2 secs
  'Please hold the line',
  'Please hold the line',
  'Please hold the line',
  'Please hold the line',
  //2 secs
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  //2 secs
  'Your call is very important to us',
  'Your call is very important to us',
  'Your call is very important to us',
  'Your call is very important to us',
  //1 sec
  'No seriously',
  'No seriously',
  //2 secs
  'Your call is very important to us',
  'Your call is very important to us',
  'Your call is very important to us',
  'Your call is very important to us',
  //3.5 secs
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  //3.5 secs
  'Content loading?',
  'Content loading?',
  'Content loading?',
  'Content loading?',
  'Content loading?',
  'Content loading?',
  'Content loading?',
  //3.5 secs
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  //3.5 secs
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  'Content loading',
  //3.5 secs
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  'Please wait',
  //3.5 secs
  'Content',
  'Content',
  'Content',
  'Content',
  'Content',
  'Content',
  'Content',
  //3.5 secs
  'Please',
  'Please',
  'Please',
  'Please',
  'Please',
  'Please',
  'Please',
  //3.5 secs
  'loading?',
  'loading?',
  'loading?',
  'loading?',
  'loading?',
  'loading?',
  'loading?',
  //3.5 secs
  'Wait',
  'Wait',
  'Wait',
  'Wait',
  'Wait',
  'Wait',
  'Wait'
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
let periodMax = 27; //Change this to change length of each individual message - use 27 for 1 min

//Composition
let composition;

//Voicemails
let vm1;
let clickVM1 = 0;
let vm2;
let clickVM2 = 0;
let vm3;
let clickVM3 = 0;
let vm4;
let clickVM4 = 0;
let vm5;
let clickVM5 = 0;
let vm6;
let clickVM6 = 0;
let vm7;
let clickVM7 = 0;
let vm8;
let clickVM8 = 0;







////////////////////////////////////////////////////////////
/////////////////////////PRELOAD////////////////////////////
////////////////////////////////////////////////////////////


function preload() {
  //Preload the composition
  composition = loadSound('assets/TELECATION.mp3');
  //Preload single file images
  single = loadImage('assets/single.png');
  greyed = loadImage('assets/greyed_single.png');
  //Preload voicemails
  vm1 = loadSound('assets/voicemails/VM_1.mp3');
  vm2 = loadSound('assets/voicemails/VM_2.mp3');
  vm3 = loadSound('assets/voicemails/VM_3.mp3');
  vm4 = loadSound('assets/voicemails/VM_4.mp3');
  vm5 = loadSound('assets/voicemails/VM_5.mp3');
  vm6 = loadSound('assets/voicemails/VM_6.mp3');
  vm7 = loadSound('assets/voicemails/VM_7.mp3');
  vm8 = loadSound('assets/voicemails/VM_8.mp3');
}











////////////////////////////////////////////////////////////
///////////////////////////SETUP////////////////////////////
////////////////////////////////////////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Define the second the setup function is run
  startSecond = second();

  //Begin playing sound
  composition.play();

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
    text('Call', width / 2 - 320, height / 2 - 60);
    text('020 388 05900', width / 2 - 320, height / 2 + 60);
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
  //If a file contains a clickable voicemail, it is loaded grey
  else if (state == 3) {
    frameRate(60);
    background(255);
    text('Call', width / 2 - 320, height / 2 - 60);
    text('020 388 05900', width / 2 - 320, height / 2 + 60);

    for (let i = 0; i < width; i += targetSize) {
      for (let j = 0; j < height; j += targetSize) {

        //Voicemail 1
        if (i == 400 && j == 0) {
          greyed.resize(targetSize, targetSize);
          image(greyed, i, j);

          //Voicemail 2
        } else if (i == 500 && j == 0) {
          greyed.resize(targetSize, targetSize);
          image(greyed, i, j);

          //Voicemail 3
        } else if (i == 700 && j == 0) {
          greyed.resize(targetSize, targetSize);
          image(greyed, i, j);

          //Voicemail 4
        } else if (i == 100 && j == 100) {
          greyed.resize(targetSize, targetSize);
          image(greyed, i, j);

          //Voicemail 5
        } else if (i == 300 && j == 100) {
          greyed.resize(targetSize, targetSize);
          image(greyed, i, j);

          //Voicemail 6
        } else if (i == 1100 && j == 200) {
          greyed.resize(targetSize, targetSize);
          image(greyed, i, j);

          //Voicemail 7
        } else if (i == 600 && j == 300) {
          greyed.resize(targetSize, targetSize);
          image(greyed, i, j);

          //Voicemail 8
        } else if (i == 900 && j == 400) {
          greyed.resize(targetSize, targetSize);
          image(greyed, i, j);

          //All non-clickable files
        } else {
          single.resize(targetSize, targetSize);
          image(single, i, j);
        }
      }
    }
    state = 4;
    composition.stop();
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
    if (clickVM1 == 0) {
      vm1.play();
      clickVM1 = 1;
    } else {
      vm1.stop();
      clickVM1 = 0;
    }

    //1st row, 6th file
  } else if (mouseX >= 525 && mouseX <= 572 && mouseY >= 10 && mouseY <= 70) {
    if (clickVM2 == 0) {
      vm2.play();
      clickVM2 = 1;
    } else {
      vm2.stop();
      clickVM2 = 0;
    }

    //1st row, 8th file
  } else if (mouseX >= 725 && mouseX <= 772 && mouseY >= 10 && mouseY <= 70) {
    if (clickVM3 == 0) {
      vm3.play();
      clickVM3 = 1;
    } else {
      vm3.stop();
      clickVM3 = 0;
    }

    //2nd row, 2nd file
  } else if (mouseX >= 125 && mouseX <= 172 && mouseY >= 110 && mouseY <= 170) {
    if (clickVM4 == 0) {
      vm4.play();
      clickVM4 = 4;
    } else {
      vm4.stop();
      clickVM4 = 0;
    }

    //2nd row, 4th file
  } else if (mouseX >= 325 && mouseX <= 372 && mouseY >= 110 && mouseY <= 170) {
    if (clickVM5 == 0) {
      vm5.play();
      clickVM5 = 1;
    } else {
      vm5.stop();
      clickVM5 = 0;
    }

    //3rd row, 12th file
  } else if (mouseX >= 1125 && mouseX <= 1172 && mouseY >= 210 && mouseY <= 270) {
    if (clickVM6 == 0) {
      vm6.play();
      clickVM6 = 1;
    } else {
      vm6.stop();
      clickVM6 = 0;
    }

    //4th row, 7th file
  } else if (mouseX >= 625 && mouseX <= 672 && mouseY >= 310 && mouseY <= 370) {
    if (clickVM7 == 0) {
      vm7.play();
      clickVM7 = 1;
    } else {
      vm7.stop();
      clickVM7 = 0;
    }

    //5th row, 10th file
  } else if (mouseX >= 925 && mouseX <= 972 && mouseY >= 410 && mouseY <= 470) {
    if (clickVM8 == 0) {
      vm8.play();
      clickVM8 = 1;
    } else {
      vm8.stop();
      clickVM8 = 0;
    }
  }
}









