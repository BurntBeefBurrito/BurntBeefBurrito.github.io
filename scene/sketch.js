// Rhythm Hell
// Michael Gorylev
// Not interested in a relationship
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//windowthings
let winx;
let winy;

//images idfk
let boom;
let bumperImage;
let arrowImage;

//variables relating to notes and lanes
let lanes; // the number of lanes lol, dont use more than 4 yet
let accuracyMS; // how many ms do you have to hit the notes? bigger is easier

//lists
let binds; //keybindings the user presses
let noteLane = []; //which lane are the notes in?
let noteDistance = []; //how many ms are the notes from the keys


//misc variables
let state; // is it in a menu, or playing?
let offset; //how offset are the lanes and things?

//picture heaven
function preload(){
  bumperImage = loadImage("images/Slingshotwoah.jpg");
  boom = loadImage("images/Boomboxgg.jpg");
  arrowImage = loadImage("images/SlingshotGoodJob.jpg");
}

function setup() {
  lanes = 4;
  createCanvas(windowWidth, windowHeight);
  winx = windowWidth;
  winy = windowHeight;
  state = "play";
  binds = [68, 70, 74, 75, 83, 76];
}

function draw() {
  background(220, 150, 220);
  text(noteDistance, 20, 20);
  
  if (state === "play") {
    playing();
  }
  
}
function menu(){
  //TBD
}

function playing(){
  bumperMan();
  arrowMan();
}

function bumperMan(){
//this draws the bumpers
  for(let i = 0; i < lanes; i++){
    image(bumperImage, winx/2-120 + 240 / lanes * i, winy - winy/5, 60, 60);
    if (keyIsDown(binds[i])){
      image(arrowImage, winx/2-120 + 240 / lanes * i, winy - winy/5, 60, 60);
    }
  }
}

function arrowMan(){
  if (keyIsDown(32)){
    append(noteDistance, round(random(0, winy)));
    append(noteLane, round(random(0, 3)));
  }

  for(let count = 0; count < noteDistance.length; count++){ //draws notes
    image(boom, winx/2-120 + 240 / lanes * noteLane[count], noteDistance[count], 60, 60);
  }

  for(let count = 0; count < noteDistance.length; count++){ //draws notes
    noteDistance[count]++;
    if(noteDistance[count] >= winy - winy/5){
      noteDistance[count] = "";
    }
  }

}