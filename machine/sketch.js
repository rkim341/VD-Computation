const IMAGE_POOLS = {
  gyp:  ["gyp.1.png","gyp.2.png","gyp.3.png","gyp.4.png","gyp.5.png","gyp.6.png","gyp.7.png","gyp.8.png","gyp.9.png","gyp.10.png"],
  ogp:  ["ogp.1.png","ogp.2.png","ogp.3.png","ogp.4.png","ogp.5.png","ogp.6.png","ogp.7.png","ogp.8.png"],
  bpy:  ["bpy.1.png","bpy.2.png","bpy.3.png","bpy.4.png","bpy.5.png","bpy.6.png","bpy.7.png","bpy.8.png"],
  gbp:  ["gbp.1.png","gbp.2.png","gbp.3.png","gbp.4.png","gbp.5.png","gbp.6.png","gbp.7.png","gbp.8.png"],
  gby:  ["gby.1.png","gby.2.png","gby.3.png","gby.4.png"],
  gbo:  ["gbo.1.png","gbo.2.png","gbo.3.png","gbo.4.png","gbo.5.png","gbo.6.png","gbo.7.png","gbo.8.png"],
  pbo:  ["pbo.1.png","pbo.2.png","pbo.3.png","pbo.4.png"],
  pyo:  ["pyo.1.png","pyo.2.png","pyo.3.png","pyo.4.png"],
  ygo:  ["ygo.1.png","ygo.2.png","ygo.3.png","ygo.4.png"],
  ybo:  ["ybo.1.png","ybo.2.png","ybo.3.png","ybo.4.png"],
};

let g_pressed = false;
let p_pressed = false;
let y_pressed = false;
let o_pressed = false;
let b_pressed = false;

let picture;
let face = null;
let titleHeading;
let cnv;

let button_g, button_p, button_y, button_o, button_b;
let button_refresh, button_print;

let keyBox; // legend on the right

function setup() {
  cnv = createCanvas(
    Math.min(windowWidth * 0.3, 1200),
    Math.min(windowHeight * 0.7, 700)
  );
  cnv.position((windowWidth - width) / 2, 40);  // tight spacing

  // Title
  titleHeading = createElement('h2', 'Select 3 Colors');
  titleHeading.style('margin', '0');
  titleHeading.style('font-weight', '200');
  titleHeading.style('font-family', 'Poppins');
  titleHeading.style('color', '#005DA3');
  titleHeading.style('letter-spacing', '1px');
  titleHeading.style('text-align', 'center');

  // Buttons
  button_g = createButton('💚'); button_g.style('font-size', '24px');
  button_p = createButton('🩷'); button_p.style('font-size', '24px');
  button_y = createButton('💛'); button_y.style('font-size', '24px');
  button_o = createButton('🧡'); button_o.style('font-size', '24px');
  button_b = createButton('💙'); button_b.style('font-size', '24px');
  button_refresh = createButton('🔄'); button_refresh.style('font-size', '24px');
  button_print = createButton('🖨️'); button_print.style('font-size', '24px');

  // Button toggle logic + title update
  button_g.mousePressed(() => { 
    g_pressed = !g_pressed; 
    button_g.style('background', g_pressed ? '#9dea8cff' : '#dfe6deff'); 
    imageGenerator(); 
    updateTitle();
  });

  button_p.mousePressed(() => { 
    p_pressed = !p_pressed; 
    button_p.style('background', p_pressed ? '#ea98c9ff' : '#ede7eaff'); 
    imageGenerator(); 
    updateTitle();
  });

  button_y.mousePressed(() => { 
    y_pressed = !y_pressed; 
    button_y.style('background', y_pressed ? '#ffe895ff' : '#e8e6e0ff'); 
    imageGenerator(); 
    updateTitle();
  });

  button_o.mousePressed(() => { 
    o_pressed = !o_pressed; 
    button_o.style('background', o_pressed ? '#ffc885ff' : '#e3e0ddff'); 
    imageGenerator(); 
    updateTitle();
  });

  button_b.mousePressed(() => { 
    b_pressed = !b_pressed; 
    button_b.style('background', b_pressed ? '#8bffffff' : '#dbe0e0ff'); 
    imageGenerator(); 
    updateTitle();
  });

  button_refresh.mousePressed(() => { imageGenerator(); updateTitle(); });
  button_print.mousePressed(() => saveCanvas('food_menu', 'png'));

  createKey();        // create the legend
  positionButtons();
  positionTitle();
  positionKey();
}

function windowResized() {
  canvas_size();
}

function canvas_size() {
  resizeCanvas(
    Math.min(windowWidth * 0.96, 1200),
    Math.min(windowHeight * 0.70, 700)
  );
  cnv.position((windowWidth - width) / 2, 40);
  positionButtons();
  positionTitle();
  positionKey();
}

// Count how many buttons are pressed
function countPressed() {
  return (g_pressed + p_pressed + y_pressed + o_pressed + b_pressed);
}

// Update title based on count
function updateTitle() {
  const n = countPressed();

  if (n > 3) {
    titleHeading.html("Select only 3 colors — no more ❌");
    titleHeading.style('color', '#ff3333');
  } else {
    titleHeading.html("Select 3 Colors");
    titleHeading.style('color', '#005DA3');
  }
}

function positionButtons() {
  const r = cnv.elt.getBoundingClientRect();
  const gap = 12;
  const btnW = 50;
  const y = r.bottom + 4;  // tighter spacing

  const totalW = btnW * 5 + gap * 4;
  const startX = r.left + (r.width - totalW) / 2;

  button_g.position(startX, y);
  button_p.position(startX + btnW + gap, y);
  button_y.position(startX + btnW * 2 + gap * 2, y);
  button_o.position(startX + btnW * 3 + gap * 3, y);
  button_b.position(startX + btnW * 4 + gap * 4, y);

  button_refresh.position(startX + btnW, y + 65);
  button_print.position(startX + btnW * 3 + gap * 2, y + 65);

  // Styles
  const styleBtn = btn => {
    btn.style('width','50px');
    btn.style('height','50px');
    btn.style('border','none');
    btn.style('border-radius','10px');
  };
  [button_g, button_p, button_y, button_o, button_b].forEach(styleBtn);

  button_refresh.style('width','60px');
  button_refresh.style('height','50px');
  button_refresh.style('background','Gainsboro');
  button_refresh.style('border','none');
  button_refresh.style('border-radius','10px');

  button_print.style('width','60px');
  button_print.style('height','50px');
  button_print.style('background','Gainsboro');
  button_print.style('border','none');
  button_print.style('border-radius','10px');

  positionTitle();
}

function positionTitle() {
  const canvasRect = cnv.elt.getBoundingClientRect();

  titleHeading.style('width', canvasRect.width + 'px');
  titleHeading.style('text-align', 'center');

  const titleH = titleHeading.elt.getBoundingClientRect().height;

  const x = canvasRect.left;
  const y = canvasRect.top - titleH - 4;

  titleHeading.position(x, y);
}

function createKey() {
  keyBox = createDiv();
  keyBox.style('padding', '12px 16px');
  keyBox.style('background', '#ffffffcc');
  keyBox.style('border', '1px solid #ebebebff');
  keyBox.style('border-radius', '10px');
  keyBox.style('font-family', 'Poppins');
  keyBox.style('font-size', '14px');
  keyBox.style('line-height', '22px');
  keyBox.style('color', '#333');
  keyBox.style('box-shadow', '0 2px 6px rgba(0, 0, 0, 0.03)');

  keyBox.html(`
   <style="font-size:16px; color:#005DA3;">Key:<br>
    <span style="color:#9dea8cff;">●</span> Green = Veggies<br>
    <span style="color:#ea98c9ff;">●</span> Pink = Protein<br>
    <span style="color:#ffe895ff;">●</span> Yellow = Carbs<br>
    <span style="color:#ffc885ff;">●</span> Orange = Protein/Fruit<br>
    <span style="color:#8bffffff;">●</span> Blue = White
  `);
}

function positionKey() {
  if (!keyBox) return;

  const r = cnv.elt.getBoundingClientRect();
  const kb = keyBox.elt.getBoundingClientRect();

const x = r.right + 50;                    // to the right of canvas
  const y = r.top + (r.height - kb.height)/2; // vertically centered

  keyBox.position(x, y);
}

function draw() {
  clear();
  if (face) {
    const margin = min(width, height) * 0.1;
    const backW = width - margin * 2;
    const backH = height - margin * 2;
    const s = min(backW / face.width, backH / face.height);
    const w = face.width * s;
    const h = face.height * s;
    image(face, (width - w) / 2, (height - h) / 2, w, h);
  }
}

function imageGenerator() {
  if (g_pressed && !p_pressed && y_pressed && o_pressed && !b_pressed) picture = IMAGE_POOLS.ygo;
  else if (!g_pressed && !p_pressed && y_pressed && o_pressed && b_pressed) picture = IMAGE_POOLS.ybo;
  else if (!g_pressed && p_pressed && !y_pressed && o_pressed && b_pressed) picture = IMAGE_POOLS.pbo;
  else if (g_pressed && p_pressed && y_pressed && !o_pressed && !b_pressed) picture = IMAGE_POOLS.gyp;
  else if (g_pressed && p_pressed && !y_pressed && !o_pressed && b_pressed) picture = IMAGE_POOLS.gbp;
  else if (g_pressed && !p_pressed && !y_pressed && o_pressed && b_pressed) picture = IMAGE_POOLS.gbo;
  else if (!g_pressed && p_pressed && y_pressed && !o_pressed && b_pressed) picture = IMAGE_POOLS.bpy;
  else if (!g_pressed && p_pressed && y_pressed && o_pressed && !b_pressed) picture = IMAGE_POOLS.pyo;
  else if (g_pressed && !p_pressed && y_pressed && !o_pressed && b_pressed) picture = IMAGE_POOLS.gby;
  else if (g_pressed && !p_pressed && y_pressed && o_pressed && !b_pressed) picture = IMAGE_POOLS.ygo;
  else if (g_pressed && p_pressed && !y_pressed && o_pressed && !b_pressed) picture = IMAGE_POOLS.ogp;
  else { face = null; return; }

  let n = int(random(1, picture.length));
  face = loadImage(picture[n]);
}
