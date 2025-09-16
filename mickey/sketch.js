function setup() {
  createCanvas(600, 800);
  noStroke();

}


function draw() {
  // ears
  fill('black');
  circle(293,90,150);
  circle(195,215,150);

  //face
  fill('#F4E2C2');
  circle(341,230,170);
  ellipse(430,270,100,80);
  

  //eyes
  fill('black');
  circle(366,205,44);
  circle(417,205,44);

  //nose
  circle(468,244,50); 

  //mouth
  fill('red');
  arc(334,315,54, 10,10);  

  //body
  circle(384,443,194);    

  //buttons
  fill('black');
  circle(463,405,48);
  circle(413,424,48);

  //feet
  fill('yellow');
  circle(200,600,160);
  circle(423,640,160);
}

