class Vehicle {

  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.r = 4;
    this.maxSpeed = 10;
    this.maxForce = 1;
  }

  behaviors() {
    let arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY)
    var flee = this.flee(mouse)

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);

  }

  flee(target) {
    let desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      return steer
    } else {
      return createVector()
    }
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag()
    let speed = this.maxSpeed;
    if (d < 150) {
      speed = map(d, 0, 150, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer
  }

  applyForce(force) {
    this.acc.add(force)
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    strokeWeight(4);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }

}