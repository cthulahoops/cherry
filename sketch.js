function randomUniform(a, b) {
  return a + Math.random() * (b - a);
}

function randomSpread(mean, spread) {
  return randomUniform(mean - spread, mean + spread);
}

function randomNormal(mean, sd) {
  u1 = Math.random();
  u2 = Math.random();

  z0 = sqrt(-2.0 * log(u1)) * cos(2 * PI * u2)

  return z0 * sd + mean;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noStroke();
}

function draw() {
  background(202, 179, 136);
  colorMode(HSB, 360, 100, 100, 100);

  translate(windowWidth / 2, 700);
  fill(0);
  branch(100, 40, 0);
}

function branch(length, thickness, angle) {
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
   blossom(length);
  }
  translate(0, -length);

  branch_length_factor = 0.8;
  branch_thick_factor = 0.7;
  branch(
    randomSpread(branch_length_factor, 0.1) * length,
    branch_thick_factor * thickness,
    randomNormal(-PI / 6, 0.15));
  branch(
    randomSpread(
      branch_length_factor, 0.1) * length,
      branch_thick_factor * thickness, randomNormal(PI / 6, 0.15));
  pop();
}

function blossom(length) {
  blossom_patch(30, 0, 1.2, length);

 // fill(randomUniform(290, 310), 10, 100, 10);
 //  blossom_patch(10, 0.8, 1.2, length);
}

function blossom_patch(count, y0, y1, length) {
  fill(randomSpread(300, 10), randomUniform(50, 60), randomUniform(85, 100), 40);
  for (let i = 0; i < count; i++) {
    let x = randomNormal(0, 10);
    let y = randomUniform(0, y1);
    let size = randomUniform(5, 10);
    circle(x, (y - 1) * length, size);
  }
}
