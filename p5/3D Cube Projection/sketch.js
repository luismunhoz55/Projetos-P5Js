
let points = [];
let angle = 0;

let rotation

function setup() {
  createCanvas(600, 600);

  points[0] = createVector(-0.5, -0.5, -0.5);
  points[1] = createVector(0.5, 0.5, -0.5);
  points[2] = createVector(-0.5, 0.5, -0.5);
  points[3] = createVector(0.5, -0.5, -0.5);
  points[4] = createVector(-0.5, -0.5, 0.5);
  points[5] = createVector(0.5, 0.5, 0.5);
  points[6] = createVector(-0.5, 0.5, 0.5);
  points[7] = createVector(0.5, -0.5, 0.5);

}

function draw() {
  background(0);
  translate(300, 300);

  rotationX = [
    [1, 0, 0],
    [0, cos(angle), -sin(angle)],
    [0, sin(angle), cos(angle)]
  ]

  rotationY = [
    [cos(angle), 0, sin(angle)],
    [0, 1, 0],
    [-sin(angle), 0, cos(angle)]
  ]

  rotationZ = [
    [cos(angle), -sin(angle), 0],
    [sin(angle), cos(angle), 0],
    [0, 0, 1]
  ]

  let projected = [];

  let index = 0;
  for (let pt of points) {
    let rotaded = matmul(rotationX, pt);
    rotaded = matmul(rotationY, rotaded);
    rotaded = matmul(rotationZ, rotaded);
    rotaded = matmul(rotationX, rotaded);

    let distance = 2;
    let z = 1 / (distance - rotaded.z);
    let projection = [
      [z, 0, 0],
      [0, z, 0]
    ];

    let projected2d = matmul(projection, rotaded);
    projected2d.mult(200);
    projected[index] = projected2d
    index++;
  }

  for (let v of projected) {
    strokeWeight(4);
    stroke(255);
    point(v.x, v.y);
  }

  connectProjected(projected);

  angle += 0.02;
}

function connect(i, j, points) {
  a = points[i];
  b = points[j];

  strokeWeight(1);
  stroke(255);
  line(a.x, a.y, b.x, b.y);
}

function connectProjected(projected) {
  connect(0, 2, projected)
  connect(1, 3, projected)
  connect(0, 3, projected)
  connect(1, 2, projected)

  connect(4, 6, projected)
  connect(5, 6, projected)
  connect(5, 7, projected)
  connect(4, 7, projected)

  connect(1, 5, projected)
  connect(2, 6, projected)
  connect(3, 7, projected)
  connect(0, 4, projected)
}
