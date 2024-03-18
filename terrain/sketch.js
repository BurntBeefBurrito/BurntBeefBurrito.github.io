//Yippee

let terrain = [];
let numberOfRects;
let rectWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberOfRects = windowWidth;
  rectWidth = width/numberOfRects;
  spawnRectangle(0, 200);
  generateTerrain();
  noStroke;
}

function draw() {
  background(220);

  for (let someRect of terrain){
    circle(someRect.x, someRect.y, someRect.w, someRect.h)
  }
}

function generateTerrain() {
  let time = 0;
  let deltaTime = 0.04;

  for (let x = 0; x < width; x += rectWidth){
    let theHeight = noise(time) * height;
    spawnRectangle(x, theHeight);
    time += deltaTime;
  }

}

function spawnRectangle(leftSide, rectHeight){
  let thisRect = {x: leftSide,
    y: height-rectHeight,
    w: rectWidth,
    h: rectHeight};
  terrain.push(thisRect);
}