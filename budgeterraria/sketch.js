// 2d block game thing
// Michael
//source spaghetti has nothing on this

let grid;
let cellSize;
let mode = -1;
const GRID_SIZE = 50; //needs to be greater than the visgrid height AND width
const VISIBLE_GRID_SIZE = { //odd numbers strongly recommended
  w: 17, //width
  h: 9, //height
};
const PLAYER = 9;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const COPPER = 2;
let music;
let woah;
let gg;
let goodjob;  
let tile, wall, copper, wood, dirt;
let charactermodel;         //todo: make basic gen, grow trees, get better placeholders, physics, implement walls?
let state = "menu";         //program for the future I suppose
let boing;
let player = {
  x: 2,
  y: 0,
  ontile: OPEN_TILE,
};

function preload(){ //man I SURE WONDER WHAT THE PRELOAD FUNCTION DOES
  goodjob = loadImage("images/SlingshotGoodJob.jpg");// for the record this is a jpeg because its funny (to me), so the white square is intentional
  music = loadSound("audio/caketown.mp3");
  boing = loadSound("audio/boing.flac");
  tile = loadImage("images/floor.png");
  wall = loadImage("images/stone.png");    //these are 256 by 256 textures, scaled up from 16x16 to maintain pixel crispness
  copper = loadImage("images/copper.png");
  dirt = loadImage("images/dirt.png");
  wood = loadImage("images/wood.png");
}

function setup() {
  music.setVolume(0.4);
  boing.setVolume(999.0);
  createCanvas(windowWidth, windowHeight);

  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  grid[player.y][player.x] = PLAYER;
  noSmooth();
  VISIBLE_GRID_SIZE.wf = Math.floor(VISIBLE_GRID_SIZE.w/2); //width floor
  VISIBLE_GRID_SIZE.wc = Math.ceil(VISIBLE_GRID_SIZE.w/2); //width ceiling
  VISIBLE_GRID_SIZE.hf = Math.floor(VISIBLE_GRID_SIZE.h/2); //height floor
  VISIBLE_GRID_SIZE.hc = Math.ceil(VISIBLE_GRID_SIZE.h/2); //height ceiling
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  if(windowHeight < windowWidth){
    cellSize = height/VISIBLE_GRID_SIZE.h;
  }
  else{
    cellSize = width/VISIBLE_GRID_SIZE.w;
  }

  if (state === "menu"){
    background("black");
    text("hit space to start the thing, use wasd, e, r, t and left click to do stuff", windowWidth/2 - 150, windowHeight/2);
  }
  else{
    background(135, 196, 235);
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

  let offsetx = 0;
  let offsety = 0;
  if (player.x < VISIBLE_GRID_SIZE.wf){
    offsetx = VISIBLE_GRID_SIZE.wf-player.x;  
  }
  if (player.y < VISIBLE_GRID_SIZE.hf){
    offsety = VISIBLE_GRID_SIZE.hf-player.y;
  }
  if (player.y >= GRID_SIZE -VISIBLE_GRID_SIZE.hf){
    offsety = GRID_SIZE-player.y-VISIBLE_GRID_SIZE.hc;
  }
  if (player.x >= GRID_SIZE -VISIBLE_GRID_SIZE.wf){
    offsetx = GRID_SIZE-player.x-VISIBLE_GRID_SIZE.wc;
  }
  x += player.x - VISIBLE_GRID_SIZE.wf + offsetx;
  y += player.y - VISIBLE_GRID_SIZE.hf + offsety;

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
    else if(grid[y][x] !== OPEN_TILE && grid[y][x] !== PLAYER){
      grid[y][x] = OPEN_TILE;
    }
  }
}

function generateRandomGrid(cols, rows) { //random world gen
  let emptyArray = [];//generates the surface
  for (let y = 0; y < rows/4; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 97) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  for (let y = 0; y < rows/2; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 3) {
        emptyArray[y].push(2);
      }
      else {
        emptyArray[y].push(2);
      }
    }
  }
  for (let y = 0; y < rows/2; y++) {//generates the underground
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      //half the time, be a 1. Other half, be a 0.
      if (random(100) < 25) {
        emptyArray[y+rows/2].push(0);
      }
      else if(random(100) < 5){
        emptyArray[y+rows/2].push(2);
      }
      else {
        emptyArray[y+rows/2].push(1);
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
    let ontile = grid[y][x]; //remembers what tile the player is standing on
    let oldX = player.x;
    let oldY = player.y;

    player.x = x;
    player.y = y;

    grid[player.y][player.x] = PLAYER;
    grid[oldY][oldX] = player.ontile;
    player.ontile = ontile;
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
      if (player.x < VISIBLE_GRID_SIZE.wf){
        offsetx = VISIBLE_GRID_SIZE.wf-player.x;  //gonna need to do something about the miracle numbers
      }
      if (player.y < VISIBLE_GRID_SIZE.hf){
        offsety = VISIBLE_GRID_SIZE.hf-player.y;
      }
      if (player.y >= GRID_SIZE -VISIBLE_GRID_SIZE.hf){
        offsety = GRID_SIZE-player.y-VISIBLE_GRID_SIZE.hc;
      }
      if (player.x >= GRID_SIZE -VISIBLE_GRID_SIZE.wf){
        offsetx = GRID_SIZE-player.x-VISIBLE_GRID_SIZE.wc;
      }

      if (grid[y+player.y-VISIBLE_GRID_SIZE.hf+offsety][x+player.x-VISIBLE_GRID_SIZE.wf+offsetx] === IMPASSIBLE) {
        image(wall, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      //else if (grid[y+player.y-VISIBLE_GRID_SIZE.hf+offsety][x+player.x-VISIBLE_GRID_SIZE.wf+offsetx] === OPEN_TILE){
      //  image(tile, x * cellSize, y * cellSize, cellSize, cellSize);
      //}
      else if (grid[y+player.y-VISIBLE_GRID_SIZE.hf+offsety][x+player.x-VISIBLE_GRID_SIZE.wf+offsetx] === PLAYER){
        image(goodjob, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y+player.y-VISIBLE_GRID_SIZE.hf+offsety][x+player.x-VISIBLE_GRID_SIZE.wf+offsetx] === COPPER){
        image(copper, x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
} //  ) *matches your unmatched parenthesis*