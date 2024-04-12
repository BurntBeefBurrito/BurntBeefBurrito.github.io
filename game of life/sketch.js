// Conways game of life at home
// Michael
// Partly stolen

// let grid = [[1, 0, 0, 1],
//             [0, 1, 0, 1],
//             [1, 1, 0, 0],
//             [1, 0, 1, 1],
//             [0, 0, 0, 1],
//             [0, 0, 1, 1],
//             [0, 1, 0, 1],
//             [0, 0, 0, 1]];

let grid;
let nextTurn;
let cellSize;
let mode = 1;
const GRID_SIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //if randomizing the grid, do this:
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  noStroke();
  
}
function draw() {
  createCanvas(windowWidth, windowHeight);
  if(windowHeight < windowWidth){
    cellSize = height/grid.length;
  }
  else{
    cellSize = width/grid.length;
  }

  background(220);
  displayGrid();

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
  if (key === " "){
    updateGrid();
  }
}

function mousePressed() {
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
  //toggle the color of the cell
  if (x < GRID_SIZE && y < GRID_SIZE && x >=0 && y >= 0) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }
      else {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
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

function updateGrid() {
  nextTurn = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){
      ruleCheck(x, y);
    }
  }
}

function ruleCheck(x, y) {
  let neighbors = 0;
  for(let a = -1; a < 1; a++){ //1 or 2?
    for(let b = -1; b < 1; b++){
      if(x+a >= 0 && x+a <GRID_SIZE && y+b >= 0 && y+b <GRID_SIZE){
        neighbors += grid[y+a][x+b];
      }
    }
  }
  neighbors -= grid[y][x];

  if(grid[y][x] === 1){
    if(neighbors === 2 || neighbors === 3){
      nextTurn[y][x] = 1;
    }
  }
  else {
    if(neighbors === 3){
      nextTurn[y][x] = 1;
    }
  }
}