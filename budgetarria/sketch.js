// Copy of a demo
// Michael
// Completely stolen

let grid;
let cellSize;
let mode = 1;
const GRID_SIZE = 10;
const VISIBLE_GRID_SIZE = 5; // i should turn this into a rectangle
const PLAYER = 9;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
let music;
let woah;
let gg;
let goodjob;  
let tile;
let wall;
let charactermodel;                              //todo: make it only render a chunk, grow trees, make basic gen, textures, physics, implement walls?
let state = "menu";
let boing;
let player = {
  x:4,
  y: 4,
};

function preload(){
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
    cellSize = height/VISIBLE_GRID_SIZE;
  }
  else{
    cellSize = width/VISIBLE_GRID_SIZE;
  }

  if (state === "menu"){
    background("black");
  }
  else{
    background(220);
    
    displayVisGrid();
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
  emptyArray[player.y][player.x] = PLAYER;
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
  emptyArray[player.y][player.x] = PLAYER;
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

function displayVisGrid(){
  for (let y = 0; y < VISIBLE_GRID_SIZE; y++){
    for (let x = 0; x < VISIBLE_GRID_SIZE; x++){
      let offsetx = 0;
      let offsety = 0;
      if (player.x < 2){
        offsetx = 2-player.x;
      }
      if (player.y < 2){
        offsety = 2-player.y;
      }
      if (player.y >= GRID_SIZE -2){
        offsety = GRID_SIZE-player.y-3;
      }
      if (player.x >= GRID_SIZE -2){
        offsetx = GRID_SIZE-player.x-3;
      }



      if (grid[y+player.y-2+offsety][x+player.x-2+offsetx] === IMPASSIBLE) {
        image(wall, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y+player.y-2+offsety][x+player.x-2+offsetx] === OPEN_TILE){
        image(tile, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y+player.y-2+offsety][x+player.x-2+offsetx] === PLAYER){
        image(goodjob, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}