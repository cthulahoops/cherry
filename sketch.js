// let blossomPicker;

function randomUniform(prng, a, b) {
  return a + prng.quick() * (b - a);
}

function randomSpread(prng, mean, spread) {
  return randomUniform(prng, mean - spread, mean + spread);
}

function randomNormal(prng, mean, sd) {
  u1 = prng.quick();
  u2 = prng.quick();

  z0 = sqrt(-2.0 * log(u1)) * cos(360 * u2)

  return z0 * sd + mean;
}


function addToList(list, text, element) {
  let li = createElement('li');
  li.parent(list);
  let label = createElement('label', text);

  label.parent(li);
  element.parent(li);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
//  noLoop();
  frameRate(1);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);

  let controls = createElement('ul')
  controls.position(0, 5)

  blossomPicker = createColorPicker(color(300, 55, 85));
  addToList(controls, 'Blossom colour', blossomPicker);

  hueVariation = createSlider(0, 180, 10);
  addToList(controls, 'Hue Variation', hueVariation);

  blossomAmount = createSlider(0, 255, 60);
  addToList(controls, 'Blossom amount', blossomAmount);

  branchAngles = createSlider(0, 90, 30, 1);
  addToList(controls, 'Branch angles', branchAngles);

  refreshEvery = createSlider(0, 60, 0);
  addToList(controls, 'Refresh time', refreshEvery);

  button = createButton('Regenerate');
  button.mousePressed(() => {
    seed = Math.random();
    t = 0
  });
  addToList(controls, '', button);
}

let seed = Math.random();
let t = 0;

function draw() {
  if (refreshEvery.value() > 0 && t > refreshEvery.value()) {
    seed = Math.random();
    t = 0;
  }
  else {
    t += 1;
  }
  let prng = new Math.seedrandom(seed);
  let blossomPrng = new Math.seedrandom(prng.quick());

  angleMode(DEGREES);
  colorMode(RGB);
  background(202, 179, 136);
  colorMode(HSB, 360, 100, 100, 100);

  translate(windowWidth / 2, 3 * windowHeight / 4);
  // Attempt to fit to 900 x 900.
  scale(min(windowWidth / 900, windowHeight / 900))
  fill(0);
  branch(prng, blossomPrng, 100, 40, 0);
}

function branch(prng, blossomPrng, length, thickness, angle) {
  if (length < 20) {
   return
  }
  push();
  rotate(angle);
  fill(0);
  quad(
    0, -length,
    0.7 * thickness / 2, -length,
    thickness / 2, 0,
    0, 0
  );

  if (thickness > 8) {
    fill(255);
    quad(
     -0.7 * thickness / 2, -length,
      0, -length,
      0, 0,
      -thickness / 2, 0
    );
  }

  if (thickness < 15) {
   blossom(blossomPrng, length);
  }
  translate(0, -length);

  angle = branchAngles.value()

  branch_length_factor = 0.8;
  branch_thick_factor = 0.7;
  branch(
    prng,
    blossomPrng,
    randomSpread(prng, branch_length_factor, 0.1) * length,
    branch_thick_factor * thickness,
    randomSpread(prng, -angle, angle / 3));
  branch(
    prng,
    blossomPrng,
    randomSpread(prng, branch_length_factor, 0.1) * length,
    branch_thick_factor * thickness,
    randomSpread(prng, angle, angle / 3));
  pop();
}

function blossom(prng, length) {
  blossom_patch(prng, blossomAmount.value(), 0, 1.2, length);

 // fill(randomUniform(290, 310), 10, 100, 10);
 //  blossom_patch(10, 0.8, 1.2, length);
}

function blossom_patch(prng, count, y0, y1, length) {
  blossomColor = blossomPicker.color()
  fill(
    randomSpread(prng, hue(blossomColor), hueVariation.value()),
    randomSpread(prng, saturation(blossomColor), 5),
    randomSpread(prng, brightness(blossomColor), 10),
    40
  );
  // randomSpread(300, 10), randomUniform(50, 60), randomUniform(85, 100), 40);
  for (let i = 0; i < count; i++) {
    let x = randomNormal(prng, 0, 10);
    let y = randomUniform(prng, 0, y1);
    let size = randomUniform(prng, 5, 10);
    circle(x, (y - 1) * length, size);
  }
}
