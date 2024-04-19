// 2d block game thing
// Michael
// partly stolen

let grid;
let cellSize;
let mode = 1;
const GRID_SIZE = 12;
const VISIBLE_GRID_SIZE = { //add a cure for miracle numbers
  w: 7,
  h: 5,
};
const PLAYER = 9;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
let music;
let woah;
let gg;
let goodjob;  
let tile;
let wall;
let charactermodel;         //todo: improve clicking, make basic gen, grow trees, get better placeholders, physics, implement walls? also get some decent sleep
let state = "menu";
let boing;
let player = {
  x: 2,
  y: 2,
};

function preload(){ //man I SURE WONDER WHAT THE PRELOAD FUNCTION DOES
  goodjob = loadImage("images/SlingshotGoodJob.jpg");
  music = loadSound("audio/caketown.mp3");
  boing = loadSound("audio/boing.flac");
  tile = loadImage("images/floor.png");
  wall = loadImage("images/wall.png");
}

function setup() {
  music.setVolume(0.4);
  boing.setVolume(999.0);
  createCanvas(windowWidth, windowHeight);

  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  noStroke();

  grid[player.y][player.x] = PLAYER;
  
}
function draw() {
  createCanvas(windowWidth, windowHeight);
  if(windowHeight < windowWidth){
    cellSize = height/VISIBLE_GRID_SIZE.h;
  }
  else{
    cellSize = width/VISIBLE_GRID_SIZE.h;
  }

  if (state === "menu"){
    background("black");
  }
  else{
    background(0);
    
    displayVisGrid();
  }



}

function keyPressed() { //causes various things to happen when keys are pressed
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "t") {
    mode = 0 - mode;
  }
  if (key === "w") {
    movePlayer(player.x + 0, player.y -1); //0 on x, -1 on y...
  }
  if (key === "s") {
    movePlayer(player.x, player.y + 1);
  }
  if (key === "a") {
    movePlayer(player.x -1, player.y); 
  }
  if (key === "d") {
    movePlayer(player.x + 1, player.y);
  }
  if (key === " " && state === "menu"){
    state = "thing";
    music.loop();
  }
}

function mousePressed() { //transforms tiles when clicked on, please improve
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);
  if(mode === 1){
    toggleCell(x + 1, y);
    toggleCell(x - 1, y);
    toggleCell(x, y + 1);
    toggleCell(x, y - 1);
  }

}

function toggleCell(x, y) {
  //toggle the cells type
  if (x < GRID_SIZE && y < GRID_SIZE && x >=0 && y >= 0) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE;
    }
    else if(grid[y][x] === IMPASSIBLE){
      grid[y][x] = OPEN_TILE;
    }
  }
}

function generateRandomGrid(cols, rows) { //random world gen
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      //half the time, be a 1. Other half, be a 0.
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  emptyArray[player.y][player.x] = PLAYER;
  return emptyArray;
}

function generateEmptyGrid(cols, rows) { //make an empty grid, handy for testing screensizes
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      emptyArray[y].push(0);
    }
  }
  emptyArray[player.y][player.x] = PLAYER;
  return emptyArray;
}

function movePlayer(x, y){ //moves the player
  if (x < GRID_SIZE && y < GRID_SIZE && x >=0 && y >= 0 && grid[y][x] !== IMPASSIBLE) { //this keeps it on the grid
    let onTile; //remembers what tile the player is standing on
    let oldX = player.x;
    let oldY = player.y;

    player.x = x;
    player.y = y;

    grid[player.y][player.x] = PLAYER;
    grid[oldY][oldX] = OPEN_TILE;
  }
  else {
    boing.play();
  }
}

function displayVisGrid(){ //paints pretty pictures
  for (let y = 0; y < VISIBLE_GRID_SIZE.h; y++){
    for (let x = 0; x < VISIBLE_GRID_SIZE.w; x++){
      let offsetx = 0;
      let offsety = 0;
      if (player.x < 3){
        offsetx = 3-player.x;  //gonna need to do something about the miracle numbers
      }
      if (player.y < 2){
        offsety = 2-player.y;
      }
      if (player.y >= GRID_SIZE -2){
        offsety = GRID_SIZE-player.y-3;
      }
      if (player.x >= GRID_SIZE -3){
        offsetx = GRID_SIZE-player.x-4;
      }

      if (grid[y+player.y-2+offsety][x+player.x-3+offsetx] === IMPASSIBLE) {
        image(wall, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y+player.y-2+offsety][x+player.x-3+offsetx] === OPEN_TILE){
        image(tile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y+player.y-2+offsety][x+player.x-3+offsetx] === PLAYER){
        image(goodjob, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
} //  ) *matches your unmatched parenthesis*