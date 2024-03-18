// Rhythm Heaven't
// Michael Gorylev
// 3/12/24
//       offset text
// Extra for Experts:
// - I used arrays before they were introduced (3/11/24)

//temporary sprites were taken from https://phighting.fandom.com/wiki/Stickers
//use DFJK for the bumpers and space to summon notes

//windowthings
let winx;
let winy;

//images idk
let boom;
let bumperImage;
let arrowImage;

//variables relating to notes and lanes
let lanes; // the number of lanes lol, dont use more than 4 yet
let accuracy; // how much distance do you have to hit the notes? bigger is easier
let noteSpeed; //how fast the notes go zoom, measured in pixels per frame
let one; //this will make only one note get removed when a key is pressed

//lists
let binds; //keybindings the user presses
let bindnames; //the names for keybindings, may be handy
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
  bindnames = ["KeyD", "KeyF", "KeyJ", "KeyK"];
  accuracy = 200;
  noteSpeed = 6;
}

function draw() {
  background(220, 150, 220);

  //                                      THIS IS FOR ON SCREEN TEXT FEEL FREE TO CHANGE FOR TESTS
  text(winy*0.8, 20, 20);
  text(noteDistance, 20, 50);
  
  if (state === "play"){
    playing();
  }
  if (state === "menu"){
    menu();
  }
  
}

function menu(){ //only here because a menu is required :skull:
  //TBD
}

function playing(){ //this is the ceo of the thing being playable
  bumperMan();
  arrowMan();
}

function bumperMan(){
//this draws the bumpers
  for(let i = 0; i < lanes; i++){

    image(bumperImage, winx/2-120 + 240 / lanes * i, winy*0.8, 60, 60);

    if (keyIsDown(binds[i])){
      image(arrowImage, winx/2-120 + 240 / lanes * i, winy*0.8, 60, 60);
      
    }
  }
}

function keyPressed(){ //this deletes notes around a bumper when its pressed
  for(let q = 0; q < lanes; q++){
    if (keyCode === binds[q]){

      for(let possibleNotes = 0; possibleNotes < noteDistance.length; possibleNotes++){

        if (noteDistance[possibleNotes] >= winy*0.8 - accuracy && noteDistance[possibleNotes] 
          <= winy*0.8 + accuracy && noteLane[possibleNotes] === q){

          noteDistance.splice(possibleNotes, 1); //shorten prev line plz
          noteLane.splice(possibleNotes, 1);
        }
      }
    }
  }
}
function arrowMan(){ //this is an all you can eat buffet for note management

  if (keyIsDown(32)){ //this creates notes
    append(noteDistance, round(winy*0.8 - 800));
    append(noteLane, round(random(0, 3)));
  }

  for(let count = 0; count < noteDistance.length; count++){ //draws notes
    image(boom, winx/2-120 + 240 / lanes * noteLane[count], noteDistance[count], 60, 60);
  }

  for(let count = 0; count < noteDistance.length; count++){ //does stuff that affects all notes
    
    for(let idfk = 0; idfk < noteSpeed; idfk++){ //this moves the notes
      noteDistance[count]++;
    }

    if(noteDistance[count] >= winy){ //kills notes
      //i overcomplicated this so much for myself and spent like an hour and a half trying to make this work
      noteDistance.splice(count, 1);
      noteLane.splice(count, 1);
    }
  }
}