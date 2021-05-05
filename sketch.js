////////////////////////////////////////////////////////////
/////////////////////////TELECATION/////////////////////////
////////////////////////////////////////////////////////////

//ADDING NEW VOICEMAILS ===== FOLLOW ++++++++ SYMBOL ++++++++++
//++++++++ 6-STEP PROCESS ++++++++++//

////////////////////////////////////////////////////////////
/////////////////////DECLARATIONS///////////////////////////
////////////////////////////////////////////////////////////

//Variables
let startSecond, currentSecond;
let accumulatedSeconds = 0;
let state = 0;
let imageLoopX = 0;
let imageLoopY = 0;
let targetSize = 100;
let barLength = 3500; //Change to change length of loading period (use 3500)
let speed = 0.5; //Speed of files jittering
let single;
let greyPlay;
let greyDownload;
let playButton;
let switch1;
let switch2;
let welcome;

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
let vm9;
let clickVM9 = 0;
let vm10;
let clickVM10 = 0;
let vm11;
let clickVM11 = 0;
let vm12;
let clickVM12 = 0;

//++++++++ STEP 1 - DECLARE NEW VARIABLES ++++++++++

////////////////////////////////////////////////////////////
/////////////////////////PRELOAD////////////////////////////
////////////////////////////////////////////////////////////

function preload() {
  //Preload the composition
  composition = loadSound('assets/TELECATION.mp3');
  //Preload images
  single = loadImage('assets/single.png');
  greyPlay = loadImage('assets/grey_play.png');
  greyDownload = loadImage('assets/grey_download.png');
  greyPause = loadImage('assets/grey_pause.png');
  playButton = loadImage('assets/play_button.png');
  switch1 = loadImage('assets/switch1.png');
  switch2 = loadImage('assets/switch2.png');
  welcome = loadImage('assets/welcome.png');
  //Preload voicemails
  vm1 = loadSound('assets/voicemails/VM_1.mp3');
  vm2 = loadSound('assets/voicemails/VM_2.mp3');
  vm3 = loadSound('assets/voicemails/VM_3.mp3');
  vm4 = loadSound('assets/voicemails/VM_4.mp3');
  vm5 = loadSound('assets/voicemails/VM_5.mp3');
  vm6 = loadSound('assets/voicemails/VM_6.mp3');
  vm7 = loadSound('assets/voicemails/VM_7.mp3');
  vm8 = loadSound('assets/voicemails/VM_8.mp3');
  vm9 = loadSound('assets/voicemails/VM_9.mp3');
  vm10 = loadSound('assets/voicemails/VM_10.mp3');
  vm11 = loadSound('assets/voicemails/VM_11.mp3');
  vm12 = loadSound('assets/voicemails/VM_12.mp3');

  //++++++++ STEP 2 - LOAD NEW FILES ++++++++++
}

////////////////////////////////////////////////////////////
///////////////////////////SETUP////////////////////////////
////////////////////////////////////////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Define the second the setup function is run
  startSecond = second();


  //Resize image assets
  welcome.resize(width, 0);
  single.resize(targetSize, targetSize);
  greyPlay.resize(targetSize, targetSize);
  greyDownload.resize(targetSize, targetSize);
  greyPause.resize(targetSize, targetSize);
  playButton.resize(targetSize, targetSize);
  switch1.resize(targetSize, 0);
  switch2.resize(targetSize, 0);

}

////////////////////////////////////////////////////////////
///////////////////////////DRAW/////////////////////////////
////////////////////////////////////////////////////////////

function draw() {



  //Opening state
  if (state == 0) {
    background(0);
    image(welcome, 0, 0);
  }

  else if (state == 1) {
    background(0);

    //Sets currentSecond as the second every time draw loop is run
    currentSecond = second();
    //If the current second doesn't match startSecond from setup, accumulatedSeconds increases
    //by one, as does the accumulatedPeriod value. Neither actually refers to seconds, but rather number
    //of times the draw loop has been run.
    if (currentSecond != startSecond) {
      accumulatedSeconds++;

      //This is so that when the seconds cycles back to the second on which 
      //the script is loaded, the progress bar doesn't pause for 1 second
      startSecond = -1;
    }

    ////////////////////////////////////////////////////////////
    ///////////////////////PROGRESS BAR/////////////////////////
    ////////////////////////////////////////////////////////////
   

    //quarter of the screen size - the loading bar occurs in the middle 2/4 of the screen
    let quart = width/4;

    //slidX variable maps accumulated seconds from between zero and the maximum period time for
    //every message in the messages array to be displayed to the screen size +- 400px
    let slidX = map(accumulatedSeconds, 0, barLength, quart, quart*3, true);

    //d is the distance between the start of the bar and where slidX is based on accumulatedSeconds
    let d = dist(quart, height/2, slidX, height/2);

    noStroke();

    //Ghost bar
    fill(220);
    rect(quart, height/2, quart*2, 20);

    //Loading bar
    fill(255);
    rect(quart, height/2, d, 20);


    //When bar reaches the end, triggers state 2
    if (slidX == quart*3) {
      state = 2;
    }
  }

  ////////////////////////////////////////////////////////////
  ///////////////////////LOADED///////////////////////////////
  ////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////
  //////////////////////STATE 2///////////////////////////////
  ////////////////////////////////////////////////////////////

  //State 2 just draws over the previous frame, and is seperate from State 3 so that
  //the loop does not continually draw over the 'loading' files
  else if (state == 2) {
    frameRate(60);
    background(255);
    fill(0);
    textSize(100);
    text('020 388 05900', width / 2 - 350, height / 2);
    state = 3;
  }

  ////////////////////////////////////////////////////////////
  //////////////////////STATE 3///////////////////////////////
  ////////////////////////////////////////////////////////////

  //State 3 draws the loading files one by one
  //This is just for show - they will be drawn over again in the next state
  //using a nested for loop

  else if (state == 3) {
    //Slow this bit down
    frameRate(20);
    if (imageLoopX < width) {
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
      state = 4;
    }
  }

  ////////////////////////////////////////////////////////////
  //////////////////////STATE 4///////////////////////////////
  ////////////////////////////////////////////////////////////

  //State 4 redraws all of the files that were 'loaded' in the previous state
  //If a file contains a clickable voicemail, it is loaded grey
  else if (state == 4) {
    frameRate(60);
    background(255);
    noStroke();
    fill(0);
    textSize(100);
    text('020 388 05900', width / 2 - 350, height / 2);

    for (let i = 0; i < width; i += targetSize) {
      for (let j = 0; j < height; j += targetSize) {


          //++++++++ STEP 3 - CHOOSE POSITION FOR GREY ICON ++++++++++
          //++++++++ i = X, j = Y ++++++++++
          //++++++++ 900, 500 is 10th column, 6th row  ++++++++++
        
          //Playable files
        if ( (i == 400 && j == 0) || (i == 500 && j == 0) || (i == 700 && j == 0)
        || (i == 100 && j == 100) || (i == 300 && j == 100) || (i == 1100 && j == 200)
        || (i == 600 && j == 300) || (i == 100 && j == 400) || (i == 400 && j == 400) 
        || (i == 900 && j == 500) || (i == 200 && j == 200) || (i == 700 && j == 500)){
          image(greyPlay, i, j);



          //All non-clickable files
        } else {
          image(single, i + random(-speed, speed), j + random(-speed, speed));
        }
      }
    }

    //Toggle button in playback state
    image(switch1, width-200, height-200);

    //Fade out composition
    composition.fade(0, 2);
  }




  ////////////////////////////////////////////////////////////
  //////////////////////STATE 5///////////////////////////////
  ////////////////////////////////////////////////////////////

  //Download state
  //Most of state 4 repeated to keep files moving
  else if (state == 5) {

    frameRate(60);
    background(255);
    noStroke();
    fill(0);
    textSize(100);
    text('020 388 05900', width / 2 - 350, height / 2);

    for (let i = 0; i < width; i += targetSize) {
      for (let j = 0; j < height; j += targetSize) {

        //++++++++ STEP 4 - REPEAT STEP 3 ++++++++++

        //Clickable files
        if ( (i == 400 && j == 0) || (i == 500 && j == 0) || (i == 700 && j == 0)
        || (i == 100 && j == 100) || (i == 300 && j == 100) || (i == 1100 && j == 200)
        || (i == 600 && j == 300) || (i == 100 && j == 400) || (i == 400 && j == 400) 
        || (i == 900 && j == 500) || (i == 200 && j == 200) || (i == 700 && j == 500)){
          image(greyDownload, i, j);


          //All non-clickable files
        } else {
          image(single, i + random(-speed, speed), j + random(-speed, speed));
        }
      }
    }

    //Toggle button in download state
    image(switch2, width-200, height-200);
  }

  //Draw loop closes here
}

////////////////////////////////////////////////////////////
/////////////////////MOUSE CLICKED//////////////////////////
////////////////////////////////////////////////////////////


function mouseClicked() {

  //Some browsers require a user interaction to allow audio playback
  if (state == 0) {
    userStartAudio();

    //Begin playing sound
    composition.play();

    state = 1;
  }

  ////////////////////////////////////////////////////////////
  /////////////////////PLAYBACK(5)////////////////////////////
  ////////////////////////////////////////////////////////////

  //In the playback state, one click on a file plays its audio
  //A second click stops it
  else if (state == 4) {

    //Voicemail 1
    if (mouseX >= 425 && mouseX <= 472 && mouseY >= 10 && mouseY <= 70) {
      if (clickVM1 == 0) {
        vm1.play();
        clickVM1 = 1;
      } else {
        vm1.stop();
        clickVM1 = 0;
      }

      //Voicemail 2
    } else if (mouseX >= 525 && mouseX <= 572 && mouseY >= 10 && mouseY <= 70) {
      if (clickVM2 == 0) {
        vm2.play();
        clickVM2 = 1;
      } else {
        vm2.stop();
        clickVM2 = 0;
      }

      //Voicemail 3
    } else if (mouseX >= 725 && mouseX <= 772 && mouseY >= 10 && mouseY <= 70) {
      if (clickVM3 == 0) {
        vm3.play();
        clickVM3 = 1;
      } else {
        vm3.stop();
        clickVM3 = 0;
      }

      //Voicemail 4
    } else if (mouseX >= 125 && mouseX <= 172 && mouseY >= 110 && mouseY <= 170) {
      if (clickVM4 == 0) {
        vm4.play();
        clickVM4 = 4;
      } else {
        vm4.stop();
        clickVM4 = 0;
      }

      //Voicemail 5
    } else if (mouseX >= 325 && mouseX <= 372 && mouseY >= 110 && mouseY <= 170) {
      if (clickVM5 == 0) {
        vm5.play();
        clickVM5 = 1;
      } else {
        vm5.stop();
        clickVM5 = 0;
      }

      //Voicemail 6
    } else if (mouseX >= 1125 && mouseX <= 1172 && mouseY >= 210 && mouseY <= 270) {
      if (clickVM6 == 0) {
        vm6.play();
        clickVM6 = 1;
      } else {
        vm6.stop();
        clickVM6 = 0;
      }

      //Voicemail 7
    } else if (mouseX >= 625 && mouseX <= 672 && mouseY >= 310 && mouseY <= 370) {
      if (clickVM7 == 0) {
        vm7.play();
        clickVM7 = 1;
      } else {
        vm7.stop();
        clickVM7 = 0;
      }

      //Voicemail 8
    } else if (mouseX >= 125 && mouseX <= 172 && mouseY >= 410 && mouseY <= 470) {
      if (clickVM8 == 0) {
        vm8.play();
        clickVM8 = 1;
      } else {
        vm8.stop();
        clickVM8 = 0;
      }

      //Voicemail 9
    } else if (mouseX >= 425 && mouseX <= 472 && mouseY >= 410 && mouseY <= 470) {
      if (clickVM9 == 0) {
        vm9.play();
        clickVM9 = 1;
      } else {
        vm9.stop();
        clickVM9 = 0;
      }

      //Voicemail 10
    } else if (mouseX >= 925 && mouseX <= 972 && mouseY >= 510 && mouseY <= 570) {
      if (clickVM10 == 0) {
        vm10.play();
        clickVM10 = 1;
      } else {
        vm10.stop();
        clickVM10 = 0;
      }

      //Voicemail 11
    } else if (mouseX >= 225 && mouseX <= 272 && mouseY >= 210 && mouseY <= 270) {
      if (clickVM11 == 0) {
        vm11.play();
        clickVM11 = 1;
      } else {
        vm11.stop();
        clickVM11 = 0;
      }

      //Voicemail 12
    } else if (mouseX >= 725 && mouseX <= 772 && mouseY >= 510 && mouseY <= 570) {
      if (clickVM12 == 0) {
        vm12.play();
        clickVM12 = 1;
      } else {
        vm12.stop();
        clickVM12 = 0;
      }

      //++++++++ STEP 5 - PLAY/STOP FUNCTION ++++++++++
      //++++++++ i = 100 y = 100 from the image coordinates would translate to ++++++++++
      //++++++++ X: 125 - 172 /// Y: 110 - 170 ++++++++++

    //If toggle button is clicked in playback state, move to download state
    } else if (mouseX > width - 160 && mouseX < width - 131 && mouseY > height - 170 && mouseY < height - 115) {
      state = 5;
    }
  }





  ////////////////////////////////////////////////////////////
  /////////////////////DOWNLOAD(6)////////////////////////////
  ////////////////////////////////////////////////////////////

  //If toggle button is clicked in download state, move to playback state
  else if (state == 5) {
    if (mouseX > width - 160 && mouseX < width - 131 && mouseY > height - 170 && mouseY < height - 115) {
      state = 4;
    }

    //One click on a file in state 6 will download it

    else if (mouseX >= 425 && mouseX <= 472 && mouseY >= 10 && mouseY <= 70) {
      vm1.save('vm1');
    } else if (mouseX >= 525 && mouseX <= 572 && mouseY >= 10 && mouseY <= 70) {
      vm2.save('vm2');
    } else if (mouseX >= 725 && mouseX <= 772 && mouseY >= 10 && mouseY <= 70) {
      vm3.save('vm3');
    } else if (mouseX >= 125 && mouseX <= 172 && mouseY >= 110 && mouseY <= 170) {
      vm4.save('vm4');
    } else if (mouseX >= 325 && mouseX <= 372 && mouseY >= 110 && mouseY <= 170) {
      vm5.save('vm5');
    } else if (mouseX >= 1125 && mouseX <= 1172 && mouseY >= 210 && mouseY <= 270) {
      vm6.save('vm6');
    } else if (mouseX >= 625 && mouseX <= 672 && mouseY >= 310 && mouseY <= 370) {
      vm7.save('vm7');
    } else if (mouseX >= 125 && mouseX <= 172 && mouseY >= 410 && mouseY <= 470) {
      vm8.save('vm8');
    } else if (mouseX >= 425 && mouseX <= 472 && mouseY >= 410 && mouseY <= 470){
      vm9.save('vm9');
    } else if (mouseX >= 925 && mouseX <= 972 && mouseY >= 510 && mouseY <= 570){
      vm10.save('vm10');
    } else if (mouseX >= 225 && mouseX <= 272 && mouseY >= 210 && mouseY <= 270){
      vm11.save('vm11');
    } else if (mouseX >= 725 && mouseX <= 772 && mouseY >= 510 && mouseY <= 570){
      vm12.save('vm12');
    }

    //++++++++ STEP 6 - SAVE FUNCTION ++++++++++
    //++++++++ Same coorindates as step 5 ++++++++++
  }

  //Mouse clicked ends here
}


//Resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}