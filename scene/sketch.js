// Rhythm Hell
// Michael Gorylev
// Not interested in a relationship
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//windowthings
let winx;
let winy;

//variables relating to notes and lanes
let lanes; // the number of lanes lol

let accuracyMS; // how many ms do you have to hit the notes? bigger is easier

//lists
let binds; //keybindings the user presses
let noteLane; //which lane are the notes in?
let noteDistance; //how many ms are the notes from the keys


//misc variables
let state; // is it in a menu, or playing?
let offset; //how offset are the lanes and things?

function preload(){
  arrowimage = loadImage("Slingshotwoah.jpg");
  boom = loadImage("Boomboxgg.jpg");
}

function setup() {
  lanes = 4;
  createCanvas(windowWidth, windowHeight);
  winx = windowWidth;
  winy = windowHeight;
  state = "play";
}

function draw() {
  background(220, 150, 220);
  text(round(millis()/1000), 20, 20);
  
  if (state === "play") {playing();}
  
}
function menu(){
  //TBD
}

function playing(){
  for(let i = 0; i < lanes; i++){
    image(arrowimage, winx/2-120 + 60 * i, winy - winy/5, 60, 60)
  }
}

function laneMan(){}

//how it should work
  // notes are in a list, 