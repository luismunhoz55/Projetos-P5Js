var n = 0;
var c = 6;

var points = [];

var start = 0;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSB);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  // rotate(n * 0.3);
  for (var i = 0; i < 3000; i++) {
    var a = i * 137.5;
    var r = c * sqrt(i);
    var x = r * cos(a);
    var y = r * sin(a);
    var hu = sin(start + i * 0.1);
    hu = map(hu, -1, 1, 0, 360);
    fill(hu, 255, 255);
    noStroke();
    ellipse(x, y, c + 1, c + 1);
  }
  // n += 5;
  start += 0.1;
}
