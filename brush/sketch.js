//let colors = ['#000000', '#e91e63', '#3f51b5', '#4caf50', '#ff9800'];
//let ci = 0;
//let mic, micOn = false, btn;

// let rainbow = ['#ff0000','#ff7f00','#ffff00','#00ff00','#0000ff','#4b0082','#8f00ff'];
// let offsets = [-6, -4, -2, 0, 2, 4, 6]; //numbers depend on stroke weight

function preload() {
 brushImg = loadImage('tomato.png'); // replace 'brush.png' with your actual file name
 brushImg2 = loadImage('basil.png'); // replace 'brush.png' with your actual file name
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(10);
  background(255);
   imageMode(CENTER);
     stroke('#FAF3DC');
  //     mic = new p5.AudioIn();
  // btn = createButton('Mic: OFF');
  // btn.position(10, 10);
  // btn.mousePressed(toggleMic);
}
function draw() {
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
    }
     if (keyIsDown(32)) {
  image(brushImg, mouseX, mouseY, 50, 50);
  }
   if (keyIsDown(17)) {
  image(brushImg2, mouseX, mouseY, 50, 50);
  }
}



// function draw() {
//   if (mouseIsPressed){
  //line(pmouseX, pmouseY, mouseX, mouseY)
//let v = dist(mouseX, mouseY, pmouseX, pmouseY);
  //rect(mouseX - v/2, mouseY -v/2, v, v);
  //for velocity
//image(brushImg, mouseX, mouseY, 100, 100);
    // direction of motion
    // let dx = mouseX - pmouseX;
    // let dy = mouseY - pmouseY;
    // // perpendicular unit vector (-dy, dx)
    // let mag = sqrt(dx*dx + dy*dy);
    // let px = 0, py = 0;
    // if (mag > 0) {
    //   px = -dy / mag;
    //   py =  dx / mag;
  // }
  // for (let i = 0; i < rainbow.length; i++) {
  //     stroke(rainbow[i]);
  //     let off = offsets[i];
  //     let x1 = pmouseX + px * off;
  //     let y1 = pmouseY + py * off;
  //     let x2 =  mouseX + px * off;
  //     let y2 =  mouseY + py * off;
  //     line(x1, y1, x2, y2);
  //   }
//   // }
// }

//function mouseClicked() {
  //ci = (ci + 1) % colors.length;
  //stroke(colors[ci]);}


//sound brush
//   function draw() {
//   if (mouseIsPressed) {
//     let level = micOn ? mic.getLevel() : 0;
//     let w = 2 + level * 160; // base 2px, add size from sound
//     strokeWeight(w);
//     line(pmouseX, pmouseY, mouseX, mouseY);
//   }
// }

// function toggleMic() {
//   if (!micOn) {
//     getAudioContext().resume();
//     mic.start();
//     micOn = true;
//     btn.html('Mic: ON');
//   } else {
//     mic.stop();
//     micOn = false;
//     btn.html('Mic: OFF');
//   }
// }
  


function keyPressed() {
  if (key === 's') {
    save('brush.rebecca.png');
  }
}