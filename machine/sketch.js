const IMAGE_POOLS = {
  gyp:  ["gyp.1.png","gyp.2.png","gyp.3.png","gyp.4.png","gyp.5.png","gyp.6.png","gyp.7.png","gyp.8.png","gyp.9.png","gyp.10.png"],
  ogp:   ["ogp.1.png","ogp.2.png","ogp.3.png","ogp.4.png","ogp.5.png","ogp.6.png","ogp.7.png","ogp.8.png"],
  bpy: ["bpy.1.png","bpy.2.png","bpy.3.png","bpy.4.png","bpy.5.png","bpy.6.png","bpy.7.png","bpy.8.png"],
  gbp: ["gbp.1.png","gbp.2.png","gbp.3.png","gbp.4.png","gbp.5.png","gbp.6.png","gbp.7.png","gbp.8.png"],
  gby: ["gby.1.png","gby.2.png","gby.3.png","gby.4.png"],
  gbo: ["gbo.1.png","gbo.2.png","gbo.3.png","gbo.4.png","gbo.5.png","gbo.6.png","gbo.7.png","gbo.8.png"],
  pbo: ["pbo.1.png","pbo.2.png","pbo.3.png","pbo.4.png"],
pyo: ["pyo.1.png","pyo.2.png","pyo.3.png","pyo.4.png"],
ygo: ["ygo.1.png","ygo.2.png","ygo.3.png","ygo.4.png"],
ybo: ["ybo.1.png","ybo.2.png","ybo.3.png","ybo.4.png"],
};

let g_pressed = false;
let p_pressed = false;
let y_pressed = false;
let o_pressed = false;
let b_pressed = false;
let picture;

function setup() {
 createCanvas(windowWidth, windowHeight);
fill ('grey');
  cnv = createCanvas(Math.min(windowWidth*0.3, 1200),
                     Math.min(windowHeight*0.7, 700));
  cnv.position((windowWidth - width)/2, 16);

  face = null;

  button_g = createButton('💚'); //green button
   button_g.style('font-size', '24px');
  button_p = createButton('🩷'); //pink button
     button_p.style('font-size', '24px');
  button_y = createButton('💛'); //yellow button
     button_y.style('font-size', '24px');
  button_o= createButton('🧡'); //orange button
     button_o.style('font-size', '24px');
  button_b= createButton('💙'); //blue button
     button_b.style('font-size', '24px');
  button_refresh = createButton('🔄');
     button_refresh.style('font-size', '24px'); //refresh button
  button_print = createButton('🖨️');
     button_print.style('font-size' , '24px'); //print button

  button_g.mousePressed(() => {
    g_pressed = !g_pressed;
    if (g_pressed) {
      button_g.style('background','Grey');
    } else {
      button_g.style('background','LimeGreen');
    }
    imageGenerator();
  });

  button_p.mousePressed(() => {
    p_pressed = !p_pressed;
    if (p_pressed) {
      button_p.style('background','Grey');
    } else {
      button_p.style('background','Violet');
    }
    imageGenerator();
  });

  button_y.mousePressed(() => {
    y_pressed = !y_pressed;
    if (y_pressed) {
      button_y.style('background','Grey');
    } else {
      button_y.style('background','Yellow');
    }
    imageGenerator();
  });

  button_o.mousePressed(() => {
    o_pressed = !o_pressed;
    if (o_pressed) {
      button_o.style('background','Grey');
    } else {
      button_o.style('background','Orange');
    }
    imageGenerator();
  });

  button_b.mousePressed(() => {
    b_pressed = !b_pressed;
    if (b_pressed) {
      button_b.style('background','Grey');
    } else {
      button_b.style('background','DarkTurquoise');
    }
    imageGenerator();
  });

  button_refresh.mousePressed(() => {
    imageGenerator();
  });


  button_print.mousePressed(() => saveCanvas('food_menu','png'));

  positionButtons();
}


function canvas_size() {
  resizeCanvas(Math.min(windowWidth*0.96, 1200),
               Math.min(windowHeight*0.70, 700));
  cnv.position((windowWidth)/2, 16);
  positionButtons();
}

function positionButtons() {
  const r = cnv.elt.getBoundingClientRect(); 
  const gap = 12;      //gap between buttons
  const btnW = 50;     //button width
  const y = r.bottom + 12;

  const totalW = btnW*5 + gap*4;
  const startX = r.left + (r.width - totalW)/2;

  button_g.position(startX, y);
  button_p.position(startX + btnW + gap, y);
  button_y.position(startX + btnW*2 + gap * 2 , y);
  button_o.position(startX + btnW*3 + gap * 3 , y);
  button_b.position(startX + btnW*4 + gap * 4, y);
  button_refresh.position(startX + btnW, y + 75);
  button_print.position(startX + btnW*3 + gap* 2, y + 75);

  button_g.style('width','50px');
  button_g.style('height','50px');
  button_g.style('background', 'LimeGreen');
  button_g.style('border', 'none');
  button_g.style('border-radius', '10px');

  button_p.style('width','50px');
  button_p.style('height','50px');
  button_p.style('background', 'Violet');
  button_p.style('border', 'none');
  button_p.style('border-radius', '10px');

  button_y.style('width','50px');
  button_y.style('height','50px');
  button_y.style('background', 'Yellow');
  button_y.style('border', 'none');
  button_y.style('border-radius', '10px');

  button_o.style('width','50px');
  button_o.style('height','50px');
  button_o.style('background', 'Orange');
  button_o.style('border', 'none');
  button_o.style('border-radius', '10px');

  button_b.style('width','50px');
  button_b.style('height','50px');
  button_b.style('background', 'DarkTurquoise');
  button_b.style('border', 'none');
  button_b.style('border-radius', '10px');

  button_refresh.style('width','60px');
  button_refresh.style('height','50px');
  button_refresh.style('background', 'Gainsboro');
  button_refresh.style('border', 'none');
  button_refresh.style('border-radius', '10px');

  button_print.style('width','60px');
  button_print.style('height','50px');
  button_print.style('background', 'Gainsboro');
  button_print.style('border', 'none');
  button_print.style('border-radius', '10px');
}

function draw() {
  background(220);
  clear();
  if (face) {
    const margin = min(width, height)*0.1;
    const backW = width - margin*2;
    const backH = height - margin*2;
    const s = min(backW/face.width, backH/face.height);
    const w = face.width * s, h = face.height * s;
    image(face, (width-w)/2, (height-h)/2, w, h);
  }
}

function imageGenerator() {
  //g_pressed && p_pressed && y_pressed && o_pressed && b_pressed
  if (g_pressed && !p_pressed && y_pressed && o_pressed && !b_pressed){ //ygo
    picture = IMAGE_POOLS.ygo;
    let n = int(random(1, picture.length));
    face = loadImage(picture[n]);
  } else if (!g_pressed && !p_pressed && y_pressed && o_pressed && b_pressed) { //ybo
    picture = IMAGE_POOLS.ybo;
    let n = int(random(1, picture.length));
    face = loadImage(picture[n]);
  } else if (!g_pressed && p_pressed && !y_pressed && o_pressed && b_pressed) { //pbo
    picture = IMAGE_POOLS.pbo;
    let n = int(random(1, picture.length));
    face = loadImage(picture[n]);
  } else if (g_pressed && p_pressed && y_pressed && !o_pressed && !b_pressed) { //gyp
    picture = IMAGE_POOLS.gyp;
    let n = int(random(1, picture.length));
    face = loadImage(picture[n]);
  } else if (g_pressed && p_pressed && !y_pressed && !o_pressed && b_pressed) { //gbp
    picture = IMAGE_POOLS.gbp;
    let n = int(random(1, picture.length));
    face = loadImage(picture[n]);
  } else if (g_pressed && !p_pressed && !y_pressed && o_pressed && b_pressed) { //gbo
    picture = IMAGE_POOLS.gbo;
    let n = int(random(1, picture.length));
    face = loadImage(picture[n]);
  } else if (!g_pressed && p_pressed && y_pressed && !o_pressed && b_pressed) { //bpy
    picture = IMAGE_POOLS.bpy;
    let n = int(random(1, picture.length));
    face = loadImage(picture[n]);
  } else if (!g_pressed && p_pressed && y_pressed && o_pressed && !b_pressed) { //pyo
    picture = IMAGE_POOLS.pyo;
    let n = int(random(1, picture.length));
    face = loadImage(picture[n]);
  } else if (g_pressed && !p_pressed && y_pressed && !o_pressed && b_pressed) { //gby
    picture = IMAGE_POOLS.gby;
    let n = int(random(1, picture.length));
    face = loadImage(picture[n]);
  } else if (g_pressed && !p_pressed && y_pressed && o_pressed && !b_pressed) { //ygo
    picture = IMAGE_POOLS.ygo;
    let n = int(random(1, picture.length));
    face = loadImage(picture[n]);
  } else if (g_pressed && p_pressed && !y_pressed && o_pressed && !b_pressed) { //ogp
    picture = IMAGE_POOLS.ogp;
    let n = int(random(1, picture.length));
    face = loadImage(picture[n]);
  } else {
    face = null;
  }

}
