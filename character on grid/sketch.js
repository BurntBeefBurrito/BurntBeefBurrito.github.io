// Copy of a demo
// Michael
// Completely stolen

let grid;
let cellSize;
let mode = 1;
const GRID_SIZE = 10;
const PLAYER = 9;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
let music;
let woah;
let gg;
let goodjob;
let state = "menu";
let boing;
let player = {
  x:0,
  y: 0,
};

function preload(){
  woah = loadImage("images/Slingshotwoah.jpg");
  gg = loadImage("images/Boomboxgg.jpg");
  goodjob = loadImage("images/SlingshotGoodJob.jpg");
  music = loadSound("audio/caketown.mp3");
  boing = loadSound("audio/boing.flac");
}

function setup() {
  music.setVolume(0.4);
  boing.setVolume(999.0);
  createCanvas(windowWidth, windowHeight);

  //if randomizing the grid, do this:
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  //this is dumb -- should check if this is the right size!
  noStroke();

  grid[player.y][player.x] = PLAYER;
  
}
function draw() {
  createCanvas(windowWidth, windowHeight);
  if(windowHeight < windowWidth){
    cellSize = height/grid.length;
  }
  else{
    cellSize = width/grid.length;
  }

  if (state === "menu"){
    background("black");
  }
  else{
    background(220);
    displayGrid();
  }



}

function keyPressed() {
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

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  // console.log(x, y);

  //fix this so we check if we fell off the top or left sides...

  //don't fall off the edge of the grid...
  toggleCell(x, y);
  if(mode === 1){
    toggleCell(x + 1, y);
    toggleCell(x - 1, y);
    toggleCell(x, y + 1);
    toggleCell(x, y - 1);
  }

}

function toggleCell(x, y) {
  //toggle the color of the cell
  if (x < GRID_SIZE && y < GRID_SIZE && x >=0 && y >= 0) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE;
    }
    else if(grid[y][x] === IMPASSIBLE){
      grid[y][x] = OPEN_TILE;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === IMPASSIBLE) {
        image(gg, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === OPEN_TILE){
        image(woah, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === PLAYER){
        image(goodjob, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      //square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
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
  return emptyArray;
}

function generateEmptyGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

function movePlayer(x, y){
  if (x < GRID_SIZE && y < GRID_SIZE && x >=0 && y >= 0 && grid[y][x] === OPEN_TILE) { //this keeps it on the grid

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