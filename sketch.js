import { addPondiverseButton } from "https://www.pondiverse.com/script/pondiverse.js";

let blossomPicker;
let hueVariation;
let blossomAmount;
let branchAngles;
let refreshEvery;
let button;
let myCanvas;

function randomUniform(prng, a, b) {
  return a + prng.quick() * (b - a);
}

function randomSpread(prng, mean, spread) {
  return randomUniform(prng, mean - spread, mean + spread);
}

function randomNormal(prng, mean, sd) {
  const u1 = prng.quick();
  const u2 = prng.quick();

  const z0 = sqrt(-2.0 * log(u1)) * cos(360 * u2);

  return z0 * sd + mean;
}

function randomSign(prng) {
  return prng.quick() < 0.5 ? -1 : 1;
}

function addToList(list, text, element) {
  let li = createElement("li");
  li.parent(list);
  let label = createElement("label", text);

  label.parent(li);
  element.parent(li);
}

window.setup = function () {
  myCanvas = createCanvas(windowWidth, windowHeight);
  frameRate(1);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);

  let controls = createElement("ul");
  controls.position(0, 5);

  blossomPicker = createColorPicker(color(348, 28, 100));
  addToList(controls, "Blossom colour", blossomPicker);

  hueVariation = createSlider(0, 180, 10);
  addToList(controls, "Hue Variation", hueVariation);

  blossomAmount = createSlider(0, 255, 60);
  addToList(controls, "Blossom amount", blossomAmount);

  branchAngles = createSlider(0, 90, 45, 1);
  addToList(controls, "Branch angles", branchAngles);

  refreshEvery = createSlider(0, 60, 0);
  addToList(controls, "Refresh time", refreshEvery);

  button = createButton("Regenerate");
  button.mousePressed(() => {
    seed = Math.random();
    t = 0;
  });
  addToList(controls, "", button);
};

let seed = Math.random();
let t = 0;

window.draw = function () {
  if (refreshEvery.value() > 0 && t > refreshEvery.value()) {
    seed = Math.random();
    t = 0;
  } else {
    t += 1;
  }
  let prng = new alea(seed);
  let blossomPrng = new alea(prng.quick());

  angleMode(DEGREES);
  colorMode(RGB);
  background(202, 179, 136);
  colorMode(HSB, 360, 100, 100, 100);

  translate(windowWidth / 2, (3 * windowHeight) / 4);
  // Attempt to fit to 900 x 900.
  scale(min(windowWidth / 900, windowHeight / 900));
  fill(0);
  branch(prng, blossomPrng, 100, 40, 0, -1);
};

function branch(prng, blossomPrng, length, thickness, angle, branch_sign) {
  if (thickness < 3) {
    return;
  }
  push();
  rotate(angle);
  fill(0);

  let trunk_thickness_factor = 0.8;
  let branch_thickness_factor = 0.6;

  quad(
    0,
    -length,
    (trunk_thickness_factor * thickness) / 2,
    -length,
    thickness / 2,
    0,
    0,
    0,
  );

  if (thickness > 8) {
    fill(255);
    quad(
      (-trunk_thickness_factor * thickness) / 2,
      -length,
      0,
      -length,
      0,
      0,
      -thickness / 2,
      0,
    );
  }

  if (thickness < 15) {
    blossom(blossomPrng, length);
  }
  translate(0, -length);

  angle = branchAngles.value();

  const branch_length_factor = 0.8;

  // Main trunk.
  branch(
    prng,
    blossomPrng,
    randomSpread(prng, 30, 0.1),
    trunk_thickness_factor * thickness,
    randomSpread(prng, 0, 4),
    branch_sign * -1,
  );

  // Branch
  branch(
    prng,
    blossomPrng,
    randomSpread(prng, 3, 0.1) * thickness,
    branch_thickness_factor * thickness,
    branch_sign * randomSpread(prng, angle, angle / 3),
    branch_sign * -1,
  );

  pop();
}

function blossom(prng, length) {
  blossom_patch(prng, blossomAmount.value(), 0, 1.2, length);

  // fill(randomUniform(290, 310), 10, 100, 10);
  //  blossom_patch(10, 0.8, 1.2, length);
}

function blossom_patch(prng, count, y0, y1, length) {
  const blossomColor = blossomPicker.color();
  fill(
    randomSpread(prng, hue(blossomColor), hueVariation.value()),
    randomSpread(prng, saturation(blossomColor), 5),
    randomSpread(prng, brightness(blossomColor), 10),
    40,
  );
  // randomSpread(300, 10), randomUniform(50, 60), randomUniform(85, 100), 40);
  for (let i = 0; i < count; i++) {
    let x = randomNormal(prng, 0, 10);
    let y = randomUniform(prng, 0, y1);
    let size = randomUniform(prng, 5, 10);
    circle(x, (y - 1) * length, size);
  }
}

window.getPondiverseCreation = () => {
  return {
    type: "cherry.cthulahoops.org",
    data: JSON.stringify({
      seed: seed,
      blossomPicker: blossomPicker.color(),
      hueVariation: hueVariation.value(),
      blossomAmount: blossomAmount.value(),
      branchAngles: branchAngles.value(),
    }),
    image: getScreenshot(),
  };
};

function getScreenshot() {
  return myCanvas?.canvas?.toDataURL("image/png");
}

addPondiverseButton();
