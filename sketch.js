function randomRange(a, b) {
  return a + Math.random() * (b - a);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noStroke();
}

function draw() {
  background(202, 179, 136);
  colorMode(HSB, 360, 100, 100, 100);
//  rect(200, 200, 30, 100);
  
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
  branch(randomRange(0.65, 0.95) * length, thickness * 0.7, randomRange(0.8, 1.2) * PI / 6);
  branch(randomRange(0.65, 0.95) * length, thickness * 0.7, randomRange(0.8, 1.2) * -PI / 6); 
  pop();
}
  
function blossom(length) {
  fill(randomRange(290, 310), randomRange(30,50), randomRange(85, 100), 40);
  noStroke();
  for (let i = 0; i < 30; i++) {
    circle(randomRange(-20, 20), randomRange(-length, 0), randomRange(5, 10));
  }
}