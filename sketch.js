function randomUniform(a, b) {
  return a + Math.random() * (b - a);
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
  branch(randomUniform(0.7, 0.9) * length, thickness * 0.7, randomNormal(-PI / 6, 0.2));
  branch(randomUniform(0.7, 0.9) * length, thickness * 0.7, randomNormal(PI / 6, 0.2));
  pop();
}

function blossom(length) {
  fill(randomUniform(290, 310), randomUniform(30,50), randomUniform(85, 100), 40);
  for (let i = 0; i < 30; i++) {
    circle(randomUniform(-20, 20), randomUniform(-length, 0), randomUniform(5, 10));
  }
}
