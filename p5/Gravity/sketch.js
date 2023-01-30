var planets = [];

function setup() {
  createCanvas(1500, 800);

  planets[0] = new Planet(random(width), random(height));
  planets[1] = new Planet(random(width), random(height));


}

function draw() {
  background(0);

  planets[0].show(20);
  planets[0].update();
  planets[0].move();

  planets[1].show(20);
  planets[1].update();
  planets[1].move();

}

