/* ================================
 * Creative Coding – p5.js (sketch.js)
 * Flow: 5 color buttons + Refresh + Print
 * Pick at most THREE colors → choose random image linked to those colors.
 * Refresh shuffles. Print saves PNG.
 * ================================ */

// --- Color buttons (correcting malformed "FF200" → "#FF2000")
const COLOR_CONFIG = [
  { label: "#5AFF00", hex: "#5AFF00" },  // neon green
  { label: "#FF4FEE", hex: "#FF4FEE" },  // pink/magenta (user noted "red/FF4FEE")
  { label: "#FFB200", hex: "#FFB200" },  // orange
  { label: "#FF2000", hex: "#FF2000" },  // fix for "FF200"
  { label: "#00F2FF", hex: "#00F2FF" }   // cyan
];

// --- Map each color to an image array (fill with your own paths)
const IMAGE_POOLS = {
  "#5AFF00": [ "1.png"],
  "#FF4FEE": [ "1.png"],
  "#FFB200": [ "3.png"],
  "#FF2000": [ "2.png"],
  "#00F2FF": [ "4.png"],
};

// --- State
let selectedColors = new Set();
let currentImg = null;        // p5.Image or null
let lastSeed = Math.floor(Math.random() * 1e9);
let ui = {};

// --- Helpers
const choice = (arr) => arr[Math.floor(Math.random() * arr.length)];

function setup() {
  createCanvasForLayout();
  pixelDensity(2);
  noLoop();

  buildControls();         // bottom buttons
  ui.wrap.style("zIndex", "9999");
  clearCanvas();           // start empty
}

function windowResized() {
  createCanvasForLayout();
  redrawArtwork();
}

function createCanvasForLayout() {
  // Keep some breathing room at bottom for buttons
  const w = Math.min(windowWidth * 0.96, 1200);
  const h = Math.min(windowHeight * 0.70, 700);
  const c = createCanvas(w, h);
  // Anchor the canvas at top-center
  c.parent(document.body);
  c.style("display", "block");
  c.position((windowWidth - width) / 2, 16);
  positionControls();
}

function clearCanvas() {
  background(10);
}

function draw() {
  // Draw on-demand only
}

// ---------------- UI ----------------
function buildControls() {
  // Wrapper
  ui.wrap = createDiv();
  ui.wrap.id("controls");
  ui.wrap.style("position", "fixed");
  ui.wrap.style("left", "0");
  ui.wrap.style("right", "0");
  ui.wrap.style("bottom", "0");
  ui.wrap.style("padding", "12px 16px");
  ui.wrap.style("display", "flex");
  ui.wrap.style("gap", "10px");
  ui.wrap.style("flexWrap", "wrap");
  ui.wrap.style("justifyContent", "center");
  ui.wrap.style("alignItems", "center");
  ui.wrap.style("borderTop", "1px solid #2a2d31");
  ui.wrap.style("background", "rgba(18,18,20,0.9)");
  ui.wrap.style("backdrop-filter", "blur(6px)");
  ui.wrap.style("fontFamily", "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial");

  // Color chips (buttons 1–5)
  ui.colorButtons = [];
  COLOR_CONFIG.forEach((c) => {
    const chip = createButton(c.label);
    chip.addClass("chip");
    chip.style(commonChipStyle());
    chip.style("gap", "8px");
    chip.mousePressed(() => toggleColor(c.hex, chip));
    // swatch
    const sw = createSpan(" ");
    sw.parent(chip);
    sw.style("display", "inline-block");
    sw.style("width", "18px");
    sw.style("height", "18px");
    sw.style("borderRadius", "50%");
    sw.style("border", "1px solid rgba(255,255,255,0.6)");
    sw.style("boxShadow", "inset 0 0 0 1px rgba(0,0,0,.25)");
    sw.style("background", c.hex);
    // move text to the right of swatch
    chip.html(sw.elt.outerHTML + " " + c.label);
    chip.parent(ui.wrap);
    ui.colorButtons.push(chip);
  });

  // Refresh (button 6)
  ui.refresh = createButton("⟳");
  ui.refresh.addClass("icon-btn");
  styleIconBtn(ui.refresh);
  ui.refresh.attribute("title", "Refresh / Shuffle");
  ui.refresh.mousePressed(shuffleArtwork);
  ui.refresh.parent(ui.wrap);

  // Print (button 7)
  ui.print = createButton("🖨");
  ui.print.addClass("icon-btn");
  styleIconBtn(ui.print);
  ui.print.attribute("title", "Print / Save");
  ui.print.mousePressed(() => saveCanvas("creative-output", "png"));
  ui.print.parent(ui.wrap);

  // Hint
  ui.hint = createSpan("Pick any 3 colors → Refresh to shuffle → Print to save");
  ui.hint.style("color", "#cfd2d8");
  ui.hint.style("fontSize", "13px");
  ui.hint.parent(ui.wrap);

  // Keyboard shortcuts
  window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "r") shuffleArtwork();
    if (e.key.toLowerCase() === "p") saveCanvas("creative-output", "png");
  });
}

function positionControls() {
  if (!ui.wrap) return;
  // nothing dynamic needed beyond fixed bottom; keep function in case you want to nudge
}

function commonChipStyle() {
  return {
    background: "#1b1d20",
    color: "#f5f7fa",
    border: "1px solid #2a2d31",
    borderRadius: "999px",
    padding: "8px 12px",
    boxShadow: "0 4px 12px rgba(0,0,0,.25)",
    fontSize: "14px",
    cursor: "pointer",
  };
}

function styleIconBtn(btn) {
  btn.style("width", "40px");
  btn.style("height", "40px");
  btn.style("borderRadius", "12px");
  btn.style("background", "#1b1d20");
  btn.style("color", "#f5f7fa");
  btn.style("border", "1px solid #2a2d31");
  btn.style("boxShadow", "0 4px 12px rgba(0,0,0,.25)");
  btn.style("fontSize", "18px");
  btn.style("cursor", "pointer");
}

// Toggle selection (max 3)
function toggleColor(hex, btn) {
  if (selectedColors.has(hex)) {
    selectedColors.delete(hex);
    btn.style("outline", "none");
  } else {
    if (selectedColors.size >= 3) {
      // tiny bounce to indicate limit
      btn.elt.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(-2px)" }, { transform: "translateY(0)" }],
        { duration: 120, easing: "ease-out" }
      );
      return;
    }
    selectedColors.add(hex);
    btn.style("outline", "2px solid #ffffff");
  }
  shuffleArtwork(); // update immediately
}

// ---------------- Artwork ----------------
function shuffleArtwork() {
  lastSeed = Math.floor(Math.random() * 1e9);
  getRandomImageFromSelection((img) => {
    currentImg = img || null;
    redrawArtwork();
  });
}

function getRandomImageFromSelection(cb) {
  if (selectedColors.size === 0) { cb(null); return; }

  // Union pool of matching images for selected colors
  const pool = [];
  Array.from(selectedColors).forEach((hex) => {
    const arr = IMAGE_POOLS[hex] || [];
    arr.forEach((p) => pool.push({ hex, path: p }));
  });

  if (pool.length === 0) { cb(null); return; }

  const pick = choice(pool);
  loadImage(
    pick.path,
    (img) => cb(img),
    () => cb(null) // on error → fallback
  );
}

function redrawArtwork() {
  clearCanvas();
  if (currentImg) {
    drawImageComposition(currentImg);
  } else {
    drawGenerativeComposition();
  }
}

function drawImageComposition(img) {
  // Fit image inside canvas with margin
  const margin = Math.min(width, height) * 0.05;
  const availW = width - margin * 2;
  const availH = height - margin * 2;
  const scale = Math.min(availW / img.width, availH / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  const x = (width - w) / 2;
  const y = (height - h) / 2;

  // Soft layered backdrop from chosen colors
  push();
  noStroke();
  const cols = Array.from(selectedColors);
  for (let i = 0; i < 3; i++) {
    const c = color(cols[i % cols.length] || "#222");
    c.setAlpha(35);
    fill(c);
    rect(margin * (i + 1), margin * (i + 1), width - margin * (i + 2), height - margin * (i + 2), 24);
  }
  pop();

  // Image with a gentle shadow
  push();
  drawingContext.shadowColor = "rgba(0,0,0,.5)";
  drawingContext.shadowBlur = 24;
  image(img, x, y, w, h);
  pop();
}

function drawGenerativeComposition() {
  randomSeed(lastSeed);
  noiseSeed(lastSeed);

  const cols = selectedColors.size ? Array.from(selectedColors) : ["#333", "#666", "#999"];

  // Vertical gradient
  noStroke();
  for (let y = 0; y < height; y++) {
    const t = y / max(1, height - 1);
    const c1 = color(cols[0 % cols.length]);
    const c2 = color(cols[1 % cols.length]);
    const c = lerpColor(c1, c2, t);
    c.setAlpha(200);
    fill(c);
    rect(0, y, width, 1);
  }

  // Flow-field ribbons
  const layers = 60;
  for (let i = 0; i < layers; i++) {
    const c = color(cols[i % cols.length]);
    c.setAlpha(80);
    stroke(c);
    strokeWeight(1.2);
    noFill();

    let x = random(width);
    let y = random(height);
    beginShape();
    for (let k = 0; k < 120; k++) {
      const a = noise(x * 0.002, y * 0.002, i * 0.05) * TAU * 2;
      x += cos(a) * 2.0;
      y += sin(a) * 2.0;
      vertex(x, y);
      if (x < -10 || x > width + 10 || y < -10 || y > height + 10) break;
    }
    endShape();
  }

  // Subtle frame
  noFill();
  stroke(255, 25);
  rect(8, 8, width - 16, height - 16, 16);
}

// ---------------- Optional: programmatically add images ----------------
function registerImage(hex, path) {
  if (!IMAGE_POOLS[hex]) IMAGE_POOLS[hex] = [];
  IMAGE_POOLS[hex].push(path);
}
