// Rhythm Heaven't
// Michael Gorylev
// 3/27/24
//        offset text
// Extra for Experts:
// - I used arrays before they were introduced (3/11/24)

//temporary sprites were taken from https://phighting.fandom.com/wiki/Stickers
//use DFJK for the bumpers you dont manually spawn notes anymore :)

//images idk
let boom;
let bumperImage;
let bumperDownImage;

//variables relating to notes and lanes
let lanes; // the number of lanes lol, dont use more than 4 yet
let accuracy; // how much distance do you have to hit the notes? bigger is easier
let noteSpeed; //how fast the notes go zoom, measured in pixels per frame
let tempNote; //this is to make coding new notes easier ig
let noteTraits = []; //the updated lane and distance array

//misc variables
let state; // is it in a menu, or playing?
let binds; //keybindings the user presses

//visual variables
let offsetx; //how offset are the lanes and things? This will be used for silly mechanics when i get around to them
let spacing; //how spaced are the lanes?

//                              THINGS TO DO
//                              make a separate project for cool backgrounds then merge it into this
//                              bring back candyman some time (for making stuff look nice)
//                              how do i use multiple .js files together? or at least hide functions when i dont need to look in them
//picture heaven
function preload(){
  bumperImage = loadImage("images/Slingshotwoah.jpg");
  boom = loadImage("images/Boomboxgg.jpg");
  bumperDownImage = loadImage("images/SlingshotGoodJob.jpg");
}

function setup() {
  angleMode(DEGREES);
  lanes = 4;
  createCanvas(windowWidth, windowHeight);
  state = "menu";
  binds = [68, 70, 74, 75, 83, 76];
  accuracy = 200;
  noteSpeed = 6;
  offsetx = 0;
  spacing = 240; //use 240
  imageMode(CENTER);

  let tempNote = {
    speed: noteSpeed,
    lane: round(random(0, lanes-1)),
    distance: round(windowHeight + 100),

  };
  noteTraits.push(tempNote);
}

function draw() {
  background(220, 150, 220);
  if (state === "play"){
    playing();
  }
  if (state === "menu"){
    menu();
  } 
}

function menu(){ //only here because a menu is required :skull: also i dont wanna make this bc it makes testing slower
  text("This is a very high budget menu. hit left click to play the thing", windowWidth/2 - 150, windowHeight/2);
  if (mouseIsPressed){
    state = "play";
  }
}

function playing(){ //this is the ceo of the thing being playable
  bumperMan();
  arrowMan();
  spawnNote();

  //                                      THIS IS FOR ON SCREEN TEXT FEEL FREE TO CHANGE FOR TESTS
  text(noteTraits.length, 20, 20);

}

function bumperMan(){ //this draws the bumpers
  for(let i = 0; i < lanes; i++){

    if (keyIsDown(binds[i])){
      image(bumperDownImage, windowWidth/2-spacing/2 + spacing / lanes * i + offsetx + spacing/2/lanes, windowHeight*0.8, 60, 60);
    }
    else{
      image(bumperImage, windowWidth/2-spacing/2 + spacing / lanes * i + offsetx + spacing/2/lanes, windowHeight*0.8, 60, 60);
    }
  }
}

function keyPressed(){ //this deletes notes around a bumper when its pressed, only one at a time now
  for(let q = 0; q < lanes; q++){
    if (keyCode === binds[q]){

      for(let possibleNotes = 0; possibleNotes < noteTraits.length; possibleNotes++){ 

        if (noteTraits[possibleNotes].distance >= windowHeight*0.8 - accuracy && noteTraits[possibleNotes].distance 
          <= windowHeight*0.8 + accuracy && noteTraits[possibleNotes].lane === q){
          noteTraits.splice(possibleNotes, 1);
          possibleNotes = noteTraits.length+40;
        }
      }
    }
  }
}
function arrowMan(){ //this is an all you can eat buffet for note management

  for(let note of noteTraits){ 
    image(boom, windowWidth/2-spacing/2 + spacing / lanes * note.lane + offsetx + spacing/2/lanes, note.distance, 60, 60); //draws notes
    note.distance += note.speed; //moves notes
  }

  for (let i = 0; i < noteTraits.length; i++){//kills notes
    if(noteTraits[i].distance >= windowHeight){ 
      noteTraits.splice(i, 1);
    }
  }
}

function spawnNote() {
  let tempNote = {
    speed: noteSpeed,
    lane: round(random(0, lanes-1)),
    distance: round(windowHeight*0.8 - 800),

  };
  noteTraits.push(tempNote);
}