let x1
let y1
let y2

function setup() {
  createCanvas(600, 600);
  x1 = -200;
  y1 = -200;
  y2 = 200;
}

function draw() {
  background(0);
  angleMode(DEGREES);
  translate(width / 2, height / 2);

  stroke(255, 0, 100);
  strokeWeight(5);
  line(x1, y1, x1, y2);

  let points = [];
  let r = 150;

  for (let i = 0; i <= 360; i += 2) {
    let x = r * cos(i);
    let y = r * sin(i);
    let point = createVector(x, y)
    points.push(point);
  }

  beginShape();
  noFill();
  strokeWeight(2);
  for (let pt of points) {
    stroke(255);

    if (x1 >= pt.x) {
      vertex(pt.x + random(-5, 5), pt.y + random(-5, 5));
    } else {
      vertex(pt.x, pt.y);
    }

  }
  endShape();

  if (x1 < 200) {
    x1 += 1;
  }

}

// class Ball {
//   constructor() {
//     this.x = random(width);
//     this.y = random(height);
//     this.r = random(10, 40);
//   }

//   show() {
//     noFill();
//     stroke(255);
//     circle(this.x, this.y, this.r);
//   }

//   move() {
//     this.x += random(-5, 5);
//     this.y += random(-5, 5);
//   }

// }