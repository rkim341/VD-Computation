let font;
let currentSample = 0.10;
let targetSample  = 0.10;
const SAMPLE_MIN  = 0.01
const SAMPLE_MAX  = 0.1;

let speed = 2;          // current bobbing speed
let targetSpeed = 2;    // where we want the speed to go
const BASE_SPEED = 2;   // default speed
const MAX_SPEED  = 8;   // cap so it doesn't go wild

function preload() {
  font = loadFont("Velvelyne-Regular.otf"); // put the font next to your HTML
  fontImg = loadImage('apple.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}


  function draw() {
  background('white');
  noFill();
  strokeWeight(1);
  stroke('black');

  const txt  = "apple.";
  const size = 200;

  // Smoothly animate sampling
   currentSample = lerp(currentSample, targetSample, 0.1);
  speed         = lerp(speed, targetSpeed, 0.15);

  const b = font.textBounds(txt, 0, 0, size);
  const x = width/2  - (b.w/2 + b.x);
  const y = height/2 + (b.h/2 - (b.y - b.y));

  // Generate text outline points
  const pts = font.textToPoints(txt, x, y, size, {
    sampleFactor: currentSample,
    simplifyThreshold: 0
  });

  const t = millis() * 0.002 * speed;
  const amplitude = 10;

  // bob with a slight phase by x so it feels organic
  for (const p of pts) {
    const bob = sin(t + p.x * 0.02) * amplitude;
    image(fontImg, p.x, p.y + bob, 40, 40);
}}


  function mousePressed() {
   // pick a new random target within your preferred range
   targetSample = random(SAMPLE_MIN, SAMPLE_MAX);
   targetSpeed  = min(MAX_SPEED, targetSpeed * 1.6); // multiplicative bump
 }

 // SPACE: reset speed to default
function keyPressed() {
  if (key === ' ') {
    targetSpeed = BASE_SPEED;
    return false; // prevent page from scrolling on space
  }
}

 function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }}