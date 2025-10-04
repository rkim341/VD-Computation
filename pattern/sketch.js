const GRID = 4;
const CELL = 1080 / GRID;
let isDaytime = false;


function setup() {
  createCanvas(1080, 1080);
  noStroke();
  // noLoop();
  frameRate(3);
  const currentHour = hour();
  isDaytime = (currentHour >= 7 && currentHour < 19);

}

function draw() {
  const cz = random(40, CELL);
  const sz = random(40, CELL);
  if (isDaytime == true) {
    background(236, 247, 253);
  } else {
    background(42, 60, 64);
  }

  for (let gy = 0; gy < GRID; gy++) {
    for (let gx = 0; gx < GRID; gx++) {

      const cy = gy * CELL + CELL / 2;
      const cx = gx * CELL + CELL / 2;

      push();
      blendMode(MULTIPLY);
      translate(cx, cy);
      fill('pink');
      rectMode(CENTER);
      // const sz = random(300, 500);
      rect(0, 0, sz, sz);
      pop();


      push();
      blendMode(MULTIPLY);
      translate(cx, cy); // origin @ each grid center
      // fill(255, 189, 108);
      fill('orange');

      // for (let x = 0; x < 3; x++) {
      rotate(random(TWO_PI));       // random rotation
      const s = random(30, (CELL - 5));   // side length
      const h = (sqrt(3) / 2) * s;  // height of equilateral triangle
      triangle(-s / 2, h / 3, s / 2, h / 3, 0, -2 * h / 3);
      // }
      pop();

      push();
      blendMode(OVERLAY);
      fill('yellow');
      circle(cx, cy, cz);
      pop();

      push();
      blendMode(MULTIPLY);
      fill(207, 150, 72);
      for (let x = 0; x < GRID; x++) {
        const mz = random(10, 40);
        const my = gy * CELL + CELL / random(1.5, 3);
        const mx = gx * CELL + CELL / random(1.5, 2.5);
        circle(mx, my, mz);
      }

      pop();

    }
  }
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }
}