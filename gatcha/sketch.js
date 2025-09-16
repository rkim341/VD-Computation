let body;
let face;

function preload() {
  body = loadImage('body.png');
  face = loadImage('1.png');

  // get random face
  face = loadImage(int(random(1, 5)) + ".png");
  let imgName = n + ".png";  
  face = loadImage(imgName); 
}

function setup() {
  createCanvas(400, 400);
  
  let button = createButton('🍀');
  button.position(10, 10);

  button.mousePressed(() => {
    let n = int(random(1, 5));
    let imgName = n + ".png";
    face = loadImage(imgName);
  }); 
}

function draw() {
  background("skyblue");
  image(body, 0, 0);
  image(face, 155.5, 125.5);

}
