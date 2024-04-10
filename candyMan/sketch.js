// fancy backgrounds and details
// Michael Gorylev
// 4/10/24
// Extra for Experts:

//this is a wacky thing to make candymans grand comeback

//variables yippee
let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  rectMode(CENTER);
  spawnObject();
}
function draw() {
  background(71, 130, 201);
  shapeDrawer();
  spawnObject();
}

function shapeDrawer() {
  for(let thing of shapes){
    rect(thing.x, thing.y, thing.objectWidth, thing.objectHeight);
    thing.x ++;
    thing.y ++;
  }
}

function spawnObject() { //copypasted from scene itself and tweaked to fit here (im lazy)
  let tempObject = {
    x: random(windowWidth),
    y: random(windowHeight),
    objectWidth: 11,
    objectHeight: 11,
    objectMode: 0, //this is what tells shapedrawer how this wants to act
  };
  shapes.push(tempObject);
}