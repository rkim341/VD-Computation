const GRID = 10;
const CELL = 1080 / GRID;

function setup() {
  createCanvas(1080, 1080);
  noStroke();
  // noLoop();
  frameRate(3);

}

function draw() {
  const cz = random (40, CELL);
  const sz = random (40, CELL);

  background (2255,255,220);
  for (let gy = 0; gy < GRID; gy++) {
    for (let gx = 0; gx < GRID; gx++) {

    const cy = gy * CELL + CELL / 2;
     const cx = gx * CELL + CELL / 2;
    // = 0 * 540 + 540 / 2
// 0 + 270
// cy = 27-

    push();
    blendMode(MULTIPLY);
    fill('cyan');
    circle(cx, cy, cz);
    pop();

    push();
    blendMode(MULTIPLY);
    translate(cx, cy);
    fill('pink');
    rectMode(CENTER);
    // const sz = random(300, 500);
    rect(0, 0, sz, sz);
    pop();
  }}
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }
}