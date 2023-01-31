let walls = []
let ray
let particle

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < 5; i++) {
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(0, 0, 0, height));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(0, height, width, height));
  particle = new Particle();
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }
  particle.update(mouseX, mouseY);
  particle.show();
  particle.look(walls);

  // let pt = ray.cast(wall);
  // if (pt) {
  //   stroke(255);
  //   line(pt.x, pt.y, ray.pos.x, ray.pos.y);
  // }

}

