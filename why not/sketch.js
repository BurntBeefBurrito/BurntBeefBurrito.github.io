// Copy of a demo
// Michael
// Completely stolen

// let grid = [[1, 0, 0, 1],
//             [0, 1, 0, 1],
//             [1, 1, 0, 0],
//             [1, 0, 1, 1],
//             [0, 0, 0, 1],
//             [0, 0, 1, 1],
//             [0, 1, 0, 1],
//             [0, 0, 0, 1]];

let grid;
let cellSize;
let mode = 1;
const GRID_SIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //if randomizing the grid, do this:
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  //this is dumb -- should check if this is the right size!
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