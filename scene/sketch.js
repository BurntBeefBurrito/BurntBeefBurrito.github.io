// Rhythm Heaven't
// Michael Gorylev
// 3/12/24
//       offset text
// Extra for Experts:
// - I used arrays before they were introduced (3/11/24)

//temporary sprites were taken from https://phighting.fandom.com/wiki/Stickers
//use DFJK for the bumpers and space to summon notes

//images idk
let boom;
let bumperImage;
let arrowImage;

//variables relating to notes and lanes
let lanes; // the number of lanes lol, dont use more than 4 yet
let accuracy; // how much distance do you have to hit the notes? bigger is easier
let noteSpeed; //how fast the notes go zoom, measured in pixels per frame

//lists
let binds; //keybindings the user presses
let noteLane = []; //which lane are the notes in?
let noteDistance = []; //how many ms are the notes from the keys

//misc variables
let state; // is it in a menu, or playing?

//visual variables
let offsetx; //how offset are the lanes and things? This will be used for silly mechanics when i get around to them
let offsety; //i should turn these into lists or smth to make each lane independent and fun
let spacing; //how spaced are the lanes?
let rotation; //i legit have no idea how I'lll do this

//                                                     USE OBJECT NOTATION
//                                                     Maybe for mapping? setting notespeeds and kps'?
//picture heaven
function preload(){
  bumperImage = loadImage("images/Slingshotwoah.jpg");
  boom = loadImage("images/Boomboxgg.jpg");
  arrowImage = loadImage("images/SlingshotGoodJob.jpg");
}

function setup() {
  angleMode(DEGREES);
  lanes = 4;
  createCanvas(windowWidth, windowHeight);
  state = "play";
  binds = [68, 70, 74, 75, 83, 76];
  accuracy = 200;
  noteSpeed = 6;
  offsetx = 0;
  spacing = 240; //use 240
  imageMode(CENTER);
}

function draw() {
  background(220, 150, 220);
  //                                      THIS IS FOR ON SCREEN TEXT FEEL FREE TO CHANGE FOR TESTS
  text(windowHeight*0.8, 20, 20);
  text(noteDistance, 20, 50);
  
  if (state === "play"){
    playing();
  }
  if (state === "menu"){
    menu();
  } 
}

function menu(){ //only here because a menu is required :skull: also i dont wanna make this bc it makes testing slower
  //TBD
}

function playing(){ //this is the ceo of the thing being playable
  bumperMan();
  arrowMan();
  candyMan();
}

function bumperMan(){ //this draws the bumpers
  for(let i = 0; i < lanes; i++){

    image(bumperImage, windowWidth/2-spacing/2 + spacing / lanes * i + offsetx + spacing/2/lanes, windowHeight*0.8, 60, 60);

    if (keyIsDown(binds[i])){
      image(arrowImage, windowWidth/2-spacing/2 + spacing / lanes * i + offsetx + spacing/2/lanes, windowHeight*0.8, 60, 60);
      
    }
  }
}

function keyPressed(){ //this deletes notes around a bumper when its pressed
  for(let q = 0; q < lanes; q++){
    if (keyCode === binds[q]){

      for(let possibleNotes = 0; possibleNotes < noteDistance.length; possibleNotes++){

        if (noteDistance[possibleNotes] >= windowHeight*0.8 - accuracy && noteDistance[possibleNotes] 
          <= windowHeight*0.8 + accuracy && noteLane[possibleNotes] === q){
          noteDistance.splice(possibleNotes, 1); //shorten prev line plz and make this more consistent since it sometimes misses notes
          noteLane.splice(possibleNotes, 1);
        }
      }
    }
  }
}
function arrowMan(){ //this is an all you can eat buffet for note management

  if (keyIsDown(32)){ //this creates notes
    append(noteDistance, round(windowHeight*0.8 - 800));
    append(noteLane, round(random(0, lanes-1)));
  }

  for(let count = 0; count < noteDistance.length; count++){ //draws notes
    image(boom, windowWidth/2-spacing/2 + spacing / lanes * noteLane[count] + offsetx + spacing/2/lanes, noteDistance[count], 60, 60);
  }

  for(let count = 0; count < noteDistance.length; count++){ //does stuff that affects all notes
    
    for(let idfk = 0; idfk < noteSpeed; idfk++){ //this moves the notes
      noteDistance[count]++;
    }

    if(noteDistance[count] >= windowHeight){ //kills notes
      //i overcomplicated this so much for myself and spent like an hour and a half trying to make this work
      noteDistance.splice(count, 1);
      noteLane.splice(count, 1);
    }
  }
}

function candyMan(){ //short for eyecandy manager, this is the function i will use to make everything visually distracting :)
  spacing = mouseX - windowWidth/2;
  line(windowWidth/2, 0, windowWidth/2, windowHeight);


  // translate(100,100);
  // rotate(mouseX);
  // square(0, 0, 100);
  // pop();
  //rotating rotates the grid, not an individual object
}